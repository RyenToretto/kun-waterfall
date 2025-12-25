import type { Ref } from 'vue'

/**
 * 视频自动播放 composable
 * 使用 IntersectionObserver 监听视频进入视口，自动播放/暂停
 */
export const useVideoAutoplay = () => {
  const { isMobile } = useResponsiveColumns()

  // 当前正在播放的视频列表
  const playingVideos = ref<Set<HTMLVideoElement>>(new Set())

  // 所有被观察的视频
  const observedVideos = ref<Set<HTMLVideoElement>>(new Set())

  // 最大同时播放数量
  const maxPlayingCount = computed(() => isMobile.value ? 2 : 4)

  // Observer 实例
  let observer: IntersectionObserver | null = null

  // 待处理的视频队列（用于批量处理）
  const pendingPlay = new Set<HTMLVideoElement>()
  const pendingPause = new Set<HTMLVideoElement>()
  let rafId: number | null = null

  /**
   * 批量处理播放/暂停请求
   */
  const processQueue = () => {
    rafId = null

    // 先处理暂停
    pendingPause.forEach((video) => {
      if (!pendingPlay.has(video)) {
        video.pause()
        playingVideos.value.delete(video)
      }
    })
    pendingPause.clear()

    // 再处理播放
    const toPlay = Array.from(pendingPlay)
    pendingPlay.clear()

    // 限制同时播放数量
    const currentPlaying = playingVideos.value.size
    const canPlay = Math.max(0, maxPlayingCount.value - currentPlaying)

    toPlay.slice(0, canPlay).forEach(async (video) => {
      try {
        video.muted = true
        await video.play()
        playingVideos.value.add(video)
      }
      catch {
        // 忽略播放失败
      }
    })
  }

  /**
   * 调度队列处理
   */
  const scheduleProcess = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(processQueue)
    }
  }

  /**
   * 播放视频
   */
  const playVideo = (video: HTMLVideoElement) => {
    pendingPause.delete(video)
    pendingPlay.add(video)
    scheduleProcess()
  }

  /**
   * 暂停视频
   */
  const pauseVideo = (video: HTMLVideoElement) => {
    pendingPlay.delete(video)
    pendingPause.add(video)
    scheduleProcess()
  }

  /**
   * 检查元素是否在视口内
   */
  const isInViewport = (el: HTMLElement): boolean => {
    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    // 检查元素是否至少 50% 可见
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
    const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0)

    if (visibleHeight <= 0 || visibleWidth <= 0) return false

    const visibleArea = visibleHeight * visibleWidth
    const totalArea = rect.height * rect.width

    return totalArea > 0 && (visibleArea / totalArea) >= 0.5
  }

  /**
   * 检查并播放视口内的视频
   */
  const checkAndPlayVisibleVideos = () => {
    observedVideos.value.forEach((video) => {
      if (isInViewport(video)) {
        playVideo(video)
      }
      else {
        pauseVideo(video)
      }
    })
  }

  /**
   * 创建 IntersectionObserver
   */
  const createObserver = () => {
    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement

          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            playVideo(video)
          }
          else {
            pauseVideo(video)
          }
        })
      },
      {
        threshold: 0.5,
        // 提前加载/卸载范围
        rootMargin: '100px 0px',
      },
    )
  }

  /**
   * 观察视频元素
   */
  const observeVideo = (video: HTMLVideoElement | Ref<HTMLVideoElement | null>) => {
    const videoEl = unref(video)
    if (!videoEl || !observer) return

    // 设置视频属性
    videoEl.muted = true
    videoEl.playsInline = true
    videoEl.loop = true

    // 添加到观察列表
    observedVideos.value.add(videoEl)
    observer.observe(videoEl)

    // 立即检查是否在视口内（解决已经可见但不触发回调的问题）
    requestAnimationFrame(() => {
      if (isInViewport(videoEl)) {
        playVideo(videoEl)
      }
    })
  }

  /**
   * 停止观察视频元素
   */
  const unobserveVideo = (video: HTMLVideoElement | Ref<HTMLVideoElement | null>) => {
    const videoEl = unref(video)
    if (!videoEl || !observer) return

    observer.unobserve(videoEl)
    observedVideos.value.delete(videoEl)
    pauseVideo(videoEl)
  }

  /**
   * 销毁 observer
   */
  const destroy = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
    playingVideos.value.clear()
    observedVideos.value.clear()
    pendingPlay.clear()
    pendingPause.clear()
  }

  // 滚动结束后检查视口内视频（使用防抖）
  let scrollEndTimer: ReturnType<typeof setTimeout> | null = null
  const handleScrollEnd = () => {
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer)
    }
    scrollEndTimer = setTimeout(() => {
      checkAndPlayVisibleVideos()
    }, 150)
  }

  // 初始化
  onMounted(() => {
    createObserver()

    // 监听滚动结束事件
    if (import.meta.client) {
      window.addEventListener('scroll', handleScrollEnd, { passive: true })
    }
  })

  // 清理
  onUnmounted(() => {
    destroy()

    if (import.meta.client) {
      window.removeEventListener('scroll', handleScrollEnd)
      if (scrollEndTimer) {
        clearTimeout(scrollEndTimer)
      }
    }
  })

  return {
    playingVideos,
    maxPlayingCount,
    observeVideo,
    unobserveVideo,
    playVideo,
    pauseVideo,
    checkAndPlayVisibleVideos,
    destroy,
  }
}

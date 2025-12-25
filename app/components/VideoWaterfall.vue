<script setup lang="ts">
import type { VideoTemplate } from '#shared/types/video'

const props = defineProps<{
  videos: VideoTemplate[]
  loading?: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const { columns } = useResponsiveColumns()
const { items, columnGap, rowGap, addVideos, updateContainerWidth, clear } = useWaterfall({
  columnGap: 12,
  rowGap: 12,
})

const { observeVideo, unobserveVideo } = useVideoAutoplay()

// 瀑布流容器引用
const containerRef = ref<HTMLElement | null>(null)

// 底部加载触发器引用
const loadTriggerRef = ref<HTMLElement | null>(null)

// 视频卡片引用
const videoCardRefs = ref<Map<string, any>>(new Map())

// 使用 ResizeObserver 监听容器宽度变化
const { width: containerWidth } = useElementSize(containerRef)

// 监听容器宽度变化
watch(containerWidth, (width) => {
  if (width > 0) {
    updateContainerWidth(width)
  }
}, { immediate: true })

// 按列分组的项目
const columnItems = computed(() => {
  const result: Array<typeof items.value> = Array.from({ length: columns.value }, () => [])

  for (const item of items.value) {
    if (result[item.columnIndex]) {
      result[item.columnIndex].push(item)
    }
  }

  return result
})

// 监听视频数据变化
watch(
  () => props.videos,
  (newVideos, oldVideos) => {
    if (!oldVideos || newVideos.length === 0) {
      clear()
    }

    // 只添加新的视频
    const existingIds = new Set(items.value.map(item => item.video.id))
    const newItems = newVideos.filter(v => !existingIds.has(v.id))

    if (newItems.length > 0) {
      addVideos(newItems)
    }
  },
  { immediate: true },
)

// 设置视频卡片引用
const setVideoCardRef = (key: string, el: any) => {
  if (el) {
    videoCardRefs.value.set(key, el)
    // 观察视频元素
    nextTick(() => {
      if (el.videoRef) {
        observeVideo(el.videoRef)
      }
    })
  }
  else {
    const cardRef = videoCardRefs.value.get(key)
    if (cardRef?.videoRef) {
      unobserveVideo(cardRef.videoRef)
    }
    videoCardRefs.value.delete(key)
  }
}

// 无限滚动
const loadTriggerObserver = ref<IntersectionObserver | null>(null)

onMounted(() => {
  if (loadTriggerRef.value) {
    loadTriggerObserver.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !props.loading) {
          emit('loadMore')
        }
      },
      {
        rootMargin: '200px',
      },
    )
    loadTriggerObserver.value.observe(loadTriggerRef.value)
  }
})

onUnmounted(() => {
  if (loadTriggerObserver.value) {
    loadTriggerObserver.value.disconnect()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="video-waterfall"
    :style="{
      '--columns': columns,
      '--column-gap': `${columnGap}px`,
      '--row-gap': `${rowGap}px`,
    }"
  >
    <div class="video-waterfall__grid">
      <div
        v-for="(colItems, colIndex) in columnItems"
        :key="colIndex"
        class="video-waterfall__column"
      >
        <VideoCard
          v-for="item in colItems"
          :key="item.key"
          :ref="(el: any) => setVideoCardRef(item.key, el)"
          :video="item.video"
          :card-height="item.cardHeight"
        />
      </div>
    </div>

    <!-- 加载触发器 -->
    <div ref="loadTriggerRef" class="video-waterfall__trigger" />

    <!-- 加载状态 -->
    <div v-if="loading" class="video-waterfall__loading">
      <div class="video-waterfall__spinner" />
    </div>
  </div>
</template>

<style lang="scss">
.video-waterfall {
  width: 100%;
  padding: 0 16px;
}
.video-waterfall__grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--column-gap);
}
.video-waterfall__column {
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
  contain: layout style;
}
.video-waterfall__trigger {
  height: 1px;
  width: 100%;
}
.video-waterfall__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}
.video-waterfall__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--lol-border-muted);
  border-top-color: var(--lol-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 640px) {
  .video-waterfall {
    padding: 0 8px;
  }
}
@media (min-width: 1600px) {
  .video-waterfall {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 24px;
  }
}
</style>

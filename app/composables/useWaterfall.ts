import type { VideoTemplate } from '#shared/types/video'

/**
 * 预设宽高比选项 (width / height)
 * 更大的差异实现更明显的瀑布流效果
 */
const ASPECT_RATIOS = Object.freeze([4 / 5, 9 / 16, 2 / 3])

interface WaterfallItem {
  video: VideoTemplate
  cardHeight: number
  columnIndex: number
  key: string
  aspectRatio: number
}

interface WaterfallConfig {
  columnGap?: number
  rowGap?: number
}

/**
 * 瀑布流布局 composable
 * 管理瀑布流项目的高度和位置
 */
export const useWaterfall = (config: WaterfallConfig = {}) => {
  const {
    columnGap = 12,
    rowGap = 12,
  } = config

  const { columns } = useResponsiveColumns()

  // 瀑布流项目
  const items = ref<WaterfallItem[]>([])

  // 每列的高度
  const columnHeights = ref<number[]>([])

  // 宽高比缓存 (video id -> aspectRatio)
  const aspectRatioCache = new Map<number, number>()

  // 容器宽度（默认使用窗口宽度估算）
  const containerWidth = ref(import.meta.client ? window.innerWidth : 1200)

  // 计算单列宽度
  const columnWidth = computed(() => {
    if (containerWidth.value <= 0 || columns.value <= 0) return 200
    const totalGap = columnGap * (columns.value - 1)
    // 根据屏幕宽度确定 padding
    let padding = 32 // 默认左右各 16px
    if (containerWidth.value <= 640) {
      padding = 16 // 移动端左右各 8px
    }
    else if (containerWidth.value >= 1600) {
      padding = 48 // 大屏左右各 24px
    }
    return Math.floor((containerWidth.value - totalGap - padding) / columns.value)
  })

  /**
   * 随机选择一个宽高比
   */
  const getRandomAspectRatio = (videoId: number): number => {
    // 如果已缓存，返回缓存值
    if (aspectRatioCache.has(videoId)) {
      return aspectRatioCache.get(videoId)!
    }

    // 随机选择一个预设宽高比
    const randomIndex = Math.floor(Math.random() * ASPECT_RATIOS.length)
    const ratio = ASPECT_RATIOS[randomIndex]
    aspectRatioCache.set(videoId, ratio)
    return ratio
  }

  /**
   * 根据宽高比计算卡片高度
   * aspectRatio = width / height
   * height = width / aspectRatio
   */
  const calculateCardHeight = (aspectRatio: number): number => {
    return Math.round(columnWidth.value / aspectRatio)
  }

  /**
   * 获取最短列索引
   */
  const getShortestColumnIndex = (): number => {
    let minHeight = Infinity
    let minIndex = 0

    for (let i = 0; i < columnHeights.value.length; i++) {
      if (columnHeights.value[i] < minHeight) {
        minHeight = columnHeights.value[i]
        minIndex = i
      }
    }

    return minIndex
  }

  /**
   * 更新容器宽度
   */
  const updateContainerWidth = (width: number) => {
    if (width > 0) {
      containerWidth.value = width
    }
  }

  /**
   * 添加视频到瀑布流
   */
  const addVideos = (videos: VideoTemplate[]) => {
    // 初始化列高度
    if (columnHeights.value.length !== columns.value) {
      columnHeights.value = Array.from({ length: columns.value }, () => 0)
    }

    const newItems: WaterfallItem[] = []

    for (const video of videos) {
      const aspectRatio = getRandomAspectRatio(video.id)
      const cardHeight = calculateCardHeight(aspectRatio)
      const columnIndex = getShortestColumnIndex()

      newItems.push({
        video,
        cardHeight,
        columnIndex,
        key: String(video.id),
        aspectRatio,
      })

      // 更新列高度
      columnHeights.value[columnIndex] += cardHeight + rowGap
    }

    items.value.push(...newItems)
  }

  /**
   * 重新计算布局（响应式变化时）
   */
  const recalculateLayout = () => {
    const allVideos = items.value.map(item => item.video)
    items.value = []
    columnHeights.value = Array.from({ length: columns.value }, () => 0)

    if (allVideos.length > 0) {
      addVideos(allVideos)
    }
  }

  /**
   * 清空瀑布流
   */
  const clear = () => {
    items.value = []
    columnHeights.value = []
    aspectRatioCache.clear()
  }

  // 监听列数变化，重新计算布局
  watch(columns, () => {
    recalculateLayout()
  })

  // 监听列宽变化，重新计算卡片高度
  watch(columnWidth, () => {
    if (items.value.length > 0) {
      // 重新计算所有卡片高度
      columnHeights.value = Array.from({ length: columns.value }, () => 0)
      for (const item of items.value) {
        item.cardHeight = calculateCardHeight(item.aspectRatio)
        columnHeights.value[item.columnIndex] += item.cardHeight + rowGap
      }
    }
  })

  return {
    items,
    columns,
    columnHeights,
    columnGap,
    rowGap,
    columnWidth,
    addVideos,
    recalculateLayout,
    updateContainerWidth,
    clear,
  }
}

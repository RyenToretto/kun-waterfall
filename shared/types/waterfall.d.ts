import type { VideoTemplate } from './video'

/**
 * 瀑布流列配置
 */
export interface WaterfallColumn {
  /** 列索引 */
  index: number
  /** 当前列高度 */
  height: number
  /** 列中的项目 */
  items: WaterfallItem[]
}

/**
 * 瀑布流项目
 */
export interface WaterfallItem {
  /** 视频数据 */
  video: VideoTemplate
  /** 卡片高度 */
  cardHeight: number
  /** 所在列索引 */
  columnIndex: number
  /** 顶部偏移 */
  top: number
  /** 是否在视口内 */
  isVisible: boolean
  /** 唯一键值 */
  key: string
}

/**
 * 虚拟滚动状态
 */
export interface VirtualScrollState {
  /** 可见区域起始索引 */
  startIndex: number
  /** 可见区域结束索引 */
  endIndex: number
  /** 缓冲区大小（屏） */
  bufferSize: number
  /** 滚动偏移量 */
  scrollOffset: number
  /** 容器高度 */
  containerHeight: number
}

/**
 * 响应式断点配置
 */
export interface ResponsiveBreakpoint {
  /** 最小宽度 */
  minWidth: number
  /** 最大宽度 */
  maxWidth: number
  /** 列数 */
  columns: number
}

/**
 * 瀑布流配置
 */
export interface WaterfallConfig {
  /** 列间距 */
  columnGap: number
  /** 行间距 */
  rowGap: number
  /** 内边距 */
  padding: number
  /** 随机高度最小比例 */
  minHeightRatio: number
  /** 随机高度最大比例 */
  maxHeightRatio: number
}


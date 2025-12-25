import type { VideoTemplate } from './video'

/**
 * 预设宽高比选项 (width / height)
 */
export const ASPECT_RATIOS = Object.freeze([4 / 5, 9 / 16, 2 / 3]) as readonly number[]

/**
 * 瀑布流列
 */
export interface WaterfallColumn {
  /** 列索引 */
  index: number
  /** 列高度 */
  height: number
  /** 列内项目 */
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
  /** 所属列索引 */
  columnIndex: number
  /** 唯一标识 */
  key: string
  /** 宽高比 (width / height) */
  aspectRatio: number
}

/**
 * 虚拟滚动状态
 */
export interface VirtualScrollState {
  /** 滚动位置 */
  scrollTop: number
  /** 容器高度 */
  containerHeight: number
  /** 可见起始索引 */
  startIndex: number
  /** 可见结束索引 */
  endIndex: number
  /** 缓冲区大小 */
  bufferSize: number
}

/**
 * 响应式断点
 */
export interface ResponsiveBreakpoint {
  /** 断点名称 */
  name: string
  /** 最小宽度 */
  minWidth: number
  /** 列数 */
  columns: number
}

/**
 * 瀑布流配置
 */
export interface WaterfallConfig {
  /** 列间距 */
  columnGap?: number
  /** 行间距 */
  rowGap?: number
}

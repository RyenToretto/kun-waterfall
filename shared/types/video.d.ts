/**
 * 视频模板数据类型
 * 基于 pixpop.ai API 数据结构
 */
export interface VideoTemplate {
  /** 唯一标识 */
  id: string
  /** 视频标题 */
  title: string
  /** 封面图 URL */
  coverUrl: string
  /** 视频 URL */
  videoUrl: string
  /** 视频宽度 */
  width: number
  /** 视频高度 */
  height: number
  /** 视频时长（秒） */
  duration: number
  /** 点赞数 */
  likeCount: number
  /** 收藏数 */
  collectCount: number
  /** 播放数 */
  playCount: number
  /** 创建时间 */
  createTime: string
  /** 是否已收藏 */
  isCollected?: boolean
  /** 是否已点赞 */
  isLiked?: boolean
}

/**
 * 视频卡片尺寸类型
 */
export interface VideoCardSize {
  /** 卡片宽度 */
  width: number
  /** 卡片高度 */
  height: number
  /** 高度比例系数 (1-1.5) */
  heightRatio: number
}

/**
 * 视频方向类型
 */
export type VideoOrientation = 'portrait' | 'landscape' | 'square'

/**
 * 获取视频方向
 */
export function getVideoOrientation(width: number, height: number): VideoOrientation {
  if (height > width * 1.2) return 'portrait'
  if (width > height * 1.2) return 'landscape'
  return 'square'
}


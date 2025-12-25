/**
 * 视频模板数据类型
 * 基于真实 API 数据结构
 */
export interface VideoTemplate {
  /** 唯一标识 */
  id: number
  /** 模板名称 */
  templateName: string
  /** 英文名称 */
  templateEnName: string
  /** 中文名称 */
  templateCnName: string
  /** 分类中文名 */
  categoryCnName: string
  /** 分类ID */
  categoryId: number
  /** 套装ID */
  suitId: number
  /** 模板功能 */
  templateFunction: number
  /** 标签ID */
  tagId: number
  /** 高度 */
  height: number
  /** 宽度 */
  width: number
  /** 宽高比 */
  aspectRatio: number
  /** 首图URL */
  firstImageUrl: string
  /** 缩略图URL */
  thumbUrl: string
  /** 视频URL */
  movieUrl: string
  /** 预览视频URL (webp) */
  previewMovUrl: string
  /** 视频模型 */
  videoModel: string
  /** 视频分辨率 */
  videoResolution: string
  /** 视频时长 */
  videoLength: string
  /** AI类型 */
  aiType: number
  /** 上次AI类型 */
  lastAiType: number
  /** 供应商 */
  supplier: number
  /** 是否合并图片 */
  mergeImage: number
  /** 第三方ID */
  thirdId: string
  /** 是否默认 */
  isDefault: number
  /** 排序 */
  sort: number
  /** 是否收藏 */
  isCollect: boolean
  /** 价格档次 */
  priceGear: number
  /** 显示人像 */
  showPortrait: number
  /** 语音性别 */
  voiceGender: number
  /** 语音文本 */
  voiceText: string
  /** 积分消耗 */
  pointCost: number
  /** 预览BGM */
  previewBgm: string
  /** 音频URL */
  audioUrl: string
  /** 音频时长 */
  audioLength: number
  /** 页面SEO标题 */
  pageSeoTitle: string
  /** 页面SEO描述 */
  pageSeoDesc: string
  /** 模板SEO路径 */
  templateSeoPath: string
  /** 扩展参数 */
  extParams: {
    videoLength: Array<{ time: string }>
    resolution: Array<{ ration: string }>
  }
  /** 图片配置 */
  images: Array<{
    name: string
    desc: string
    guideX: number
    guideY: number
    guideScale: number
    width: number
    height: number
    limit: Array<{ type: number, num: number }>
  }>
}

/**
 * 视频方向类型
 */
export type VideoOrientation = 'portrait' | 'landscape' | 'square'

/**
 * 获取视频方向
 */
export function getVideoOrientation(aspectRatio: number): VideoOrientation {
  if (aspectRatio < 0.8) return 'portrait'
  if (aspectRatio > 1.2) return 'landscape'
  return 'square'
}

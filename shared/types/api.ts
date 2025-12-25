import type { VideoTemplate } from './video'

/**
 * API 消息结构
 */
export interface ApiMessage {
  /** 状态码 */
  code: number
  /** 消息信息 */
  messageInfo: string
  /** 服务器时间 */
  serverTime: number
}

/**
 * 分页结果结构
 */
export interface PaginatedResult<T> {
  /** 当前页码 */
  curPage: number
  /** 每页数量 */
  pageSize: number
  /** 总数量 */
  totalSize: number
  /** 数据列表 */
  data: T[]
}

/**
 * API 响应基础结构
 */
export interface ApiResponse<T = unknown> {
  /** 结果数据 */
  result: T
  /** 消息 */
  message: ApiMessage
}

/**
 * 视频列表请求参数
 */
export interface VideoListParams {
  /** 当前页码 */
  curPage: number
  /** 每页数量 */
  pageSize?: number
}

/**
 * 视频列表响应
 */
export type VideoListResponse = ApiResponse<PaginatedResult<VideoTemplate>>

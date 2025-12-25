import type { VideoTemplate } from './video'

/**
 * API 响应基础结构
 */
export interface ApiResponse<T = unknown> {
  /** 响应状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
}

/**
 * 分页数据结构
 */
export interface PaginatedData<T> {
  /** 数据列表 */
  list: T[]
  /** 总数 */
  total: number
  /** 当前页码 */
  curPage: number
  /** 每页数量 */
  pageSize: number
  /** 是否有更多 */
  hasMore: boolean
}

/**
 * 视频列表请求参数
 */
export interface VideoListParams {
  /** 当前页码 */
  curPage: number
  /** 每页数量 */
  pageSize: number
}

/**
 * 视频列表响应
 */
export type VideoListResponse = ApiResponse<PaginatedData<VideoTemplate>>


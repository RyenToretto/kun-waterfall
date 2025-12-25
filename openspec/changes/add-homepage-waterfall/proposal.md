## Why

随着业务发展，需要一个高性能、用户体验优秀的首页，用于展示视频内容。项目目标是在 PC 与移动端均能流畅访问，同时保证 SEO 优化和高性能渲染，为未来多页面扩展打基础。

## What Changes

- 新增固定液态玻璃效果的 Header 组件
- 新增视频瀑布流布局组件，支持随机尺寸卡片
- 实现基于 IntersectionObserver 的视频自动播放逻辑
- 实现响应式布局，根据视口宽度动态调整瀑布流列数
- 实现虚拟滚动和懒加载优化，保证滚动不卡顿
- 新增 Mock 数据系统，基于真实 API 数据结构
- 配置 Nuxt 4 项目基础架构（Nuxt UI、SCSS、TypeScript）

## Impact

- Affected specs: header, video-waterfall, video-autoplay, responsive-layout, mock-data
- Affected code:
  - `app/pages/index.vue` - 首页入口
  - `app/components/HomeHeader.vue` - Header 组件
  - `app/components/VideoWaterfall.vue` - 瀑布流组件
  - `app/components/VideoCard.vue` - 视频卡片组件
  - `app/composables/useResponsiveColumns.ts` - 响应式列数
  - `app/composables/useVideoAutoplay.ts` - 视频自动播放
  - `app/composables/useVirtualScroll.ts` - 虚拟滚动
  - `server/api/videos.ts` - Mock API
  - `shared/types/video.d.ts` - 视频类型定义

## Performance Goals

- 首屏渲染时间 ≤ 1s
- 滚动帧率 ≥ 55 FPS
- 视频加载延迟 ≤ 300ms
- 移动端滑动不卡顿，无明显掉帧


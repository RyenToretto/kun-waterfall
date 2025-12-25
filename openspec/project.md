# Project Context

## Purpose
高性能视频瀑布流首页项目，用于展示视频内容。目标是在 PC 与移动端均能流畅访问，同时保证 SEO 优化和高性能渲染。

## Tech Stack
- **框架**: Nuxt 4 (Vue 3 Composition API)
- **UI 库**: Nuxt UI 3.x
- **样式**: SCSS + CSS Variables (禁止 Tailwind class in template)
- **类型**: TypeScript
- **状态管理**: Pinia (setup 形式)
- **国际化**: @nuxtjs/i18n
- **工具库**: @vueuse/core

## Project Conventions

### Code Style
- 使用 ESLint 规范代码
- 使用 `import.meta.client` 替代 `process.client`
- 类型统一定义在 `/shared/types` 目录
- CSS 不使用 `&` 拼接类名，必须写完整类名
- 禁止在 DOM 中使用 Tailwind CSS class

### Component Naming
- 页面组件: `page-xxx` 作为根 class
- 普通组件: `组件名-xxx` 作为根 class
- BEM 风格: `.example-header { .example-hd__wrapper {} }`

### Architecture Patterns
- Nuxt 4 目录结构 (`app/` 目录规范)
- Composables 优先使用组合式 API
- 组件化开发，单一职责

### Testing Strategy
- Lighthouse 性能测试
- Web Vitals 监控

### Git Workflow
- 使用 OpenSpec 进行规格驱动开发
- PR 前需通过 `openspec validate` 验证

## Domain Context
- 视频瀑布流布局
- IntersectionObserver 视频自动播放
- 响应式设计 (PC 1920px, 移动端 375px)
- 虚拟滚动优化

## Important Constraints
- HTML font-size 固定 16px
- 禁止使用原生 HTML5 表单验证属性
- 滚动帧率 ≥ 55 FPS
- 首屏渲染 ≤ 1s

## External Dependencies
- Mock API: `/api/videos` (基于真实 pixpop.ai 数据结构)
- 视频资源: W3Schools 示例视频
- 图片资源: Unsplash

## Performance Goals
- 首屏渲染时间 ≤ 1s
- 滚动帧率 ≥ 55 FPS
- 视频加载延迟 ≤ 300ms
- 移动端滑动流畅无卡顿

## 1. 项目初始化

- [x] 1.1 更新 project.md 项目配置文档
- [x] 1.2 配置 Nuxt 4 基础设置（nuxt.config.ts）
- [x] 1.3 安装必要依赖（@nuxt/ui, @vueuse/core 等）
- [x] 1.4 配置 SCSS 全局样式和 CSS 变量
- [x] 1.5 配置 i18n 国际化

## 2. 类型定义

- [x] 2.1 创建 shared/types/video.d.ts 视频类型
- [x] 2.2 创建 shared/types/api.d.ts API 响应类型
- [x] 2.3 创建 shared/types/waterfall.d.ts 瀑布流相关类型

## 3. Mock 数据

- [x] 3.1 获取并存储真实 API 数据结构
- [x] 3.2 创建 server/api/videos.get.ts Mock API
- [x] 3.3 实现分页逻辑

## 4. 响应式布局

- [x] 4.1 创建 useResponsiveColumns composable
- [x] 4.2 实现断点响应式逻辑
- [x] 4.3 配置全局响应式变量

## 5. Header 组件

- [x] 5.1 创建 HomeHeader.vue 组件
- [x] 5.2 实现液态玻璃效果（backdrop-filter + rgba）
- [x] 5.3 实现固定定位和响应式样式

## 6. Footer 组件

- [x] 6.1 创建 HomeFooter.vue 组件
- [x] 6.2 实现液态玻璃效果（backdrop-filter + rgba）
- [x] 6.3 实现静态定位和声明内容

## 7. 视频卡片组件

- [x] 7.1 创建 VideoCard.vue 组件
- [x] 7.2 实现随机尺寸逻辑
- [x] 7.3 实现视频内容裁剪（竖屏顶部，横屏中间）
- [ ] 7.4 实现收藏按钮（可扩展）

## 8. 瀑布流布局

- [x] 8.1 创建 VideoWaterfall.vue 组件
- [x] 8.2 实现 CSS Grid 多列布局
- [x] 8.3 实现瀑布流高度算法
- [x] 8.4 实现加载更多逻辑

## 9. 视频自动播放

- [x] 9.1 创建 useVideoAutoplay composable
- [x] 9.2 实现 IntersectionObserver 监听
- [x] 9.3 实现播放数量限制逻辑
- [x] 9.4 实现移动端静音播放

## 10. 虚拟滚动

- [x] 10.1 创建 useWaterfall composable
- [x] 10.2 实现可见区域计算
- [x] 10.3 实现缓冲区管理
- [x] 10.4 实现滚动性能优化

## 11. 首页整合

- [x] 11.1 创建 app/pages/index.vue
- [x] 11.2 整合所有组件
- [x] 11.3 实现无限滚动加载
- [ ] 11.4 添加骨架屏/加载状态

## 12. 性能优化

- [ ] 12.1 Lighthouse 性能测试
- [ ] 12.2 首屏渲染优化
- [ ] 12.3 滚动帧率优化
- [ ] 12.4 视频加载优化

## 13. 部署配置

- [ ] 13.1 配置 Git Pages 部署
- [ ] 13.2 配置构建脚本

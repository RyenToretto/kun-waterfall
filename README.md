# 原始需求文档 - 高性能首页项目

## 1️⃣ 项目背景

随着业务发展，需要一个高性能、用户体验优秀的首页，用于展示视频内容。项目目标是在 PC 与移动端均能流畅访问，同时保证 SEO 优化和高性能渲染，为未来多页面扩展打基础。

---

## 2️⃣ 项目目标

- 第一期需求只有首页（Home landing page），后续根据需求逐步扩展其他页面
- 所有依赖尽量使用最新的，比如nuxtUI@4.2.2
- PC + 移动端响应式兼容，设计稿pc端是1920尺寸的，移动端是375px尺寸的，要求html 的font-size始终固定是16px，需要新增规则约束去统一兼容方案；
- 用户体验优先，滚动不卡顿，视频自动播放
- 高性能首屏渲染
- 可扩展、易维护的技术架构

---

## 3️⃣ 功能需求

### 3.1 Header（固定液态玻璃）

- 固定在页面顶部
- 液态玻璃效果（半透明 + 模糊背景）
- 显示 [Title]，居中
- 响应式适配 PC / 移动端

### 3.2 视频瀑布流

- 视频元素按瀑布流布局排列
- 视频尺寸大部分相同，所以需要组件去随机尺寸，形成瀑布流效果(元素内容铺满卡片，如果需要截取的话，竖屏视频截取顶部的部分，横屏截取中间部分)
- 仅视口内视频自动播放
- 滚动时懒加载和虚拟滚动优化，避免卡顿，不能发生dom在视觉中消失出现的情况，视觉内页不允许有卡渲染的元素情况出现

### 3.3 自动播放逻辑

- IntersectionObserver 监听视频进入视口
- 视口内自动播放，离开视口暂停
- 移动端视频静音自动播放（`muted autoplay playsinline`）

---

## 4️⃣ 非功能需求

- **性能**：滚动不卡顿，视频播放流畅
- **可维护性**：组件化开发，未来易扩展
- **兼容性**：PC 与移动端主流浏览器（Chrome、Safari、Edge）

---

## 5️⃣ 技术要求

| 模块 | 技术/依赖 | 说明 |
|------|-----------|------|
| 前端框架 | Nuxt 4 | 组件化 |
| 样式 | SCSS / Tailwind CSS | 响应式 + 液态玻璃效果 |
| 视频播放 | HTML5 `<video>` + IntersectionObserver | 自动播放视口内视频 |
| 瀑布流布局 | CSS Grid + JS 算法 | 随机列高瀑布流效果 |
| 虚拟滚动 | vue-virtual-scroller / 自定义 | 大量视频滚动不卡顿 |
| 性能监控 | Lighthouse / Web Vitals | 测试首屏渲染、滚动流畅度 |

---

## 6️⃣ 性能指标

- 首屏渲染时间 ≤ 1s
- 滚动帧率 ≥ 55 FPS
- 视频加载延迟 ≤ 300ms
- 移动端滑动不卡顿，无明显掉帧

---

## 7️⃣ 响应式与布局

- 根据视口宽度动态调整瀑布流列数：
```typescript
export const useResponsiveColumns = () => {
  const { width } = useWindowSize()
  return computed(() => {
    let colCount: number
    if (width.value < 640) {
      colCount = 2
    } else if (width.value >= 640 && width.value < 980) {
      colCount = 3
    } else if (width.value >= 980 && width.value < 1200) {
      colCount = 4
    } else if (width.value >= 1200 && width.value < 1460) {
      colCount = 5
    } else {
      colCount = 6
    }
    return colCount
  })
}
```

---

## 8️⃣ 后续可扩展需求

- 视频互动功能（右上角收藏）

---

## 9️⃣ 开发与部署流程建议

1. 初始化 Nuxt 项目（Nuxt 4 + nuxt4 + Tailwind + SCSS + typescript）  
2. 开发 Header 组件  
3. 开发 VideoCard 组件 + 瀑布流布局逻辑  
4. 实现 IntersectionObserver 自动播放逻辑  
5. 虚拟滚动 + 视频懒加载优化性能  
6. 响应式布局 + 移动端滑动优化  
7. 性能测试（Lighthouse / Web Vitals）  
8. 支持打包部署至 git pages

---

## 10 接口需要按下面格式去 mock 数据

- 根据下面curl推理出接口的请求参数，并获取其20页真实数据存到项目中，然后mock数据从下面拉20页真实数据及其结构，作为mock假数据
```shell
curl 'https://www.pixpop.ai/api/v1/template/explore?w=1728&h=1117&sdk=pixpop_web&os=Mac&brand=Mac&model=10_15_7&vendor=10_15_7&lang=zh-CN&locale=zh-CN&tk=R2j22yVQSV3Iwj1t0t7w3r5YGcD72XFU&anid=R2j22yVQSV3Iwj1t0t7w3r5YGcD72XFU&oaid=R2j22yVQSV3Iwj1t0t7w3r5YGcD72XFU&app_instance_id=889045131.1755715302&sdkvn=1.0.1&pkg=www.pixpop.ai&v=10001&vn=1.0.1&channel=web&curPage=2&pageSize=20&businessUserId=R2j22yVQSV3Iwj1t0t7w3r5YGcD72XFU&ts=1766677273552&vc=409025a946d866ecdbe8b27a52c32abe' \
  -H 'accept: */*' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,vi;q=0.7,th;q=0.6,ru;q=0.5,pl;q=0.4,nl;q=0.3,ms;q=0.2,ko;q=0.1,ja;q=0.1' \
  -b 'i18n_redirected=en; _ga=GA1.1.889045131.1755715302; pix_ut=R2j22yVQSV3Iwj1t0t7w3r5YGcD72XFU; pix_bid=; _ga_DF9TQDNJJX=GS2.1.s1765739318$o19$g1$t1765739352$j26$l0$h0; g_state={"i_l":0,"i_ll":1766675638509,"i_b":"qIhGTtspvQenwLkw3zcEdBQOXFHdgRcrdHh8IxGU50I","i_e":{"enable_itp_optimization":0}}; _ga_KN9HLMRJFM=GS2.1.s1766675628$o11$g1$t1766677266$j56$l0$h0' \
  -H 'priority: u=1, i' \
  -H 'referer: https://www.pixpop.ai/' \
  -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
```

## 11 附录 

- 设计参考：
  - 液态玻璃效果：CSS `backdrop-filter` + rgba
  - 视频瀑布流布局参考 Pinterest、Bilibili 视频首页
- 浏览器兼容性：
  - Chrome / Safari / Edge 最新版本
  - 移动端 iOS / Android 主流浏览器
- 工具：
  - Figma（UI 设计）
  - Lighthouse（性能测试）
  - Cursor（AI 自动生成组件 & 布局逻辑）

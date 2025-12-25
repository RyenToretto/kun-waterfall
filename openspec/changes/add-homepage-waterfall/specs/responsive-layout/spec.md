## ADDED Requirements

### Requirement: 响应式列数调整

系统 SHALL 根据视口宽度动态调整瀑布流列数。

#### Scenario: 移动端 2 列布局

- **WHEN** 视口宽度小于 640px
- **THEN** 瀑布流显示 2 列

#### Scenario: 小平板 3 列布局

- **WHEN** 视口宽度在 640px 到 979px 之间
- **THEN** 瀑布流显示 3 列

#### Scenario: 大平板 4 列布局

- **WHEN** 视口宽度在 980px 到 1199px 之间
- **THEN** 瀑布流显示 4 列

#### Scenario: 小桌面 5 列布局

- **WHEN** 视口宽度在 1200px 到 1459px 之间
- **THEN** 瀑布流显示 5 列

#### Scenario: 大桌面 6 列布局

- **WHEN** 视口宽度大于等于 1460px
- **THEN** 瀑布流显示 6 列

### Requirement: 固定字体大小

系统 SHALL 保持 HTML 根元素字体大小固定为 16px。

#### Scenario: 根字体大小固定

- **WHEN** 任意视口宽度
- **THEN** HTML 根元素 font-size 始终为 16px
- **AND** 不使用 rem 动态缩放方案
- **AND** 使用 px 或其他单位实现响应式

### Requirement: 设计稿适配

系统 SHALL 适配 PC 端 1920px 和移动端 375px 设计稿。

#### Scenario: PC 端设计稿适配

- **WHEN** 视口宽度为 1920px 或接近
- **THEN** 页面布局与 PC 设计稿一致
- **AND** 内容居中或适当缩放

#### Scenario: 移动端设计稿适配

- **WHEN** 视口宽度为 375px 或接近
- **THEN** 页面布局与移动端设计稿一致
- **AND** 内容适配移动端屏幕

### Requirement: 滚动性能

系统 SHALL 保证滚动流畅，帧率不低于 55 FPS。

#### Scenario: 滚动帧率保证

- **WHEN** 用户滚动页面
- **THEN** 滚动帧率不低于 55 FPS
- **AND** 无明显卡顿或掉帧
- **AND** 移动端滑动同样流畅


## ADDED Requirements

### Requirement: Header 固定液态玻璃效果

系统 SHALL 提供一个固定在页面顶部的 Header 组件，具有液态玻璃效果（半透明 + 模糊背景）。

#### Scenario: Header 始终固定在顶部

- **WHEN** 用户滚动页面
- **THEN** Header 组件始终固定在视口顶部
- **AND** Header 不随页面内容滚动

#### Scenario: Header 液态玻璃效果

- **WHEN** Header 渲染完成
- **THEN** Header 背景应用 `backdrop-filter: blur()` 模糊效果
- **AND** Header 背景使用 rgba 半透明颜色
- **AND** 滚动时可透过 Header 看到模糊的下层内容

#### Scenario: Header 响应式适配

- **WHEN** 视口宽度变化
- **THEN** Header 宽度始终为 100%
- **AND** Header 内容（标题）始终居中显示
- **AND** PC 端和移动端均正常显示

### Requirement: Header 标题显示

系统 SHALL 在 Header 中居中显示网站标题。

#### Scenario: 标题居中显示

- **WHEN** Header 渲染完成
- **THEN** 标题文本水平居中于 Header
- **AND** 标题使用 i18n 国际化 key

### Requirement: Footer 液态玻璃效果

系统 SHALL 提供一个位于页面底部的 Footer 组件，具有液态玻璃效果，显示声明信息。

#### Scenario: Footer 静态定位

- **WHEN** Footer 渲染完成
- **THEN** Footer 使用静态定位（position: static）
- **AND** Footer 位于瀑布流内容下方
- **AND** Footer 高度为 200px

#### Scenario: Footer 液态玻璃效果

- **WHEN** Footer 渲染完成
- **THEN** Footer 背景应用 `backdrop-filter: blur()` 模糊效果
- **AND** Footer 背景使用 rgba 半透明颜色

#### Scenario: Footer 声明内容

- **WHEN** Footer 渲染完成
- **THEN** Footer 显示网站声明信息
- **AND** 声明内容使用 i18n 国际化 key
- **AND** 内容居中显示

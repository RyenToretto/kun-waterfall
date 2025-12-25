## ADDED Requirements

### Requirement: 视口内视频自动播放

系统 SHALL 使用 IntersectionObserver 监听视频进入视口，自动播放视口内视频。

#### Scenario: 视频进入视口自动播放

- **WHEN** 视频元素 50% 以上进入可视区域
- **THEN** 该视频自动开始播放
- **AND** 使用 IntersectionObserver API 监听
- **AND** threshold 设置为 0.5

#### Scenario: 视频离开视口暂停

- **WHEN** 视频元素离开可视区域（小于 50% 可见）
- **THEN** 该视频自动暂停播放
- **AND** 释放视频播放资源

#### Scenario: 移动端静音自动播放

- **WHEN** 在移动端设备访问
- **THEN** 视频使用 `muted autoplay playsinline` 属性
- **AND** 视频静音自动播放
- **AND** 不触发浏览器自动播放限制

### Requirement: 播放数量限制

系统 SHALL 限制同时播放的视频数量，避免资源占用过高。

#### Scenario: PC 端播放数量限制

- **WHEN** 在 PC 端访问
- **THEN** 同时播放的视频数量不超过 6 个
- **AND** 超出限制时，暂停最早进入视口的视频

#### Scenario: 移动端播放数量限制

- **WHEN** 在移动端访问
- **THEN** 同时播放的视频数量不超过 3 个
- **AND** 超出限制时，暂停最早进入视口的视频

### Requirement: 视频资源管理

系统 SHALL 管理视频资源，避免内存泄漏。

#### Scenario: 视频资源回收

- **WHEN** 视频卡片被虚拟滚动移除 DOM
- **THEN** 暂停视频播放
- **AND** 释放视频占用的内存资源
- **AND** 清理 IntersectionObserver 监听器


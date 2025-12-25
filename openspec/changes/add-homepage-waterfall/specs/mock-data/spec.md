## ADDED Requirements

### Requirement: Mock 数据接口

系统 SHALL 提供 Mock API 接口，返回视频列表数据。

#### Scenario: 分页数据请求

- **WHEN** 前端请求 `/api/videos?curPage=1&pageSize=20`
- **THEN** 返回对应页码的视频数据
- **AND** 数据结构与真实 API 一致
- **AND** 支持 curPage 和 pageSize 参数

#### Scenario: 数据格式一致

- **WHEN** Mock API 返回数据
- **THEN** 数据结构与参考 API 格式一致
- **AND** 包含视频 URL、封面、尺寸等必要字段

#### Scenario: 20 页数据存储

- **WHEN** Mock 系统初始化
- **THEN** 预存储 20 页真实数据
- **AND** 数据来源于参考 API
- **AND** 数据存储在项目中供开发使用

### Requirement: 视频数据类型定义

系统 SHALL 提供统一的视频数据类型定义。

#### Scenario: 类型定义完整

- **WHEN** 使用视频数据
- **THEN** 所有字段有明确的 TypeScript 类型定义
- **AND** 类型定义位于 shared/types 目录
- **AND** 包含视频 ID、URL、封面、宽高等字段

### Requirement: API 响应类型定义

系统 SHALL 提供 API 响应的类型定义。

#### Scenario: 响应类型定义

- **WHEN** 调用 Mock API
- **THEN** 响应数据有明确的类型定义
- **AND** 包含 code、message、data 等标准字段
- **AND** data 中包含列表和分页信息


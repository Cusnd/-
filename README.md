# 智能汽车生产管理系统

一个基于 Vue 3 + Element Plus 的现代化智能汽车生产管理系统前端项目。

## 功能特点

- 📊 生产管理：计划制定、任务分配、质量控制
- 📦 库存管理：原材料、成品管理、出入库记录
- 🔧 设备管理：设备监控、维护记录、故障处理
- 👥 人员管理：员工信息、排班管理、绩效考核
- ⚙️ 系统设置：主题切换、语言设置、数据备份

## 技术栈

- Vue 3
- Vue Router
- Element Plus
- ECharts
- LocalStorage

## 快速开始

### 环境要求

- Node.js >= 16
- npm >= 7

### 安装

```bash
# 克隆项目
git clone [repository-url]

# 进入项目目录
cd Control

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建

```bash
# 构建生产版本
npm run build
```

## 项目结构

```
Control/
├── src/
│   ├── assets/      # 静态资源
│   ├── components/  # 公共组件
│   ├── router/      # 路由配置
│   ├── utils/       # 工具函数
│   ├── views/       # 页面组件
│   ├── App.vue      # 根组件
│   └── main.js      # 入口文件
├── public/          # 公共文件
└── package.json     # 项目配置
```

## 数据持久化

系统使用 LocalStorage 进行数据持久化存储，支持数据的导入导出功能：

- 支持按模块导出数据
- 支持导出所有数据
- 支持数据备份和恢复

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)

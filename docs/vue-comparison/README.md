# Vue 3 vs 原生JavaScript 对比学习指南

本目录包含 TodoMVC 项目的 Vue 3 版本与原生 JavaScript 版本的详细对比文档。

## 📚 文档列表

### 快速入门
- **[01-quick-comparison.md](01-quick-comparison.md)** - 5分钟速览核心差异
- **[02-syntax-table.md](02-syntax-table.md)** - 语法速查表

### 架构与原理
- **[03-architecture.md](03-architecture.md)** - 架构设计对比
- **[04-state-management.md](04-state-management.md)** - 状态管理对比（全局变量 vs Pinia）

### 功能模块对比
- **[05-todo-comparison.md](05-todo-comparison.md)** - Todo List 详细对比
- **[06-countdown-comparison.md](06-countdown-comparison.md)** - 倒数日功能对比
- **[07-timeline-comparison.md](07-timeline-comparison.md)** - 路线图功能对比

### 实践建议
- **[08-when-to-use.md](08-when-to-use.md)** - 何时使用原生JS，何时使用框架

## 🎯 学习路径

### 路径一：快速对比（适合有Vue基础）
```
01 快速概览 → 02 语法表 → 查看源码
```

### 路径二：深度学习（适合Vue初学者）
```
03 架构对比 → 04 状态管理 → 05-07 功能模块 → 08 实践建议
```

## 💡 对比重点

### 核心概念对比

| 概念 | 原生JS | Vue 3 |
|-----|--------|-------|
| 编程范式 | 命令式 | 声明式 |
| DOM操作 | 手动操作 | 虚拟DOM |
| 数据更新 | 手动渲染 | 响应式 |
| 代码组织 | 函数式 | 组件化 |
| 状态管理 | 全局变量 | Pinia Store |
| 类型安全 | 无 | TypeScript |

### 代码量对比

- **原生JS版本**: ~990行（单文件）
- **Vue版本**: ~600行（预估，多文件模块化）

### 学习目标

通过对比学习，你将理解：
- ✅ 框架解决了什么问题
- ✅ 响应式系统的工作原理
- ✅ 组件化带来的好处
- ✅ 何时该用框架，何时用原生
- ✅ 现代前端工程化思维

## 📖 使用建议

1. **先完成原生JS版本** - 这是基础
2. **边看代码边看文档** - 对照学习效果最好
3. **理解而非记忆** - 重在理解思维方式
4. **动手尝试** - 可以尝试修改代码验证理解

## 🔗 相关资源

- [原生JS版本源码](../../)
- [Vue版本源码](../../vue-version/)
- [Vue官方文档](https://cn.vuejs.org/)
- [Pinia官方文档](https://pinia.vuejs.org/zh/)

---

**开始学习** → [01-quick-comparison.md](01-quick-comparison.md)


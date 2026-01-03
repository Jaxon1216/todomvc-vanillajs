# 🎯 TodoMVC - 纯原生 JavaScript 实战教程

> 从零开始，手把手教你用 HTML、CSS 和纯原生 JavaScript 构建一个功能完整的多模块 TodoMVC 应用。

![项目预览](https://img.shields.io/badge/难度-零基础友好-green) ![技术栈](https://img.shields.io/badge/技术栈-HTML%20%7C%20CSS%20%7C%20Vanilla%20JS-blue) ![无依赖](https://img.shields.io/badge/依赖-无-orange)

---

## 📖 这是什么项目？

这是一个**教学型项目**，专为前端零基础或刚入门的学习者设计。

通过这个项目，你将：

- ✅ 学会使用 HTML 构建语义化的页面结构
- ✅ 掌握 CSS Flex 布局和现代样式技巧
- ✅ 理解 DOM 操作、事件绑定、事件委托
- ✅ 学会使用 localStorage 进行数据持久化
- ✅ 掌握 Date 对象和时间计算
- ✅ 掌握 CSS 媒体查询实现响应式布局
- ✅ 完成一个可长期使用的实用工具

**关键特点：**

- 🚫 不使用任何框架（React、Vue、Angular 都不用）
- 🚫 不使用任何第三方库（jQuery 也不用）
- ✅ 100% 纯原生 JavaScript
- ✅ 每一行代码都有详细注释
- ✅ 从第一行代码开始，手把手教学

---

## 🎨 项目预览

项目包含三个功能模块，支持桌面端、平板、手机全响应式适配：

| 模块 | 功能描述 | 学习重点 |
|------|----------|----------|
| **Todo List** | 待办事项管理 | DOM 操作、事件委托、localStorage |
| **倒数日** | 重要日期倒计时 | Date 对象、时间计算、定时器 |
| **路线图** | 学习进度追踪 | 时间轴布局、状态管理、动态样式 |
| **响应式布局** | 移动端适配 | 媒体查询、Flexbox、断点设计 |

---

## 🚀 快速开始

### 第一步：获取代码

**方式一：直接下载**

点击页面右上角的绿色 `Code` 按钮，选择 `Download ZIP`，解压到本地。

**方式二：使用 Git 克隆**

```bash
git clone https://github.com/Jaxon1216/todomvc-vanillajs.git
cd todomvc-vanillajs
```

### 第二步：选择学习方式

**方式一：从零开始（推荐）**

使用 `starter` 文件夹，里面有空白的起始文件，跟着教程一步步写代码：

```
starter/
├── index.html   ← 在这里写 HTML
├── style.css    ← 在这里写 CSS
└── app.js       ← 在这里写 JavaScript
```

1. 用 VS Code 打开 `starter` 文件夹
2. 跟着教程逐步输入代码
3. 每写完一部分，在浏览器中打开 `starter/index.html` 查看效果

**方式二：查看完整代码**

直接用浏览器打开根目录的 `index.html`，可以看到完整的项目效果：

1. 找到项目根目录的 `index.html`
2. 双击打开（或右键 → 用浏览器打开）
3. 🎉 完成！你应该能看到左侧浅蓝色侧边栏和右侧白色内容区

> 💡 **建议**：先用方式一跟着教程动手写，遇到问题再参考根目录的完整代码。

---

## 📚 教程目录

本教程分为三个部分，由浅入深：

### 基础篇：Todo List（入门必学）

📄 **教程链接**：[docs/basic.md](docs/basic.md)

**学习内容**：
- Step 1：搭建基础页面结构与侧边栏布局
- Step 2：实现 Todo 页面 HTML 结构
- Step 3：实现 Todo 页面 CSS 样式
- Step 4：实现新增 Todo
- Step 5：实现删除 Todo（事件委托）
- Step 6：实现完成/未完成状态切换
- Step 7：实现 Todo 筛选
- Step 8：接入 localStorage
- Step 9：常见 bug 修复

**预计学习时间**：4-6 小时

---

### 进阶篇 1：倒数日（Date 对象实战）

📄 **教程链接**：[docs/countdown.md](docs/countdown.md)

**学习内容**：
- Step 1：倒数日页面 HTML 结构
- Step 2：CSS 样式编写
- Step 3：日期输入与事件添加
- Step 4：时间戳差值计算
- Step 5：使用 setInterval 实现刷新
- Step 6：修改/删除功能
- Step 7：常见问题处理

**预计学习时间**：2-3 小时

---

### 进阶篇 2：路线图/进度表（综合实战）

📄 **教程链接**：[docs/timeline.md](docs/timeline.md)

**学习内容**：
- Step 1：路线图页面 HTML 结构
- Step 2：时间轴 CSS 样式
- Step 3：事件添加与渲染
- Step 4：当天时间点标注
- Step 5：状态切换与样式联动
- Step 6：日期修改后重算
- Step 7：常见问题处理

**预计学习时间**：3-4 小时

---

### 进阶篇 3：响应式布局（移动端适配）

📄 **教程链接**：[docs/responsive.md](docs/responsive.md)

**学习内容**：
- Step 1：理解响应式设计原理
- Step 2：添加平板适配（768px 以下）
- Step 3：添加手机适配（480px 以下）
- Step 4：优化输入框和卡片
- Step 5：极小屏幕优化
- Step 6：全面测试
- Step 7：响应式设计的关键点
- Step 8：常见问题与解决方案

**预计学习时间**：1-2 小时

---

## 📁 项目结构

```
todomvc-vanillajs/
├── index.html      # 主 HTML 文件（页面结构）
├── style.css       # 样式文件（所有 CSS）
├── app.js          # JavaScript 文件（所有逻辑）
├── README.md       # 项目说明（你正在看的文件）
├── starter/        # 从零开始的空白文件
│   ├── index.html
│   ├── style.css
│   └── app.js
└── docs/           # 教程文档目录
    ├── basic.md      # 基础篇教程
    ├── countdown.md  # 倒数日教程
    ├── timeline.md   # 路线图教程
    └── responsive.md # 响应式布局教程
```

---

## 📅 学习时间规划

假设你每天学习 1.5-2 小时，以下是推荐的学习计划：

| 天数 | 学习内容 | 目标成果 |
|------|----------|----------|
| 第 1 天 | 基础篇 Step 1-3 | 完成页面布局，理解 Flex |
| 第 2 天 | 基础篇 Step 4-6 | 实现增删改查，理解事件 |
| 第 3 天 | 基础篇 Step 7-9 | 完成筛选和持久化 |
| 第 4 天 | 进阶篇1 Step 1-4 | 理解 Date 对象和时间计算 |
| 第 5 天 | 进阶篇1 Step 5-7 | 完成倒数日功能 |
| 第 6 天 | 进阶篇2 Step 1-3 | 理解时间轴布局 |
| 第 7 天 | 进阶篇2 Step 4-7 | 完成路线图功能 |
| 第 8 天 | 进阶篇3 | 掌握响应式布局，完成移动端适配 |

> 💡 这只是参考计划，请根据自己的节奏调整。学习编程最重要的是动手实践！

---

## 🛠️ 开发工具推荐

### 代码编辑器

推荐使用 **VS Code**（Visual Studio Code）：

1. 下载地址：https://code.visualstudio.com/
2. 安装后打开项目文件夹
3. 推荐安装扩展：
   - **Live Server**：实时预览修改效果
   - **Prettier**：代码格式化

### 浏览器开发者工具

学会使用浏览器的开发者工具非常重要！

- **打开方式**：按 `F12` 或右键 → 检查
- **常用面板**：
  - Elements：查看和修改 HTML/CSS
  - Console：查看 JavaScript 输出和错误
  - Application → Local Storage：查看存储的数据

---

## ❓ 常见问题

### Q：我完全没学过编程，能学会吗？

**A**：可以！这个教程就是为零基础学习者设计的。每一步都有详细说明，跟着做就行。

### Q：代码报错了怎么办？

**A**：
1. 打开浏览器开发者工具（F12）
2. 切换到 Console 面板
3. 查看红色的错误信息
4. 对照教程检查代码是否有拼写错误

### Q：数据丢失了怎么办？

**A**：数据存储在浏览器的 localStorage 中。如果清除了浏览器数据，Todo 等信息会丢失。这是本地存储的特性。

### Q：可以在手机上使用吗？

**A**：可以！项目已做了全响应式适配，支持桌面端、平板和手机。在手机上，侧边栏会变成顶部横向导航，输入框和卡片也会自适应调整。但学习时还是建议用电脑，方便编写代码。

---

## 📝 学习建议

1. **不要只看，要动手打**
   
   把代码一行一行打出来，不要复制粘贴。打字的过程就是学习的过程。

2. **边做边验证，小步快跑**
   
   每完成一小块代码就保存文件、刷新浏览器，立即查看效果。这样能及时发现问题，也能建立成就感。

3. **遇到不懂的先查再问**
   
   MDN（https://developer.mozilla.org）是最权威的前端文档。

4. **多用 console.log 调试**
   
   在代码中加入 `console.log(变量名)` 可以查看变量的值，帮助理解代码执行过程。打开浏览器开发者工具（F12）查看控制台输出。

5. **做完基础功能后，尝试扩展**
   
   每个模块结尾都有"功能扩展思考"，挑战自己去实现！

---

## 🎉 完成后你将获得

- ✅ 一个真正能用的效率工具
- ✅ 对原生 JavaScript 的深入理解
- ✅ DOM 操作、事件处理的实战经验
- ✅ 可以写进简历的项目经历
- ✅ 继续学习前端框架的坚实基础

---

## ⌨️ 熟练以下快捷键让你学习效率倍增

在 VS Code（推荐的代码编辑器）中，Emmet 快捷键能帮你快速生成代码框架，省去重复劳动。

### HTML 快捷键

| 输入 | 按下 | 生成结果 |
|------|------|----------|
| `!` | `Tab` 或 `Enter` | 完整的 HTML5 基础结构 |
| `div` | `Tab` | `<div></div>` |
| `.classname` | `Tab` | `<div class="classname"></div>` |
| `#idname` | `Tab` | `<div id="idname"></div>` |
| `div.container` | `Tab` | `<div class="container"></div>` |
| `ul>li*3` | `Tab` | 包含 3 个 li 的 ul 列表 |
| `button.btn.btn-primary` | `Tab` | `<button class="btn btn-primary"></button>` |
| `input:text` | `Tab` | `<input type="text">` |
| `input:date` | `Tab` | `<input type="date">` |
| `a[href="#"]` | `Tab` | `<a href="#"></a>` |
| `section#todo-view.view` | `Tab` | `<section id="todo-view" class="view"></section>` |

### CSS 快捷键

| 输入 | 按下 | 生成结果 |
|------|------|----------|
| `w100` | `Tab` | `width: 100px;` |
| `h100` | `Tab` | `height: 100px;` |
| `m10` | `Tab` | `margin: 10px;` |
| `p20` | `Tab` | `padding: 20px;` |
| `df` | `Tab` | `display: flex;` |
| `jcc` | `Tab` | `justify-content: center;` |
| `aic` | `Tab` | `align-items: center;` |
| `fz16` | `Tab` | `font-size: 16px;` |
| `c#333` | `Tab` | `color: #333;` |
| `bgc#fff` | `Tab` | `background-color: #fff;` |

### VS Code 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + S` / `Cmd + S` | 保存文件 |
| `Ctrl + /` / `Cmd + /` | 注释/取消注释 |
| `Alt + ↑/↓` | 上下移动当前行 |
| `Ctrl + D` / `Cmd + D` | 选中下一个相同的词 |
| `Ctrl + Shift + K` | 删除当前行 |
| `F12` | 在浏览器中打开开发者工具 |

> 💡 **提示**：框架代码（如 HTML 基础结构）可以用快捷键生成，但核心逻辑代码（如 JavaScript 函数）建议手动敲入，加深理解。

---

## 📜 开源协议

MIT License - 随意使用、修改、分享！

---

**现在，让我们开始学习吧！**

👉 [点击这里开始基础篇教程](docs/basic.md)


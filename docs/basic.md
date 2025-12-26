# 📝 基础篇：Todo List 核心功能

> 本教程将手把手教你从零开始实现一个功能完整的 Todo List 应用。

---

## 🎯 学习目标

完成本篇教程后，你将掌握：

- HTML 语义化标签的使用
- CSS Flex 布局
- DOM 元素的获取和操作
- 事件绑定与事件委托
- localStorage 数据持久化
- 数组的常用方法（push、filter、find、forEach）

---

## 📋 功能清单

我们要实现的 Todo List 包含以下功能：

- ✅ 添加新的待办事项
- ✅ 删除待办事项
- ✅ 标记完成/未完成
- ✅ 筛选显示（全部/已完成/未完成）
- ✅ 刷新页面数据不丢失

---

## Step 1：搭建基础页面结构与侧边栏布局

### 1.1 创建项目文件夹

首先，在你的电脑上创建一个新文件夹，命名为 `todomvc-vanillajs`。

然后在这个文件夹里创建三个文件：
- `index.html`
- `style.css`
- `app.js`

### 1.2 编写 HTML 基础结构

打开 `index.html`，**逐行手动输入**以下代码：

> 💡 **新手提示**：不要直接复制粘贴！手动敲代码能帮助你更好地理解每一行的作用，也更容易发现和记住语法细节。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TodoMVC - 纯原生 JavaScript 实战项目</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 整体布局容器 -->
    <div class="app-container">
        
        <!-- 左侧侧边栏 -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h1 class="logo">📝 TodoMVC</h1>
                <p class="tagline">纯原生 JS 实战</p>
            </div>
            
            <nav class="nav-menu">
                <!-- data-view 属性用于标识每个菜单项对应的视图 -->
                <button class="nav-item active" data-view="todo">
                    <span class="nav-icon">✅</span>
                    <span class="nav-text">Todo List</span>
                </button>
                <button class="nav-item" data-view="countdown">
                    <span class="nav-icon">⏰</span>
                    <span class="nav-text">倒数日</span>
                </button>
                <button class="nav-item" data-view="timeline">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">路线图</span>
                </button>
            </nav>
            
            <div class="sidebar-footer">
                <p>Made with ❤️ for learners</p>
            </div>
        </aside>
        
        <!-- 右侧主内容区 -->
        <main class="main-content">
            <!-- Todo List 页面（先只放一个占位） -->
            <section class="view active" id="todo-view">
                <h2>Todo List 页面</h2>
                <p>这里将放置 Todo List 的内容</p>
            </section>
        </main>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

> 💡 **新手提示：HTML 标签说明**
> - `<!DOCTYPE html>`：告诉浏览器这是 HTML5 文档
> - `<meta charset="UTF-8">`：让页面正确显示中文
> - `<aside>`：侧边栏，语义化标签
> - `<nav>`：导航区域
> - `<main>`：主要内容区域
> - `<section>`：独立的内容区块

### 1.3 编写基础 CSS 样式

打开 `style.css`，**逐行手动输入**以下代码：

> 💡 **新手提示**：CSS 代码虽然长，但结构清晰。建议分块输入：先输入基础样式，保存后刷新浏览器看效果，再继续输入下一部分。这样能更好地理解每段 CSS 的作用。

```css
/* ========================================
   CSS 变量定义
   ======================================== */
:root {
    /* 主色调 - 低饱和浅天蓝 */
    --sidebar-bg: #e8f4fc;
    --sidebar-hover: #d0e8f5;
    --sidebar-active: #b8dced;
    
    /* 背景色 */
    --main-bg: #ffffff;
    
    /* 文字颜色 */
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    
    /* 功能色 */
    --primary-color: #5dade2;
    
    /* 尺寸 */
    --sidebar-width: 240px;
    --border-radius: 8px;
}

/* ========================================
   基础样式重置
   ======================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                 "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-primary);
}

button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
}

/* ========================================
   整体布局（Flex 左右两栏）
   ======================================== */
.app-container {
    display: flex;
    min-height: 100vh;
}

/* ========================================
   侧边栏样式
   ======================================== */
.sidebar {
    width: var(--sidebar-width);
    background-color: var(--sidebar-bg);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
}

.sidebar-header {
    padding: 32px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.logo {
    font-size: 22px;
    font-weight: 700;
}

.tagline {
    font-size: 13px;
    color: var(--text-secondary);
}

.nav-menu {
    flex: 1;
    padding: 16px 12px;
}

.nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 14px 16px;
    margin-bottom: 6px;
    border-radius: var(--border-radius);
    color: var(--text-primary);
    transition: background-color 0.2s;
    text-align: left;
}

.nav-item:hover {
    background-color: var(--sidebar-hover);
}

.nav-item.active {
    background-color: var(--sidebar-active);
    font-weight: 600;
}

.nav-icon {
    font-size: 18px;
    margin-right: 12px;
}

.sidebar-footer {
    padding: 20px 24px;
    font-size: 12px;
    color: var(--text-secondary);
    text-align: center;
}

/* ========================================
   主内容区样式
   ======================================== */
.main-content {
    flex: 1;
    margin-left: var(--sidebar-width);
    padding: 40px 48px;
    background-color: var(--main-bg);
}

.view {
    display: none;
}

.view.active {
    display: block;
}
```

> 💡 **新手提示：CSS 关键概念**
> - `:root`：CSS 变量定义在这里，方便统一管理颜色和尺寸
> - `var(--变量名)`：使用 CSS 变量
> - `display: flex`：弹性布局，让子元素可以灵活排列
> - `position: fixed`：固定定位，侧边栏不会随页面滚动

### 1.4 验证效果

**🔄 操作步骤**：
1. 保存所有修改的文件（`index.html` 和 `style.css`）
2. 在浏览器中打开 `index.html`（双击文件，或拖拽到浏览器窗口）
3. 检查页面是否符合预期

**✅ 预期效果**：
- 左侧有浅蓝色侧边栏（固定在左侧，不随页面滚动）
- 右侧是白色主内容区
- 侧边栏有三个菜单按钮（Todo List / 倒数日 / 路线图）
- 鼠标悬停在菜单上会变色

**❌ 常见问题排查**：
- 如果看不到样式：检查 `<link>` 标签的 `href` 路径是否正确
- 如果布局错乱：检查 CSS 中的 `display: flex` 是否正确输入
- 如果颜色不对：检查 CSS 变量名是否拼写正确

> 💡 **学习建议**：每完成一个步骤都要刷新浏览器验证效果，这是前端开发的好习惯！

---

## Step 2：实现 Todo 页面 HTML 结构

现在我们来完善 Todo List 页面的 HTML 结构。

### 2.1 更新 Todo 视图的 HTML

找到 `index.html` 中的 `<section class="view active" id="todo-view">`，替换为以下内容：

```html
<!-- Todo List 页面 -->
<section class="view active" id="todo-view">
    <header class="view-header">
        <h2>Todo List</h2>
        <p class="view-desc">记录你的待办事项，管理日常任务</p>
    </header>
    
    <!-- 新增 Todo 输入区 -->
    <div class="todo-input-container">
        <input 
            type="text" 
            id="todo-input" 
            class="todo-input" 
            placeholder="输入新的待办事项，按回车添加..."
            autocomplete="off"
        >
        <button id="add-todo-btn" class="btn btn-primary">添加</button>
    </div>
    
    <!-- 筛选按钮组 -->
    <div class="todo-filters">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="active">未完成</button>
        <button class="filter-btn" data-filter="completed">已完成</button>
        <span class="todo-count">共 <span id="todo-count-num">0</span> 项</span>
    </div>
    
    <!-- Todo 列表容器 -->
    <ul class="todo-list" id="todo-list">
        <!-- Todo 项会通过 JS 动态添加到这里 -->
    </ul>
    
    <!-- 空状态提示 -->
    <div class="empty-state show" id="todo-empty">
        <p>🎉 暂无待办事项</p>
        <p class="empty-hint">在上方输入框添加你的第一个任务吧！</p>
    </div>
</section>
```

> 💡 **新手提示：语义化 HTML**
> - `<header>`：页面头部
> - `<ul>`：无序列表，用于放置 Todo 项
> - `id` 属性：用于 JavaScript 获取特定元素
> - `class` 属性：用于 CSS 样式和 JavaScript 选择
> - `data-filter`：自定义数据属性，存储筛选类型

---

## Step 3：实现 Todo 页面 CSS 样式

### 3.1 添加 Todo 相关样式

在 `style.css` 文件末尾添加以下样式：

```css
/* ========================================
   页面头部样式
   ======================================== */
.view-header {
    margin-bottom: 32px;
}

.view-header h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 8px;
}

.view-desc {
    font-size: 14px;
    color: var(--text-secondary);
}

/* ========================================
   通用按钮样式
   ======================================== */
.btn {
    padding: 10px 20px;
    border-radius: var(--border-radius);
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: #3498db;
}

/* ========================================
   Todo 输入区域样式
   ======================================== */
.todo-input-container {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
}

.todo-input {
    flex: 1;
    padding: 14px 18px;
    background-color: #f8f9fa;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
}

.todo-input:focus {
    background-color: white;
    border-color: var(--primary-color);
}

.todo-input::placeholder {
    color: #95a5a6;
}

/* ========================================
   筛选按钮组样式
   ======================================== */
.todo-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #ecf0f1;
}

.filter-btn {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 13px;
    color: var(--text-secondary);
    background-color: #f8f9fa;
    transition: all 0.2s;
}

.filter-btn:hover {
    background-color: #ecf0f1;
}

.filter-btn.active {
    background-color: var(--primary-color);
    color: white;
}

.todo-count {
    margin-left: auto;
    font-size: 13px;
    color: #95a5a6;
}

/* ========================================
   Todo 列表样式
   ======================================== */
.todo-list {
    list-style: none;
    margin-bottom: 20px;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: white;
    border: 1px solid #ecf0f1;
    border-radius: var(--border-radius);
    margin-bottom: 10px;
    transition: all 0.2s;
}

.todo-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 已完成状态 */
.todo-item.completed {
    background-color: #f8f9fa;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #95a5a6;
}

/* 复选框样式 */
.todo-checkbox {
    width: 22px;
    height: 22px;
    border: 2px solid #ecf0f1;
    border-radius: 50%;
    margin-right: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
}

.todo-checkbox:hover {
    border-color: var(--primary-color);
}

.todo-item.completed .todo-checkbox {
    background-color: #58d68d;
    border-color: #58d68d;
}

.todo-item.completed .todo-checkbox::after {
    content: "✓";
    color: white;
    font-size: 12px;
    font-weight: bold;
}

/* Todo 文本 */
.todo-text {
    flex: 1;
    font-size: 15px;
    word-break: break-word;
}

/* 删除按钮 */
.todo-delete {
    padding: 6px 10px;
    color: #95a5a6;
    font-size: 18px;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.2s;
}

.todo-item:hover .todo-delete {
    opacity: 1;
}

.todo-delete:hover {
    background-color: #fee;
    color: #ec7063;
}

/* ========================================
   空状态提示样式
   ======================================== */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
    display: none;
}

.empty-state.show {
    display: block;
}

.empty-state p:first-child {
    font-size: 24px;
    margin-bottom: 8px;
}

.empty-hint {
    font-size: 14px;
    color: #95a5a6;
}
```

### 3.2 验证效果

刷新浏览器，你应该看到：

- ✅ 页面标题和描述
- ✅ 一个美观的输入框和蓝色添加按钮
- ✅ 三个圆角的筛选按钮
- ✅ 空状态提示文字

---

## Step 4：实现新增 Todo

现在开始写 JavaScript 代码！

### 4.1 编写基础 JS 结构

打开 `app.js`，**逐行手动输入**以下代码：

> 💡 **新手提示**：JavaScript 是核心逻辑部分，强烈建议逐行敲入。每写完一个函数，就保存文件、刷新浏览器测试效果，这样能帮你理解代码的执行流程。

```javascript
/**
 * TodoMVC - 纯原生 JavaScript 实战
 * 
 * 这个文件包含 Todo List 的所有逻辑
 */

// 等待 DOM 加载完成后再执行代码
document.addEventListener('DOMContentLoaded', function() {
    initTodoList();
});

// ========================================
// Todo List 功能
// ========================================

// 用于存储所有 Todo 项的数组
let todos = [];

/**
 * 初始化 Todo List 功能
 */
function initTodoList() {
    // 获取 DOM 元素
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    
    // 点击添加按钮时添加新 Todo
    addTodoBtn.addEventListener('click', function() {
        addTodo();
    });
    
    // 按回车键时添加新 Todo
    todoInput.addEventListener('keypress', function(event) {
        // event.key === 'Enter' 表示按下了回车键
        if (event.key === 'Enter') {
            addTodo();
        }
    });
    
    // 初始渲染
    renderTodos();
}

/**
 * 添加新的 Todo 项
 */
function addTodo() {
    // 获取输入框元素
    const todoInput = document.getElementById('todo-input');
    // 获取输入的文本，并去掉首尾空格
    const text = todoInput.value.trim();
    
    // 如果输入为空，不添加
    if (text === '') {
        return;
    }
    
    // 创建新的 Todo 对象
    const newTodo = {
        id: Date.now(),        // 使用时间戳作为唯一 ID
        text: text,            // Todo 的文本内容
        completed: false       // 是否已完成
    };
    
    // 添加到数组
    todos.push(newTodo);
    
    // 清空输入框
    todoInput.value = '';
    
    // 重新渲染列表
    renderTodos();
    
    // 在控制台输出，方便调试
    console.log('添加了新 Todo:', newTodo);
    console.log('当前所有 Todo:', todos);
}

/**
 * 渲染 Todo 列表
 */
function renderTodos() {
    // 获取列表容器和空状态提示
    const todoList = document.getElementById('todo-list');
    const todoEmpty = document.getElementById('todo-empty');
    const todoCountNum = document.getElementById('todo-count-num');
    
    // 更新计数
    todoCountNum.textContent = todos.length;
    
    // 如果没有 Todo 项，显示空状态
    if (todos.length === 0) {
        todoList.innerHTML = '';
        todoEmpty.classList.add('show');
        return;
    }
    
    // 隐藏空状态
    todoEmpty.classList.remove('show');
    
    // 生成 HTML 字符串
    let html = '';
    todos.forEach(function(todo) {
        html += `
            <li class="todo-item" data-id="${todo.id}">
                <div class="todo-checkbox"></div>
                <span class="todo-text">${todo.text}</span>
                <button class="todo-delete">×</button>
            </li>
        `;
    });
    
    // 更新 DOM
    todoList.innerHTML = html;
}
```

> 💡 **新手提示：JavaScript 核心概念**
> 
> **1. DOMContentLoaded 事件**
> ```javascript
> document.addEventListener('DOMContentLoaded', function() {
>     // 代码写在这里
> });
> ```
> 这确保 HTML 完全加载后再执行 JS，否则可能找不到元素。
> 
> **2. 获取 DOM 元素**
> ```javascript
> document.getElementById('todo-input')  // 通过 ID 获取
> ```
> 
> **3. 事件监听**
> ```javascript
> element.addEventListener('click', function() {
>     // 点击时执行的代码
> });
> ```
> 
> **4. 模板字符串**
> ```javascript
> `<div>${变量}</div>`  // 用反引号，${} 里放变量
> ```

### 4.2 验证效果

1. 刷新浏览器
2. 在输入框输入 "学习 JavaScript"
3. 点击添加按钮（或按回车）
4. 你应该看到一个新的 Todo 项出现在列表中！
5. 按 F12 打开控制台，可以看到调试信息

---

## Step 5：实现删除 Todo（事件委托）

### 5.1 什么是事件委托？

假设你有 100 个 Todo 项，如果给每个删除按钮都添加点击事件，就要添加 100 个监听器。

**事件委托**的思路是：只在父元素上添加一个监听器，利用"事件冒泡"机制来处理子元素的点击。

### 5.2 添加删除功能

在 `initTodoList` 函数中添加以下代码（在 `renderTodos()` 之前）：

```javascript
// 获取 Todo 列表容器
const todoList = document.getElementById('todo-list');

// 使用事件委托处理列表中的点击事件
todoList.addEventListener('click', function(event) {
    // event.target 是实际被点击的元素
    const target = event.target;
    
    // 获取被点击元素所属的 Todo 项
    const todoItem = target.closest('.todo-item');
    if (!todoItem) return; // 如果没找到，说明点击的不是 Todo 项内部
    
    // 获取 Todo 项的 ID（从 data-id 属性读取）
    const todoId = parseInt(todoItem.getAttribute('data-id'));
    
    // 判断点击的是删除按钮
    if (target.classList.contains('todo-delete')) {
        deleteTodo(todoId);
    }
});
```

### 5.3 实现删除函数

在 `app.js` 中添加删除函数：

```javascript
/**
 * 删除 Todo 项
 * @param {number} id - Todo 项的 ID
 */
function deleteTodo(id) {
    // 使用 filter 方法创建一个新数组，排除要删除的项
    todos = todos.filter(function(item) {
        return item.id !== id;
    });
    
    // 重新渲染
    renderTodos();
    
    console.log('删除了 ID 为', id, '的 Todo');
}
```

> 💡 **新手提示：filter 方法**
> ```javascript
> // filter 会遍历数组，保留满足条件的元素
> const 新数组 = 原数组.filter(function(元素) {
>     return 条件; // 返回 true 则保留，false 则排除
> });
> ```

### 5.4 验证效果

1. 添加几个 Todo 项
2. 把鼠标移到某个 Todo 上，右侧会出现 × 按钮
3. 点击 × 按钮，该 Todo 被删除

---

## Step 6：实现完成/未完成状态切换

### 6.1 添加切换功能

在事件委托的代码中，添加对复选框点击的处理。找到这段代码：

```javascript
// 判断点击的是删除按钮
if (target.classList.contains('todo-delete')) {
    deleteTodo(todoId);
}
```

修改为：

```javascript
// 判断点击的是复选框还是删除按钮
if (target.classList.contains('todo-checkbox')) {
    toggleTodo(todoId);
} else if (target.classList.contains('todo-delete')) {
    deleteTodo(todoId);
}
```

### 6.2 实现切换函数

添加切换函数：

```javascript
/**
 * 切换 Todo 项的完成状态
 * @param {number} id - Todo 项的 ID
 */
function toggleTodo(id) {
    // 在数组中找到对应的 Todo 项
    const todo = todos.find(function(item) {
        return item.id === id;
    });
    
    if (todo) {
        // 切换完成状态（true 变 false，false 变 true）
        todo.completed = !todo.completed;
        
        // 重新渲染
        renderTodos();
        
        console.log('切换了 Todo 状态:', todo);
    }
}
```

### 6.3 更新渲染函数

修改 `renderTodos` 函数中生成 HTML 的部分：

```javascript
// 生成 HTML 字符串
let html = '';
todos.forEach(function(todo) {
    // 根据完成状态添加不同的类名
    const completedClass = todo.completed ? 'completed' : '';
    
    html += `
        <li class="todo-item ${completedClass}" data-id="${todo.id}">
            <div class="todo-checkbox"></div>
            <span class="todo-text">${todo.text}</span>
            <button class="todo-delete">×</button>
        </li>
    `;
});
```

> 💡 **新手提示：find 方法**
> ```javascript
> // find 返回第一个满足条件的元素
> const 元素 = 数组.find(function(item) {
>     return 条件;
> });
> ```

### 6.4 验证效果

1. 添加一个 Todo
2. 点击左边的圆形复选框
3. Todo 变成灰色，文字有删除线 ✓ 表示已完成
4. 再次点击，恢复为未完成状态

---

## Step 7：实现 Todo 筛选

### 7.1 添加筛选变量

在文件顶部，`let todos = [];` 下面添加：

```javascript
// 当前筛选状态：'all' | 'active' | 'completed'
let currentFilter = 'all';
```

### 7.2 添加筛选按钮事件

在 `initTodoList` 函数中添加：

```javascript
// 获取所有筛选按钮
const filterBtns = document.querySelectorAll('.filter-btn');

// 筛选按钮点击事件
filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // 更新按钮状态
        filterBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        
        // 更新筛选状态并重新渲染
        currentFilter = this.getAttribute('data-filter');
        renderTodos();
    });
});
```

### 7.3 更新渲染函数

修改 `renderTodos` 函数，在开头添加筛选逻辑：

```javascript
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const todoEmpty = document.getElementById('todo-empty');
    const todoCountNum = document.getElementById('todo-count-num');
    
    // 根据筛选条件过滤 Todo 项
    let filteredTodos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(function(item) {
            return !item.completed; // 未完成的
        });
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(function(item) {
            return item.completed; // 已完成的
        });
    } else {
        filteredTodos = todos; // 全部
    }
    
    // 更新计数（显示筛选后的数量）
    todoCountNum.textContent = filteredTodos.length;
    
    // 如果筛选后没有 Todo 项，显示空状态
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        todoEmpty.classList.add('show');
        return;
    }
    
    todoEmpty.classList.remove('show');
    
    // 生成 HTML
    let html = '';
    filteredTodos.forEach(function(todo) {
        const completedClass = todo.completed ? 'completed' : '';
        html += `
            <li class="todo-item ${completedClass}" data-id="${todo.id}">
                <div class="todo-checkbox"></div>
                <span class="todo-text">${todo.text}</span>
                <button class="todo-delete">×</button>
            </li>
        `;
    });
    
    todoList.innerHTML = html;
}
```

### 7.4 验证效果

1. 添加几个 Todo，将其中一些标记为完成
2. 点击"已完成"按钮，只显示已完成的
3. 点击"未完成"按钮，只显示未完成的
4. 点击"全部"按钮，显示所有

---

## Step 8：接入 localStorage

现在刷新页面，数据就会丢失。我们用 localStorage 来持久化存储。

### 8.1 什么是 localStorage？

localStorage 是浏览器提供的本地存储 API，可以把数据保存在用户的电脑上。

```javascript
// 保存数据
localStorage.setItem('key', 'value');

// 读取数据
const value = localStorage.getItem('key');

// 删除数据
localStorage.removeItem('key');
```

> ⚠️ **注意**：localStorage 只能存储字符串，所以要用 `JSON.stringify` 和 `JSON.parse` 转换。

### 8.2 添加存储和读取函数

在 `app.js` 末尾添加：

```javascript
/**
 * 保存 Todo 数据到 localStorage
 */
function saveTodosToStorage() {
    // 把数组转换成 JSON 字符串后存储
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * 从 localStorage 加载 Todo 数据
 */
function loadTodosFromStorage() {
    const stored = localStorage.getItem('todos');
    if (stored) {
        try {
            todos = JSON.parse(stored);
        } catch (e) {
            // 如果解析失败，使用空数组
            todos = [];
        }
    }
}
```

### 8.3 调用存储函数

在 `initTodoList` 函数开头添加：

```javascript
// 从 localStorage 加载已保存的数据
loadTodosFromStorage();
```

在以下位置调用 `saveTodosToStorage()`：

1. `addTodo` 函数中，`todos.push(newTodo)` 之后
2. `deleteTodo` 函数中，`todos = todos.filter(...)` 之后
3. `toggleTodo` 函数中，`todo.completed = !todo.completed` 之后

例如 `addTodo` 函数：

```javascript
function addTodo() {
    // ... 省略前面的代码 ...
    
    todos.push(newTodo);
    
    // 保存到 localStorage
    saveTodosToStorage();
    
    // ... 省略后面的代码 ...
}
```

### 8.4 验证效果

1. 添加几个 Todo
2. 刷新页面
3. 数据还在！🎉
4. 按 F12 → Application → Local Storage 可以查看存储的数据

---

## Step 9：常见 bug 修复与安全处理

### 9.1 XSS 安全问题

如果用户输入 `<script>alert('hack')</script>`，直接插入 HTML 会执行脚本！

添加 HTML 转义函数：

```javascript
/**
 * HTML 转义，防止 XSS 攻击
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

修改渲染函数中的文本输出：

```javascript
// 把 ${todo.text} 改为 ${escapeHtml(todo.text)}
html += `
    <li class="todo-item ${completedClass}" data-id="${todo.id}">
        <div class="todo-checkbox"></div>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="todo-delete">×</button>
    </li>
`;
```

### 9.2 常见问题排查

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 点击按钮没反应 | JS 文件没加载 | 检查 `<script>` 路径 |
| 添加后看不到 | 没调用 renderTodos | 在 addTodo 末尾添加 |
| 刷新后数据丢失 | 没保存到 localStorage | 检查 saveTodosToStorage 调用 |
| 控制台报错 | 代码语法错误 | 根据错误信息定位修复 |

---

## ✅ 基础篇完成！

恭喜你！你已经完成了 Todo List 的全部核心功能：

- ✅ 添加 Todo
- ✅ 删除 Todo
- ✅ 标记完成/未完成
- ✅ 筛选显示
- ✅ 数据持久化

### 🚀 功能扩展思考

想要进一步练习？试试实现这些功能：

1. **编辑 Todo**：双击 Todo 文本可以修改
2. **清空已完成**：一键删除所有已完成的 Todo
3. **拖拽排序**：拖动 Todo 改变顺序
4. **优先级**：为 Todo 添加高/中/低优先级
5. **截止日期**：为 Todo 设置截止时间

---

## 📝 完整代码参考

如果你在学习过程中遇到问题，可以参考项目根目录下的 `app.js` 文件，里面包含了完整的代码实现。

---

**下一篇**：[进阶篇1：倒数日功能](countdown.md)


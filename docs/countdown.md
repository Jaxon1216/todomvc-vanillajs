# ⏰ 进阶篇1：倒数日功能

> 本教程将教你实现一个倒数日功能，学习 Date 对象和时间计算。

---

## 🎯 学习目标

完成本篇教程后，你将掌握：

- JavaScript Date 对象的使用
- 时间戳差值计算
- setInterval 定时器
- 日期输入框的处理
- 更复杂的 DOM 动态渲染

---

## 📋 功能清单

我们要实现的倒数日功能包括：

- ✅ 添加事件名称和目标日期
- ✅ 实时显示"距离 XX 还有 X 天"
- ✅ 支持修改日期
- ✅ 支持删除事件
- ✅ 区分已过期、今天、未来

---

## 📖 学习方法

> 💡 **重要提醒**：
> - **手动输入代码**：不要直接复制粘贴！逐行手动敲入代码能帮助你更好地理解和记忆
> - **边做边验证**：每完成一个小步骤，就保存文件、刷新浏览器查看效果
> - **遇到问题多调试**：打开浏览器开发者工具（F12），查看控制台的错误信息

---

## 前置准备

本教程假设你已完成基础篇的学习。我们将在已有代码基础上继续开发。

如果你是直接从这里开始，请先：
1. 确保 `index.html` 中已有倒数日页面的 HTML 结构
2. 确保 `style.css` 中已有倒数日的样式
3. 确保侧边栏导航可以切换页面

---

## Step 1：倒数日页面 HTML 结构

### 1.1 检查 HTML 结构

在 `index.html` 中，找到 `<!-- 倒数日页面 -->` 部分，确保有以下结构：

```html
<!-- 倒数日页面 -->
<section class="view" id="countdown-view">
    <header class="view-header">
        <h2>倒数日</h2>
        <p class="view-desc">记录重要日期，倒计时提醒不遗忘</p>
    </header>
    
    <!-- 新增倒数日输入区 -->
    <div class="countdown-input-container">
        <input 
            type="text" 
            id="countdown-name" 
            class="countdown-input" 
            placeholder="事件名称（如：生日、考试）"
            autocomplete="off"
        >
        <input 
            type="date" 
            id="countdown-date" 
            class="countdown-input countdown-date"
        >
        <button id="add-countdown-btn" class="btn btn-primary">添加</button>
    </div>
    
    <!-- 倒数日列表容器 -->
    <div class="countdown-list" id="countdown-list">
        <!-- 倒数日卡片会通过 JS 动态添加到这里 -->
    </div>
    
    <!-- 空状态提示 -->
    <div class="empty-state" id="countdown-empty">
        <p>📅 暂无倒数日</p>
        <p class="empty-hint">添加一个重要日期开始倒计时吧！</p>
    </div>
</section>
```

> 💡 **新手提示：type="date" 输入框**
> 
> `<input type="date">` 是 HTML5 提供的日期选择器，用户可以点击选择日期，浏览器会自动显示日历界面。
> 
> 它的值格式是 `YYYY-MM-DD`，例如 `2024-12-31`。

---

## Step 2：编写对应 CSS 样式

### 2.1 检查 CSS 样式

确保 `style.css` 中有以下倒数日相关样式：

```css
/* ========================================
   倒数日页面样式
   ======================================== */

/* 输入区域 */
.countdown-input-container {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.countdown-input {
    padding: 14px 18px;
    background-color: #f8f9fa;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
}

.countdown-input:first-child {
    flex: 1;
    min-width: 200px;
}

.countdown-date {
    width: 180px;
}

.countdown-input:focus {
    background-color: white;
    border-color: #5dade2;
}

/* 倒数日列表 */
.countdown-list {
    display: grid;
    gap: 16px;
}

/* 倒数日卡片 */
.countdown-card {
    background-color: white;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s;
}

.countdown-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.countdown-info {
    flex: 1;
}

.countdown-name {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 6px;
}

.countdown-date-display {
    font-size: 13px;
    color: #7f8c8d;
}

.countdown-days {
    text-align: center;
    padding: 0 24px;
}

.countdown-number {
    font-size: 42px;
    font-weight: 700;
    color: #5dade2;
    line-height: 1;
}

.countdown-label {
    font-size: 13px;
    color: #7f8c8d;
    margin-top: 4px;
}

/* 已过期状态 */
.countdown-card.past .countdown-number {
    color: #95a5a6;
}

/* 今天状态 */
.countdown-card.today .countdown-number {
    color: #58d68d;
}

/* 操作按钮 */
.countdown-actions {
    display: flex;
    gap: 8px;
}

.btn-small {
    padding: 6px 12px;
    font-size: 12px;
}

.btn-danger {
    background-color: #ec7063;
    color: white;
}

.btn-danger:hover {
    opacity: 0.9;
}
```

---

## Step 3：实现日期输入与事件添加

### 3.1 创建基础结构

在 `app.js` 中，添加倒数日模块的代码：

```javascript
// ========================================
// 倒数日功能
// ========================================

// 用于存储所有倒数日的数组
let countdowns = [];

/**
 * 初始化倒数日功能
 */
function initCountdown() {
    // 从 localStorage 加载已保存的数据
    loadCountdownsFromStorage();
    
    // 获取 DOM 元素
    const countdownName = document.getElementById('countdown-name');
    const countdownDate = document.getElementById('countdown-date');
    const addCountdownBtn = document.getElementById('add-countdown-btn');
    const countdownList = document.getElementById('countdown-list');
    
    // 点击添加按钮时添加新倒数日
    addCountdownBtn.addEventListener('click', function() {
        addCountdown();
    });
    
    // 按回车键时添加新倒数日
    countdownName.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addCountdown();
        }
    });
    
    // 初始渲染
    renderCountdowns();
}
```

### 3.2 在 DOMContentLoaded 中调用

修改 `app.js` 顶部的 DOMContentLoaded 事件：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();  // 如果你有导航功能
    initTodoList();
    initCountdown();   // 添加这一行
});
```

### 3.3 实现添加函数

```javascript
/**
 * 添加新的倒数日
 */
function addCountdown() {
    const nameInput = document.getElementById('countdown-name');
    const dateInput = document.getElementById('countdown-date');
    
    const name = nameInput.value.trim();
    const date = dateInput.value;
    
    // 验证输入
    if (name === '' || date === '') {
        alert('请输入事件名称和日期！');
        return;
    }
    
    // 验证日期是否有效
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
        alert('请输入有效的日期！');
        return;
    }
    
    // 创建新的倒数日对象
    const newCountdown = {
        id: Date.now(),
        name: name,
        date: date  // 存储格式：'2024-12-31'
    };
    
    // 添加到数组
    countdowns.push(newCountdown);
    
    // 保存到 localStorage
    saveCountdownsToStorage();
    
    // 清空输入框
    nameInput.value = '';
    dateInput.value = '';
    
    // 重新渲染列表
    renderCountdowns();
    
    console.log('添加了新倒数日:', newCountdown);
}
```

> 💡 **新手提示：日期验证**
> ```javascript
> const date = new Date('无效日期');
> console.log(date);  // Invalid Date
> console.log(isNaN(date.getTime()));  // true
> ```
> 使用 `isNaN(date.getTime())` 可以检测日期是否有效。

---

## Step 4：核心逻辑 - 时间戳差值计算

这是倒数日功能的核心！我们需要计算今天距离目标日期还有多少天。

### 4.1 理解 Date 对象

```javascript
// 创建当前时间的 Date 对象
const now = new Date();
console.log(now);  // Wed Dec 25 2024 10:30:00 GMT+0800

// 获取时间戳（毫秒）
console.log(now.getTime());  // 1703473800000

// 从字符串创建 Date 对象
const christmas = new Date('2024-12-25');
console.log(christmas);  // Wed Dec 25 2024 00:00:00 GMT+0800
```

### 4.2 计算天数差

```javascript
/**
 * 计算距离目标日期还有多少天
 * @param {string} dateString - 目标日期字符串 (YYYY-MM-DD 格式)
 * @returns {number} 剩余天数（负数表示已过期）
 */
function calculateDaysRemaining(dateString) {
    // 获取今天的日期（设置时分秒为0，只比较日期部分）
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 解析目标日期
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    
    // 计算时间差（毫秒）
    const timeDiff = targetDate.getTime() - today.getTime();
    
    // 转换为天数
    // 1天 = 24小时 × 60分钟 × 60秒 × 1000毫秒 = 86400000毫秒
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysDiff;
}
```

> 💡 **新手提示：为什么要 setHours(0, 0, 0, 0)?**
> 
> 假设现在是 12月25日 下午3点，目标是 12月26日。
> - 不处理时间：差值可能是 21 小时，不足 1 天
> - 处理后：差值正好是 1 天
> 
> 通过把时分秒都设为0，我们只比较"日期"部分。

### 4.3 逐行拆解

让我们一步步理解这个函数：

```javascript
// 第1步：获取今天的日期
const today = new Date();
// 假设现在是 2024-12-25 15:30:00

// 第2步：把时间设为当天的开始（00:00:00）
today.setHours(0, 0, 0, 0);
// 变成 2024-12-25 00:00:00

// 第3步：解析目标日期
const targetDate = new Date('2024-12-31');
// 得到 2024-12-31 00:00:00

// 第4步：计算毫秒差
const timeDiff = targetDate.getTime() - today.getTime();
// (2024-12-31的时间戳) - (2024-12-25的时间戳)
// = 6天的毫秒数 = 518400000

// 第5步：转换为天数
const daysDiff = Math.ceil(518400000 / 86400000);
// = 6 天
```

---

## Step 5：使用 setInterval 实现倒计时刷新

### 5.1 什么是 setInterval？

`setInterval` 可以让一个函数每隔一段时间自动执行一次：

```javascript
// 每隔 1000 毫秒（1秒）执行一次
setInterval(function() {
    console.log('每秒执行一次');
}, 1000);
```

### 5.2 实现定时刷新

在 `initCountdown` 函数末尾添加：

```javascript
// 启动定时器，每分钟刷新一次
startCountdownTimer();
```

添加定时器函数：

```javascript
/**
 * 启动倒计时刷新定时器
 */
function startCountdownTimer() {
    // 每分钟刷新一次（60000 毫秒）
    setInterval(function() {
        renderCountdowns();
    }, 60000);
}
```

> 💡 **为什么是每分钟？**
> 
> 因为我们的倒数日只显示"天"，没必要每秒刷新。每分钟刷新一次足够了，而且更省资源。
> 
> 如果你想做到"X天X小时X分钟"的精确显示，可以改为每秒刷新。

---

## Step 6：实现修改/删除功能

### 6.1 添加事件委托

在 `initCountdown` 函数中添加：

```javascript
// 使用事件委托处理倒数日列表中的点击事件
countdownList.addEventListener('click', function(event) {
    const target = event.target;
    const card = target.closest('.countdown-card');
    if (!card) return;
    
    const countdownId = parseInt(card.getAttribute('data-id'));
    
    // 点击删除按钮
    if (target.classList.contains('btn-danger')) {
        deleteCountdown(countdownId);
    }
});

// 处理日期修改（change 事件）
countdownList.addEventListener('change', function(event) {
    const target = event.target;
    if (target.classList.contains('countdown-edit-date')) {
        const card = target.closest('.countdown-card');
        if (card) {
            const countdownId = parseInt(card.getAttribute('data-id'));
            updateCountdownDate(countdownId, target.value);
        }
    }
});
```

### 6.2 实现删除函数

```javascript
/**
 * 删除倒数日
 * @param {number} id - 倒数日的 ID
 */
function deleteCountdown(id) {
    countdowns = countdowns.filter(function(item) {
        return item.id !== id;
    });
    
    saveCountdownsToStorage();
    renderCountdowns();
}
```

### 6.3 实现日期修改函数

```javascript
/**
 * 更新倒数日的日期
 * @param {number} id - 倒数日的 ID
 * @param {string} newDate - 新的日期字符串
 */
function updateCountdownDate(id, newDate) {
    const countdown = countdowns.find(function(item) {
        return item.id === id;
    });
    
    if (countdown && newDate) {
        countdown.date = newDate;
        saveCountdownsToStorage();
        renderCountdowns();
    }
}
```

### 6.4 实现渲染函数

```javascript
/**
 * 渲染倒数日列表
 */
function renderCountdowns() {
    const countdownList = document.getElementById('countdown-list');
    const countdownEmpty = document.getElementById('countdown-empty');
    
    // 如果没有倒数日，显示空状态
    if (countdowns.length === 0) {
        countdownList.innerHTML = '';
        countdownEmpty.classList.add('show');
        return;
    }
    
    // 隐藏空状态
    countdownEmpty.classList.remove('show');
    
    // 按日期排序（最近的在前面）
    const sortedCountdowns = [...countdowns].sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
    
    // 生成 HTML
    let html = '';
    sortedCountdowns.forEach(function(countdown) {
        const daysRemaining = calculateDaysRemaining(countdown.date);
        
        // 根据剩余天数确定状态和显示
        let statusClass = '';
        let daysText = '';
        let daysLabel = '';
        
        if (daysRemaining === 0) {
            statusClass = 'today';
            daysText = '🎉';
            daysLabel = '就是今天！';
        } else if (daysRemaining > 0) {
            daysText = daysRemaining;
            daysLabel = '天后';
        } else {
            statusClass = 'past';
            daysText = Math.abs(daysRemaining);
            daysLabel = '天前';
        }
        
        // 格式化日期显示
        const formattedDate = formatDate(countdown.date);
        
        html += `
            <div class="countdown-card ${statusClass}" data-id="${countdown.id}">
                <div class="countdown-info">
                    <div class="countdown-name">${escapeHtml(countdown.name)}</div>
                    <div class="countdown-date-display">
                        目标日期：${formattedDate}
                        <input type="date" class="countdown-edit-date" value="${countdown.date}" 
                               style="margin-left: 12px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;">
                    </div>
                </div>
                <div class="countdown-days">
                    <div class="countdown-number">${daysText}</div>
                    <div class="countdown-label">${daysLabel}</div>
                </div>
                <div class="countdown-actions">
                    <button class="btn btn-small btn-danger">删除</button>
                </div>
            </div>
        `;
    });
    
    // 更新 DOM
    countdownList.innerHTML = html;
}

/**
 * 格式化日期为中文格式
 * @param {string} dateString - 日期字符串 (YYYY-MM-DD)
 * @returns {string} 格式化后的日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // getMonth() 返回 0-11
    const day = date.getDate();
    return year + '年' + month + '月' + day + '日';
}
```

### 6.5 添加存储函数

```javascript
/**
 * 从 localStorage 加载倒数日数据
 */
function loadCountdownsFromStorage() {
    const stored = localStorage.getItem('countdowns');
    if (stored) {
        try {
            countdowns = JSON.parse(stored);
        } catch (e) {
            countdowns = [];
        }
    }
}

/**
 * 保存倒数日数据到 localStorage
 */
function saveCountdownsToStorage() {
    localStorage.setItem('countdowns', JSON.stringify(countdowns));
}
```

---

## Step 7：功能测试与新手注意事项

### 7.1 验证效果

1. 点击侧边栏"倒数日"切换到倒数日页面
2. 输入事件名称（如"新年"）和日期（如 2025-01-01）
3. 点击添加按钮
4. 你应该看到一个卡片，显示"距离新年还有 X 天"
5. 修改日期输入框，倒计时自动更新
6. 点击删除按钮，卡片消失
7. 刷新页面，数据还在

### 7.2 常见问题处理

#### 问题1：Invalid Date 错误

**原因**：日期字符串格式不正确

**解决**：始终使用 `YYYY-MM-DD` 格式

```javascript
// 正确
new Date('2024-12-31')

// 错误（可能在某些浏览器出问题）
new Date('2024/12/31')
new Date('12-31-2024')
```

#### 问题2：负数倒计时显示

**原因**：目标日期已过

**处理**：我们在代码中已经处理了这种情况，显示为"X 天前"

```javascript
if (daysRemaining < 0) {
    statusClass = 'past';
    daysText = Math.abs(daysRemaining);  // 取绝对值
    daysLabel = '天前';
}
```

#### 问题3：时区问题

**原因**：不同时区可能导致日期计算有偏差

**解决**：使用 `setHours(0, 0, 0, 0)` 统一设置为当天零点

---

## ✅ 进阶篇1完成！

恭喜你！你已经掌握了：

- ✅ Date 对象的创建和使用
- ✅ 时间戳差值计算
- ✅ setInterval 定时器
- ✅ 日期格式化显示
- ✅ 完整的增删改功能

### 🚀 功能扩展思考

1. **添加通知功能**：当倒数日到达时，显示浏览器通知
2. **添加分类**：为不同类型的倒数日添加颜色标签
3. **历史记录**：保存已过期的倒数日到历史列表
4. **重复事件**：支持年度重复的事件（如生日）
5. **更精确的倒计时**：显示小时、分钟、秒

---

**下一篇**：[进阶篇2：路线图/进度表功能](timeline.md)


/**
 * ========================================
 * TodoMVC - 纯原生 JavaScript 实战项目
 * ========================================
 * 
 * 这个文件包含了整个应用的所有 JavaScript 逻辑：
 * 1. 视图切换（侧边栏导航）
 * 2. Todo List 功能
 * 3. 倒数日功能
 * 4. 路线图/进度表功能
 * 
 * 所有代码都使用纯原生 JavaScript，不依赖任何框架或库
 */

// ========================================
// 等待 DOM 加载完成后再执行代码
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有模块
    initNavigation();
    initTodoList();
    initCountdown();
    initTimeline();
});

// ========================================
// 第一部分：视图切换（侧边栏导航）
// ========================================

/**
 * 初始化导航功能
 * 实现点击侧边栏菜单时切换显示对应的页面
 */
function initNavigation() {
    // 获取所有导航按钮
    const navItems = document.querySelectorAll('.nav-item');
    // 获取所有视图页面
    const views = document.querySelectorAll('.view');
    
    // 为每个导航按钮添加点击事件
    navItems.forEach(function(navItem) {
        navItem.addEventListener('click', function() {
            // 获取要显示的视图名称（从 data-view 属性读取）
            const targetView = this.getAttribute('data-view');
            
            // 移除所有导航按钮的 active 类
            navItems.forEach(function(item) {
                item.classList.remove('active');
            });
            
            // 为当前点击的按钮添加 active 类
            this.classList.add('active');
            
            // 隐藏所有视图
            views.forEach(function(view) {
                view.classList.remove('active');
            });
            
            // 显示目标视图
            const targetViewElement = document.getElementById(targetView + '-view');
            if (targetViewElement) {
                targetViewElement.classList.add('active');
            }
        });
    });
}

// ========================================
// 第二部分：Todo List 功能
// ========================================

// 用于存储所有 Todo 项的数组
let todos = [];
// 当前筛选状态：'all' | 'active' | 'completed'
let currentFilter = 'all';

/**
 * 初始化 Todo List 功能
 */
function initTodoList() {
    // 从 localStorage 加载已保存的数据
    loadTodosFromStorage();
    
    // 获取 DOM 元素
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // 点击添加按钮时添加新 Todo
    addTodoBtn.addEventListener('click', function() {
        addTodo();
    });
    
    // 按回车键时添加新 Todo
    todoInput.addEventListener('keypress', function(event) {
        // keyCode 13 代表回车键
        if (event.key === 'Enter' || event.keyCode === 13) {
            addTodo();
        }
    });
    
    // 使用事件委托处理 Todo 列表中的点击事件
    // 事件委托：在父元素上监听事件，而不是在每个子元素上单独监听
    todoList.addEventListener('click', function(event) {
        const target = event.target;
        
        // 获取被点击元素所属的 Todo 项
        const todoItem = target.closest('.todo-item');
        if (!todoItem) return;
        
        // 获取 Todo 项的 ID
        const todoId = parseInt(todoItem.getAttribute('data-id'));
        
        // 判断点击的是复选框还是删除按钮
        if (target.classList.contains('todo-checkbox')) {
            toggleTodo(todoId);
        } else if (target.classList.contains('todo-delete')) {
            deleteTodo(todoId);
        }
    });
    
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
    
    // 初始渲染
    renderTodos();
}

/**
 * 添加新的 Todo 项
 */
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const text = todoInput.value.trim();
    
    // 如果输入为空，不添加
    if (text === '') {
        return;
    }
    
    // 创建新的 Todo 对象
    const newTodo = {
        id: Date.now(), // 使用时间戳作为唯一 ID
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // 添加到数组
    todos.push(newTodo);
    
    // 保存到 localStorage
    saveTodosToStorage();
    
    // 清空输入框
    todoInput.value = '';
    
    // 重新渲染列表
    renderTodos();
}

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
        // 切换完成状态
        todo.completed = !todo.completed;
        
        // 保存并重新渲染
        saveTodosToStorage();
        renderTodos();
    }
}

/**
 * 删除 Todo 项
 * @param {number} id - Todo 项的 ID
 */
function deleteTodo(id) {
    // 使用 filter 方法创建一个新数组，排除要删除的项
    todos = todos.filter(function(item) {
        return item.id !== id;
    });
    
    // 保存并重新渲染
    saveTodosToStorage();
    renderTodos();
}

/**
 * 渲染 Todo 列表
 * 根据当前筛选状态显示对应的 Todo 项
 */
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const todoEmpty = document.getElementById('todo-empty');
    const todoCountNum = document.getElementById('todo-count-num');
    
    // 根据筛选条件过滤 Todo 项
    let filteredTodos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(function(item) {
            return !item.completed;
        });
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(function(item) {
            return item.completed;
        });
    } else {
        filteredTodos = todos;
    }
    
    // 更新计数
    todoCountNum.textContent = filteredTodos.length;
    
    // 如果没有 Todo 项，显示空状态
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        todoEmpty.classList.add('show');
        return;
    }
    
    // 隐藏空状态
    todoEmpty.classList.remove('show');
    
    // 生成 HTML
    let html = '';
    filteredTodos.forEach(function(todo) {
        // 根据完成状态添加不同的类名
        const completedClass = todo.completed ? 'completed' : '';
        
        html += `
            <li class="todo-item ${completedClass}" data-id="${todo.id}">
                <div class="todo-checkbox"></div>
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="todo-delete">×</button>
            </li>
        `;
    });
    
    // 更新 DOM
    todoList.innerHTML = html;
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

/**
 * 保存 Todo 数据到 localStorage
 */
function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ========================================
// 第三部分：倒数日功能
// ========================================

// 用于存储所有倒数日的数组
let countdowns = [];
// 定时器引用（用于实时刷新倒计时）
let countdownTimer = null;

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
    
    // 设置日期输入框的最小值为今天
    const today = new Date().toISOString().split('T')[0];
    countdownDate.setAttribute('min', today);
    
    // 点击添加按钮时添加新倒数日
    addCountdownBtn.addEventListener('click', function() {
        addCountdown();
    });
    
    // 按回车键时添加新倒数日
    countdownName.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            addCountdown();
        }
    });
    
    // 使用事件委托处理倒数日列表中的点击事件
    countdownList.addEventListener('click', function(event) {
        const target = event.target;
        const card = target.closest('.countdown-card');
        if (!card) return;
        
        const countdownId = parseInt(card.getAttribute('data-id'));
        
        if (target.classList.contains('btn-danger')) {
            deleteCountdown(countdownId);
        }
    });
    
    // 处理日期修改
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
    
    // 初始渲染
    renderCountdowns();
    
    // 启动定时器，每分钟刷新一次倒计时显示
    startCountdownTimer();
}

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
        date: date,
        createdAt: new Date().toISOString()
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
}


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

/**
 * 计算距离目标日期还有多少天
 * @param {string} dateString - 目标日期字符串 (YYYY-MM-DD 格式)
 * @returns {number} 剩余天数（负数表示已过期）
 */
function calculateDaysRemaining(dateString) {
    // 获取今天的日期（去掉时分秒，只保留日期部分）
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
        
        // 根据剩余天数确定状态类
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
 * 启动倒计时刷新定时器
 */
function startCountdownTimer() {
    // 每分钟刷新一次（60000 毫秒）
    countdownTimer = setInterval(function() {
        renderCountdowns();
    }, 60000);
}

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

// ========================================
// 第四部分：路线图/进度表功能
// ========================================

// 用于存储所有里程碑的数组
let milestones = [];
// 时间轴的时间范围（天数）
const TIMELINE_RANGE_DAYS = 90; // 默认显示90天的范围

/**
 * 初始化路线图功能
 */
function initTimeline() {
    // 从 localStorage 加载已保存的数据
    loadMilestonesFromStorage();
    
    // 获取 DOM 元素
    const milestoneName = document.getElementById('milestone-name');
    const milestoneDate = document.getElementById('milestone-date');
    const addMilestoneBtn = document.getElementById('add-milestone-btn');
    const milestoneList = document.getElementById('milestone-list');
    
    // 设置日期输入框的默认最小值
    const today = new Date().toISOString().split('T')[0];
    milestoneDate.setAttribute('min', today);
    
    // 点击添加按钮时添加新里程碑
    addMilestoneBtn.addEventListener('click', function() {
        addMilestone();
    });
    
    // 按回车键时添加新里程碑
    milestoneName.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            addMilestone();
        }
    });
    
    // 使用事件委托处理里程碑列表中的事件
    milestoneList.addEventListener('click', function(event) {
        const target = event.target;
        const card = target.closest('.milestone-card');
        if (!card) return;
        
        const milestoneId = parseInt(card.getAttribute('data-id'));
        
        if (target.classList.contains('btn-danger')) {
            deleteMilestone(milestoneId);
        }
    });
    
    // 处理状态变更
    milestoneList.addEventListener('change', function(event) {
        const target = event.target;
        const card = target.closest('.milestone-card');
        if (!card) return;
        
        const milestoneId = parseInt(card.getAttribute('data-id'));
        
        if (target.classList.contains('status-select')) {
            updateMilestoneStatus(milestoneId, target.value);
        } else if (target.classList.contains('milestone-edit-date')) {
            updateMilestoneDate(milestoneId, target.value);
        }
    });
    
    // 初始渲染
    renderTimeline();
    renderMilestones();
}

/**
 * 添加新的里程碑
 */
function addMilestone() {
    const nameInput = document.getElementById('milestone-name');
    const dateInput = document.getElementById('milestone-date');
    
    const name = nameInput.value.trim();
    const date = dateInput.value;
    
    // 验证输入
    if (name === '' || date === '') {
        alert('请输入目标名称和截止日期！');
        return;
    }
    
    // 验证日期是否有效
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
        alert('请输入有效的日期！');
        return;
    }
    
    // 创建新的里程碑对象
    const newMilestone = {
        id: Date.now(),
        name: name,
        date: date,
        status: 'pending', // 'pending' | 'completed' | 'cancelled'
        completedDate: null, // 完成日期
        createdAt: new Date().toISOString()
    };
    
    // 添加到数组
    milestones.push(newMilestone);
    
    // 保存到 localStorage
    saveMilestonesToStorage();
    
    // 清空输入框
    nameInput.value = '';
    dateInput.value = '';
    
    // 重新渲染
    renderTimeline();
    renderMilestones();
}

/**
 * 删除里程碑
 * @param {number} id - 里程碑的 ID
 */
function deleteMilestone(id) {
    milestones = milestones.filter(function(item) {
        return item.id !== id;
    });
    
    saveMilestonesToStorage();
    renderTimeline();
    renderMilestones();
}

/**
 * 更新里程碑状态
 * @param {number} id - 里程碑的 ID
 * @param {string} newStatus - 新状态
 */
function updateMilestoneStatus(id, newStatus) {
    const milestone = milestones.find(function(item) {
        return item.id === id;
    });
    
    if (milestone) {
        milestone.status = newStatus;
        
        // 如果标记为已完成，记录完成日期
        if (newStatus === 'completed') {
            milestone.completedDate = new Date().toISOString().split('T')[0];
        } else {
            milestone.completedDate = null;
        }
        
        saveMilestonesToStorage();
        renderTimeline();
        renderMilestones();
    }
}

/**
 * 更新里程碑日期
 * @param {number} id - 里程碑的 ID
 * @param {string} newDate - 新日期
 */
function updateMilestoneDate(id, newDate) {
    const milestone = milestones.find(function(item) {
        return item.id === id;
    });
    
    if (milestone && newDate) {
        milestone.date = newDate;
        saveMilestonesToStorage();
        renderTimeline();
        renderMilestones();
    }
}

/**
 * 渲染时间轴
 * 使用简化比例模型，不追求精确刻度
 */
function renderTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    const timelineTrack = document.getElementById('timeline-track');
    const todayMarker = document.getElementById('today-marker');
    
    // 只显示进行中的里程碑（已完成和已取消的不在时间轴显示）
    const activeMilestones = milestones.filter(function(m) {
        return m.status === 'pending';
    });
    
    // 如果没有里程碑，隐藏时间轴
    if (activeMilestones.length === 0) {
        timelineContainer.classList.remove('show');
        return;
    }
    
    // 显示时间轴
    timelineContainer.classList.add('show');
    
    // 计算时间范围
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 找出所有日期，确定时间轴范围
    // minDate 就是今天（时间轴从今天开始）
    let minDate = new Date(today);
    let maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30); // 默认至少显示30天
    
    activeMilestones.forEach(function(m) {
        const mDate = new Date(m.date);
        // 只考虑未来的里程碑来扩展时间轴
        if (mDate > maxDate) maxDate = new Date(mDate);
    });
    
    // 在右端加一些余量（左端不需要，因为从今天开始）
    maxDate.setDate(maxDate.getDate() + 14);
    
    // 计算总时间跨度（天数）
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
    
    // 今天标记已经用起点表示，不需要单独计算位置
    // todayMarker 已在 CSS 中隐藏
    
    // 清除已有的里程碑节点（保留今天标记）
    const existingNodes = timelineTrack.querySelectorAll('.milestone-node');
    existingNodes.forEach(function(node) {
        node.remove();
    });
    
    // 添加里程碑节点
    activeMilestones.forEach(function(milestone) {
        // 已完成的里程碑显示在完成日期位置
        const displayDate = milestone.status === 'completed' && milestone.completedDate 
            ? milestone.completedDate 
            : milestone.date;
        
        const mDate = new Date(displayDate);
        const position = ((mDate - minDate) / (maxDate - minDate)) * 100;
        
        // 创建节点元素
        const node = document.createElement('div');
        node.className = 'milestone-node';
        if (milestone.status === 'completed') {
            node.classList.add('completed');
        } else if (milestone.status === 'cancelled') {
            node.classList.add('cancelled');
        }
        node.style.left = position + '%';
        
        node.innerHTML = `
            <div class="milestone-dot"></div>
            <div class="milestone-node-label">${escapeHtml(milestone.name)}</div>
        `;
        
        timelineTrack.appendChild(node);
    });
}

/**
 * 渲染里程碑卡片列表
 */
function renderMilestones() {
    const milestoneList = document.getElementById('milestone-list');
    const timelineEmpty = document.getElementById('timeline-empty');
    
    // 如果没有里程碑，显示空状态
    if (milestones.length === 0) {
        milestoneList.innerHTML = '';
        timelineEmpty.classList.add('show');
        return;
    }
    
    // 隐藏空状态
    timelineEmpty.classList.remove('show');
    
    // 按状态和日期双重排序（进行中在上，已完成在下）
    const sortedMilestones = [...milestones].sort(function(a, b) {
        // 第一优先级：未完成的排前面
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        
        // 第二优先级：同状态按日期排
        return new Date(a.date) - new Date(b.date);
    });
    
    // 生成 HTML
    let html = '';
    sortedMilestones.forEach(function(milestone, index) {
        // 在第一个非进行中的卡片前插入分隔线
        if (index > 0 && 
            sortedMilestones[index - 1].status === 'pending' && 
            milestone.status !== 'pending') {
            const completedCount = milestones.filter(m => m.status === 'completed').length;
            html += `
                <div style="
                    margin: 24px 0;
                    padding: 12px;
                    background: #f0fff4;
                    border: 1px solid #c6f6d5;
                    border-radius: 8px;
                    text-align: center;
                    color: #38a169;
                    font-size: 13px;
                    font-weight: 500;
                ">
                    ✅ 已完成的里程碑 (${completedCount})
                </div>
            `;
        }
        const daysRemaining = calculateDaysRemaining(milestone.date);
        const formattedDate = formatDate(milestone.date);
        
        // 状态类
        let statusClass = '';
        let daysText = '';
        
        if (milestone.status === 'completed') {
            statusClass = 'completed';
            daysText = '✅ 已完成';
            if (milestone.completedDate) {
                daysText += '（' + formatDate(milestone.completedDate) + '）';
            }
        } else if (milestone.status === 'cancelled') {
            statusClass = 'cancelled';
            daysText = '已取消';
        } else {
            if (daysRemaining === 0) {
                daysText = '🎯 今天截止';
            } else if (daysRemaining > 0) {
                daysText = '还剩 ' + daysRemaining + ' 天';
            } else {
                daysText = '已超期 ' + Math.abs(daysRemaining) + ' 天';
            }
        }
        
        html += `
            <div class="milestone-card ${statusClass}" data-id="${milestone.id}">
                <div class="milestone-status-indicator"></div>
                <div class="milestone-info">
                    <div class="milestone-name">${escapeHtml(milestone.name)}</div>
                    <div class="milestone-date-display">
                        截止日期：${formattedDate}
                        <input type="date" class="milestone-edit-date" value="${milestone.date}" 
                               style="margin-left: 12px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;">
                    </div>
                </div>
                <div class="milestone-days-left">${daysText}</div>
                <div class="milestone-actions">
                    <select class="status-select">
                        <option value="pending" ${milestone.status === 'pending' ? 'selected' : ''}>进行中</option>
                        <option value="completed" ${milestone.status === 'completed' ? 'selected' : ''}>已完成</option>
                        <option value="cancelled" ${milestone.status === 'cancelled' ? 'selected' : ''}>已取消</option>
                    </select>
                    <button class="btn btn-small btn-danger">删除</button>
                </div>
            </div>
        `;
    });
    
    // 更新 DOM
    milestoneList.innerHTML = html;
}

/**
 * 从 localStorage 加载里程碑数据
 */
function loadMilestonesFromStorage() {
    const stored = localStorage.getItem('milestones');
    if (stored) {
        try {
            milestones = JSON.parse(stored);
        } catch (e) {
            milestones = [];
        }
    }
}

/**
 * 保存里程碑数据到 localStorage
 */
function saveMilestonesToStorage() {
    localStorage.setItem('milestones', JSON.stringify(milestones));
}

// ========================================
// 工具函数
// ========================================

/**
 * HTML 转义，防止 XSS 攻击
 * @param {string} text - 要转义的文本
 * @returns {string} 转义后的安全文本
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 格式化日期为中文格式
 * @param {string} dateString - 日期字符串 (YYYY-MM-DD)
 * @returns {string} 格式化后的日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '年' + month + '月' + day + '日';
}


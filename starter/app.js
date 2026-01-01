/**
 * 📝 TodoMVC JavaScript 文件
 * 
 * 跟着教程，在这里编写 JavaScript 代码
 * 
 * 提示：
 * - 使用 console.log() 调试
 * - 按 F12 打开浏览器开发者工具查看输出
 */


// 等待 DOM 加载完成后再执行代码
document.addEventListener('DOMContentLoaded', function() {
    initTodoList();
    initNavigation();
    initCountdown();
    // 启动定时器，每分钟刷新一次
    startCountdownTimer();
});

//视图切换逻辑
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
// Todo List 功能
// ========================================

// 用于存储所有 Todo 项的数组
let todos = [];
let currentFilter = 'all';
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
    
    const todoList = document.getElementById('todo-list');

    // 使用事件委托处理列表中的点击事件，删除功能
    todoList.addEventListener('click', function(event) {
    // event.target 是实际被点击的元素
    const target = event.target;
    
    // 获取被点击元素所属的 Todo 项
    const todoItem = target.closest('.todo-item');
    if (!todoItem) return; // 如果没找到，说明点击的不是 Todo 项内部
    
    // 获取 Todo 项的 ID（从 data-id 属性读取）
    const todoId = parseInt(todoItem.getAttribute('data-id'));
    

    // 标记
    // 判断点击的是删除按钮
    if (target.classList.contains('todo-checkbox')) {
        toggleTodo(todoId);
    } else if (target.classList.contains('todo-delete')) {
        deleteTodo(todoId);
    }
    });

    loadTodosFromStorage();

    // 初始渲染
    renderTodos();
}


/**
 * 添加新的 Todo 项
 */
//思路：把input内容取过来，同时清空表单，放到本地，
//get：获取输入框元素，判空，对象的属性，

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const text = todoInput.value.trim();
    // 标记
    if (text === '') {
        return;
    }
    const newTodo = {
        id: Date.now(),
        // 标记
        text: text,
        completed: false,
    };
    
    // 添加到数组
    todos.push(newTodo);
    saveTodosToStorage();
    // 清空输入框
    todoInput.value = '';
    
    // 重新渲染列表
    renderTodos();
    // 如果写在外面，那就永远只能渲染一次，东西存进去了但是不会显示
    
    // 在控制台输出，方便调试
    console.log('添加了新 Todo:', newTodo);
    console.log('当前所有 Todo:', todos);
}

/**
 * 渲染 Todo 列表
 */

//思路：更新统计个数，添加子节点吧？考虑特殊情况（判空），伪代码：
// 获取dom节点，
// 统计个数改为长度
// 用模版字符串改写html，动态添加到ul下
function renderTodos() {
    // 获取列表容器和空状态提示
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
    filteredTodos.forEach(function(todo) {

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
    // 更新 DOM
    todoList.innerHTML = html;
}


//删除功能，伪代码：
//获取节点，他们的父级盒子应该是todo-list
//事件委托，点击li里面的button，这里用到了四个新的函数


// 标记//
function deleteTodo(id) {
    // 使用 filter 方法创建一个新数组，排除要删除的项
    todos = todos.filter(function(item) {
        return item.id !== id;
    });
    saveTodosToStorage();
    // 重新渲染
    renderTodos();
    
    console.log('删除了 ID 为', id, '的 Todo');
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
        // 切换完成状态（true 变 false，false 变 true）
        todo.completed = !todo.completed;
        saveTodosToStorage();
        // 重新渲染
        renderTodos();
        
        console.log('切换了 Todo 状态:', todo);
    }
}

function saveTodosToStorage() {
    // 把数组转换成 JSON 字符串后存储
    localStorage.setItem('todos', JSON.stringify(todos));
   // console.log('storage有： Todo 数据:', JSON.parse(localStorage.getItem('todos')));
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

    // 获取倒数日列表容器
    // const countdownList = document.getElementById('countdown-list');

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
        // 标记，为什么写在这里？
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
    
    // 初始渲染
    renderCountdowns();
}

// 添加倒数日函数

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

/**
 * 删除倒数日
 * @param {number} id - 倒数日的 ID
 */
function deleteCountdown(id) {
    countdowns = countdowns.filter(function(item) {
        return item.id !== id;
    });
    console.log('删除了 ID 为', id, '的倒数日');
    
    saveCountdownsToStorage();
    renderCountdowns();
}

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

/**
 * 启动倒计时刷新定时器
 */
function startCountdownTimer() {
    // 每分钟刷新一次（60000 毫秒）
    setInterval(function() {
        renderCountdowns();
    }, 60000);
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


    // 标记
    // 按日期排序（最近的在前面）
    const sortedCountdowns = [...countdowns].sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    // 生成简单的 HTML
    let html = '';
    sortedCountdowns.forEach(function(countdown) {
        const daysRemaining = calculateDaysRemaining(countdown.date);
     
        const formattedDate = formatDate(countdown.date);
        
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


function saveCountdownsToStorage() {
    localStorage.setItem('countdowns', JSON.stringify(countdowns));
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
    console.log('')
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // getMonth() 返回 0-11
    const day = date.getDate();
    return year + '年' + month + '月' + day + '日';
}




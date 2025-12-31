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
});

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

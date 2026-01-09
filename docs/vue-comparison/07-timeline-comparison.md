# 路线图功能对比

> 对比最复杂的功能：动态计算位置、节点交错显示、状态管理。

---

## 📋 核心功能

- 时间轴可视化渲染
- 节点位置动态计算
- 节点交错显示（避免重叠）
- 状态管理（进行中/已完成/已取消）
- 日期修改后自动重新计算

---

## 🎯 最核心对比：时间轴渲染

### 原生JS版本 (app.js 第684-768行)

```javascript
function renderTimeline() {
    const activeMilestones = milestones.filter(m => m.status === 'pending');
    
    if (activeMilestones.length === 0) {
        // 手动清除节点
        const existingNodes = timelineTrack.querySelectorAll('.milestone-node');
        existingNodes.forEach(node => node.remove());
        timelineContainer.classList.remove('show');
        return;
    }
    
    // 计算时间范围
    const today = new Date();
    let minDate = new Date(today);
    let maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 44);
    
    // 手动清除旧节点
    const existingNodes = timelineTrack.querySelectorAll('.milestone-node');
    existingNodes.forEach(node => node.remove());
    
    // 手动创建和插入节点
    activeMilestones.forEach((milestone, index) => {
        const mDate = new Date(milestone.date);
        const position = ((mDate - minDate) / (maxDate - minDate)) * 100;
        
        const node = document.createElement('div');
        node.className = 'milestone-node';
        
        if (index % 2 === 0) {
            node.classList.add('milestone-below');
        } else {
            node.classList.add('milestone-above');
        }
        
        node.style.left = position + '%';
        node.innerHTML = `...`;
        
        timelineTrack.appendChild(node);
    });
}
```

**特点**：
- ❌ 手动清除旧节点
- ❌ 手动创建DOM元素
- ❌ 计算和渲染混在一起
- ❌ 每次都重建所有节点

---

### Vue 3版本

**Store (useTimelineStore.ts)**：

```typescript
const timelineNodes = computed((): MilestoneNode[] => {
  if (activeMilestones.value.length === 0) return [];

  const today = new Date();
  let minDate = new Date(today);
  let maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 44);
  
  return activeMilestones.value.map((milestone, index) => {
    const mDate = new Date(milestone.date);
    const position = ((mDate.getTime() - minDate.getTime()) / 
                     (maxDate.getTime() - minDate.getTime())) * 100;
    
    return {
      ...milestone,
      position,
      isAbove: index % 2 === 1
    };
  });
});
```

**Component (Timeline.vue)**：

```vue
<template>
  <div v-if="store.showTimeline" class="timeline-container show">
    <div class="timeline-track">
      <div 
        v-for="node in store.timelineNodes"
        :key="node.id"
        class="milestone-node"
        :class="{
          'milestone-above': node.isAbove,
          'milestone-below': !node.isAbove
        }"
        :style="{ left: node.position + '%' }"
      >
        <div class="milestone-dot"></div>
        <div class="milestone-node-label">{{ node.name }}</div>
      </div>
    </div>
  </div>
</template>
```

**特点**：
- ✅ 数据和视图分离
- ✅ 声明式渲染
- ✅ 虚拟DOM diff优化
- ✅ 只更新变化的节点

---

## 📊 核心差异总结

| 维度 | 原生JS | Vue 3 |
|-----|--------|-------|
| DOM操作 | 手动创建/删除/更新 | 声明式，自动处理 |
| 性能 | 每次重建所有节点 | 虚拟DOM diff |
| 职责分离 | 计算和渲染混在一起 | Store计算，Component渲染 |
| 代码量 | ~285行 | ~191行 (减少33%) |

---

## 💡 关键要点

### 1. 响应式自动更新

**场景**：用户修改里程碑日期

**原生JS**：

```javascript
function updateMilestoneDate(id, newDate) {
    milestone.date = newDate;
    renderTimeline();      // ⚠️ 必须手动调用
    renderMilestones();    // ⚠️ 必须手动调用
}
```

**Vue 3**：

```typescript
function updateMilestoneDate(id: number, newDate: string) {
  milestone.date = newDate;
  // timelineNodes computed 自动重新计算
  // Vue自动更新DOM
}
```

---

### 2. 性能优化

| 操作 | 原生JS | Vue 3 |
|-----|--------|-------|
| 初始渲染 | 创建所有节点 | 创建所有节点 |
| 状态变更 | 删除所有 + 重建所有 | 只更新变化的节点 |
| 日期修改 | 删除所有 + 重建所有 | 只更新对应节点的样式 |

---

> 💡 路线图功能展示了Vue在复杂数据可视化场景下的优势：数据和视图分离、响应式自动更新、虚拟DOM性能优化。

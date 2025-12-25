<script setup lang="ts">
/**
 * 预设宽高比选项 (width / height)
 */
const ASPECT_RATIOS = Object.freeze([4 / 5, 9 / 16, 2 / 3])

const props = defineProps<{
  columns: number
  count?: number
}>()

// 基础卡片宽度（用于计算高度）
const baseWidth = 200

// 生成按列分组的骨架屏数据
const columnItems = computed(() => {
  const itemCount = props.count || 18
  const cols = props.columns || 6

  // 初始化每列的数据和高度
  const columns: Array<{ heights: number[], totalHeight: number }> = Array.from(
    { length: cols },
    () => ({ heights: [], totalHeight: 0 }),
  )

  // 按瀑布流算法分配到最短列
  for (let i = 0; i < itemCount; i++) {
    // 找到最短的列
    let minHeight = Infinity
    let minIndex = 0
    for (let j = 0; j < cols; j++) {
      if (columns[j].totalHeight < minHeight) {
        minHeight = columns[j].totalHeight
        minIndex = j
      }
    }

    // 计算高度
    const ratioIndex = i % ASPECT_RATIOS.length
    const height = Math.round(baseWidth / ASPECT_RATIOS[ratioIndex])

    // 添加到最短列
    columns[minIndex].heights.push(height)
    columns[minIndex].totalHeight += height + 12 // 12px gap
  }

  return columns.map(col => col.heights)
})
</script>

<template>
  <div
    class="video-skeleton"
    :style="{ '--columns': columns }"
  >
    <div class="video-skeleton__grid">
      <div
        v-for="(colHeights, colIndex) in columnItems"
        :key="colIndex"
        class="video-skeleton__column"
      >
        <div
          v-for="(height, itemIndex) in colHeights"
          :key="itemIndex"
          class="video-skeleton__item"
          :style="{
            height: `${height}px`,
            animationDelay: `${((colIndex + itemIndex) % 6) * 0.1}s`
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.video-skeleton {
  width: 100%;
  padding: 0 16px;
}
.video-skeleton__grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 12px;
}
.video-skeleton__column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.video-skeleton__item {
  background: linear-gradient(
    90deg,
    var(--lol-bg-card) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    var(--lol-bg-card) 75%
  );
  background-size: 200% 100%;
  border-radius: 12px;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}
@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
@media (max-width: 640px) {
  .video-skeleton {
    padding: 0 8px;
  }
  .video-skeleton__item {
    border-radius: 8px;
  }
}
@media (min-width: 1600px) {
  .video-skeleton {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 24px;
  }
}
</style>

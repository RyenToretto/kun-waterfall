<script setup lang="ts">
import type { VideoTemplate } from '#shared/types/video'
import type { VideoListResponse } from '#shared/types/api'

// SEO
useHead({
  title: 'Kun Waterfall - Video Gallery',
  meta: [
    { name: 'description', content: 'High-performance video waterfall homepage' },
  ],
})

// 响应式列数
const { columns } = useResponsiveColumns()

// 状态
const videos = ref<VideoTemplate[]>([])
const loading = ref(true)
const initialLoading = ref(true)
const hasMore = ref(true)
const currentPage = ref(1)
const totalPages = 11 // 总共 11 页 mock 数据

// 加载视频数据
const loadVideos = async () => {
  if (loading.value && !initialLoading.value) return
  if (!hasMore.value) return

  loading.value = true

  try {
    const response = await $fetch<VideoListResponse>('/api/videos', {
      params: {
        curPage: currentPage.value,
      },
    })

    if (response.message.code === 200 && response.result) {
      videos.value = [...videos.value, ...response.result.data]
      hasMore.value = currentPage.value < totalPages && response.result.data.length > 0
      currentPage.value++
    }
  }
  catch (error) {
    console.error('Failed to load videos:', error)
  }
  finally {
    loading.value = false
    initialLoading.value = false
  }
}

// 加载更多
const handleLoadMore = () => {
  if (!loading.value && hasMore.value) {
    loadVideos()
  }
}

// 初始加载
onMounted(() => {
  loadVideos()
})
</script>

<template>
  <div class="page-home">
    <HomeHeader />

    <main class="home-main">
      <!-- 骨架屏：首次加载时显示 -->
      <VideoSkeleton
        v-if="initialLoading"
        :columns="columns"
      />

      <!-- 瀑布流：数据加载完成后显示 -->
      <VideoWaterfall
        v-else
        :videos="videos"
        :loading="loading"
        @load-more="handleLoadMore"
      />

      <!-- 没有更多 -->
      <div v-if="!hasMore && videos.length > 0 && !initialLoading" class="home-main__end">
        <span class="home-main__end-text">{{ $t('common.noMore') }}</span>
      </div>
    </main>

    <HomeFooter />
  </div>
</template>

<style lang="scss">
.page-home {
  min-height: 100vh;
  background: var(--lol-bg-primary);
  display: flex;
  flex-direction: column;
}
.home-main {
  flex: 1;
  padding-top: 76px;
  padding-bottom: 24px;
}
.home-main__end {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}
.home-main__end-text {
  font-size: 14px;
  color: var(--lol-text-secondary);
}
@media (max-width: 640px) {
  .home-main {
    padding-top: 68px;
    padding-bottom: 16px;
  }
  .home-main__end {
    padding: 24px 0;
  }
  .home-main__end-text {
    font-size: 13px;
  }
}
</style>

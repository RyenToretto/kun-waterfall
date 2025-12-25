<script setup lang="ts">
import type { VideoTemplate } from '#shared/types/video'

const props = defineProps<{
  video: VideoTemplate
  cardHeight: number
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

// 视频是否正在播放且已准备好
const showVideo = ref(false)

// 判断视频方向（基于宽高比）
const isPortrait = computed(() => props.video.aspectRatio < 0.8)
const isLandscape = computed(() => props.video.aspectRatio > 1.2)

// 视频对象位置：竖屏顶部，横屏中间
const objectPosition = computed(() => {
  if (isPortrait.value) return 'center top'
  if (isLandscape.value) return 'center center'
  return 'center center'
})

// 视频可以播放时才显示
const handleCanPlay = () => {
  if (videoRef.value && !videoRef.value.paused) {
    showVideo.value = true
  }
}

// 播放时显示视频
const handlePlay = () => {
  if (videoRef.value?.readyState && videoRef.value.readyState >= 3) {
    showVideo.value = true
  }
}

// 暂停时隐藏视频，显示封面
const handlePause = () => {
  showVideo.value = false
}

// 暴露 video 元素给父组件
defineExpose({
  videoRef,
})
</script>

<template>
  <div
    class="video-card"
    :style="{ height: `${cardHeight}px` }"
  >
    <div class="video-card__wrapper">
      <!-- 封面图：始终显示作为背景 -->
      <img
        class="video-card__cover"
        :src="video.firstImageUrl"
        :alt="video.templateEnName"
        :style="{ objectPosition }"
        loading="lazy"
        decoding="async"
      >

      <!-- 视频：叠加在封面图上方 -->
      <video
        ref="videoRef"
        class="video-card__video"
        :class="{ 'video-card__video--visible': showVideo }"
        :src="video.movieUrl"
        :style="{ objectPosition }"
        muted
        playsinline
        loop
        preload="none"
        @canplay="handleCanPlay"
        @play="handlePlay"
        @pause="handlePause"
      />

      <!-- 底部渐变遮罩和标题 -->
      <div class="video-card__overlay">
        <span class="video-card__title">{{ video.templateEnName }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.video-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--lol-bg-card);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  contain: layout style paint;
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;
}
.video-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(200, 155, 60, 0.3);
}
.video-card__wrapper {
  position: absolute;
  inset: 0;
}
.video-card__cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 1;
}
.video-card__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.video-card__video--visible {
  opacity: 1;
}
.video-card__overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px 12px 12px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
  z-index: 3;
}
.video-card__title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  font-style: italic;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 640px) {
  .video-card {
    border-radius: 8px;
  }
  .video-card__overlay {
    padding: 32px 10px 10px;
  }
  .video-card__title {
    font-size: 12px;
  }
}
</style>

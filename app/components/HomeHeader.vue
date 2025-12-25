<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header class="home-header glass-effect">
    <div class="home-hd__container">
      <h1 class="home-hd__title">
        {{ t('header.title') }}
      </h1>
    </div>
  </header>
</template>

<style lang="scss">
.home-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-header.glass-effect {
  background: rgba(10, 14, 19, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(200, 155, 60, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}
.home-hd__container {
  width: 100%;
  max-width: 1600px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-hd__title {
  font-size: 22px;
  font-weight: 600;
  color: var(--lol-primary);
  letter-spacing: 0.5px;
  text-shadow: 0 0 20px rgba(200, 155, 60, 0.4);
  margin: 0;
  font-family: var(--font-family-poppins);
}
@media (max-width: 640px) {
  .home-header {
    height: 52px;
  }
  .home-hd__container {
    padding: 0 16px;
  }
  .home-hd__title {
    font-size: 18px;
  }
}
</style>


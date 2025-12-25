<script setup lang="ts">
const { t } = useI18n()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="home-footer glass-effect">
    <div class="home-ft__container">
      <div class="home-ft__content">
        <p class="home-ft__copyright">
          © {{ currentYear }} Kun Waterfall. {{ t('footer.copyright').replace(/© \d{4} .*?\./, '') }}
        </p>
        <p class="home-ft__disclaimer">
          {{ t('footer.disclaimer') }}
        </p>
        <div class="home-ft__links">
          <a href="#" class="home-ft__link">{{ t('footer.terms') }}</a>
          <span class="home-ft__divider">|</span>
          <a href="#" class="home-ft__link">{{ t('footer.privacy') }}</a>
          <span class="home-ft__divider">|</span>
          <a href="#" class="home-ft__link">{{ t('footer.contact') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.home-footer {
  position: static;
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.home-footer.glass-effect {
  background: rgba(10, 14, 19, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(200, 155, 60, 0.12);
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.25);
}
.home-ft__container {
  width: 100%;
  max-width: 1600px;
  padding: 40px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-ft__content {
  text-align: center;
}
.home-ft__copyright {
  font-size: 14px;
  color: var(--lol-text-primary);
  margin: 0 0 12px 0;
  font-weight: 500;
}
.home-ft__disclaimer {
  font-size: 13px;
  color: var(--lol-text-secondary);
  margin: 0 0 20px 0;
  max-width: 600px;
  line-height: 1.6;
}
.home-ft__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.home-ft__link {
  font-size: 13px;
  color: var(--lol-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}
.home-ft__link:hover {
  color: var(--lol-primary-light);
  text-decoration: underline;
}
.home-ft__divider {
  color: var(--lol-border-muted);
  font-size: 12px;
}
@media (max-width: 640px) {
  .home-footer {
    min-height: 180px;
  }
  .home-ft__container {
    padding: 32px 16px;
  }
  .home-ft__copyright {
    font-size: 13px;
  }
  .home-ft__disclaimer {
    font-size: 12px;
    margin-bottom: 16px;
  }
  .home-ft__link {
    font-size: 12px;
  }
}
</style>


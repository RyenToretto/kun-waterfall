/**
 * 响应式列数 composable
 * 根据视口宽度动态调整瀑布流列数
 */
export const useResponsiveColumns = () => {
  const { width } = useWindowSize()

  const columns = computed(() => {
    if (width.value < 640) {
      return 2
    }
    else if (width.value >= 640 && width.value < 980) {
      return 3
    }
    else if (width.value >= 980 && width.value < 1200) {
      return 4
    }
    else if (width.value >= 1200 && width.value < 1460) {
      return 5
    }
    else {
      return 6
    }
  })

  const isMobile = computed(() => width.value < 640)
  const isTablet = computed(() => width.value >= 640 && width.value < 1200)
  const isDesktop = computed(() => width.value >= 1200)

  return {
    columns,
    width,
    isMobile,
    isTablet,
    isDesktop,
  }
}


<template>
  <VApp id="app">
    <!--
      Even when routes use the same component, treat them
      as distinct and create the component again.
      -->

    <RouterView :key="$route.fullPath" />
  </VApp>
</template>
<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>
<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';
#app {
  @import '@design';

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: $color-body-bg;
  }
  a,
  a:visited {
    color: $color-link-text;
  }

  // ===
  // Vendor
  // ===
  #nprogress .bar {
    background: $color-link-text;
  }
}
</style>

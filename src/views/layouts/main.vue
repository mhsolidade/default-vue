<template>
  <div :class="$style.container">
    <NavDrawer />
    <NavBar />
    <VContent>
      <Breadcrumbs />
      <VContainer fluid>
        <div>
          <slot />
        </div>
      </VContainer>
    </VContent>
  </div>
</template>
<script>
import NavBar from '@components/nav-bar.vue'
import NavDrawer from '@components/navigation-drawer.vue'
import Breadcrumbs from '@components/breadcrumbs.vue'

export default {
  components: { NavBar, NavDrawer, Breadcrumbs },
}
</script>
<style lang="scss" module>
@import '@design';
.container {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>

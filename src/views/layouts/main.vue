<template>
  <div :class="$style.container">
    <NavDrawer />
    <NavBar />
    <VContent>
      <VContainer class="fill-height" fluid>
        <slot />
      </VContainer>
    </VContent>
  </div>
</template>
<script>
import NavBar from '@components/nav-bar.vue'
import NavDrawer from '@components/navigation-drawer.vue'

export default {
  components: { NavBar, NavDrawer },
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

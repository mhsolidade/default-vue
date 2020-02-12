<template>
  <div :class="$style.container">
    <NavDrawer />
    <NavBar />
    <v-content>
      <v-container class="fill-height" fluid>
        <slot />
      </v-container>
    </v-content>
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

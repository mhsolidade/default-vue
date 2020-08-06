<template>
  <VAppBar color="grey darken-1" dense dark height="60" app clipped-left>
    <VAppBarNavIcon
      v-if="loggedIn"
      class="mr-5"
      @click="toggleActivateMenu"
    ></VAppBarNavIcon>
    <VRow :justify="loggedIn ? 'start' : 'center'">
      <VToolbarTitle class="text-center">
        {{ title }}
      </VToolbarTitle>
    </VRow>
    <template v-if="loggedIn">
      <NavBarMenuUser />
    </template>
  </VAppBar>
</template>

<script>
import { authComputed, layoutMenuMethods } from '@state/helpers'
import appConfig from '@src/app.config'
import NavBarMenuUser from './nav-bar-menu-user.vue'

export default {
  components: {
    NavBarMenuUser,
  },
  data() {
    return {
      title: appConfig.title,
    }
  },
  computed: {
    ...authComputed,
  },
  methods: {
    ...layoutMenuMethods,
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>

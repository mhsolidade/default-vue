<template>
  <VAppBar color="grey darken-1" dense dark height="60" app clipped-left>
    <VAppBarNavIcon v-if="loggedIn"></VAppBarNavIcon>
    <VRow :justify="loggedIn ? 'start' : 'center'">
      <VToolbarTitle class="text-center">
        {{ title }}
      </VToolbarTitle>
    </VRow>
    <template v-if="loggedIn">
      <VSpacer></VSpacer>
      <VBtn icon>
        <VAvatar>
          <VIcon dark>mdi-account-circle</VIcon>
        </VAvatar>
      </VBtn>
    </template>
  </VAppBar>
</template>

<script>
import { authComputed } from '@state/helpers'
import appConfig from '@src/app.config'

export default {
  data() {
    return {
      title: appConfig.title,
    }
  },
  computed: {
    ...authComputed,
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>

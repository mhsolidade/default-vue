<template>
  <v-app-bar color="grey darken-1" dense dark height="60" app clipped-left>
    <v-app-bar-nav-icon v-if="loggedIn"></v-app-bar-nav-icon>
    <v-row :justify="loggedIn ? 'start' : 'center'">
      <v-toolbar-title class="text-center">
        {{ title }}
      </v-toolbar-title>
    </v-row>
    <template v-if="loggedIn">
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-avatar>
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </template>
  </v-app-bar>
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

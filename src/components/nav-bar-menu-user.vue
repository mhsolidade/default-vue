<template>
  <VMenu offset-y>
    <template v-slot:activator="{ on }">
      <VBtn text v-on="on">
        <VIcon class="mr-1">mdi-account-circle</VIcon>
        <span v-if="$vuetify.breakpoint.smAndUp"> {{ currentUser.name }}</span>
        <VIcon large>mdi-menu-down</VIcon>
      </VBtn>
    </template>

    <VList>
      <VListItem exact :to="{ name: 'profile' }">
        <VListItemTitle>Perfil</VListItemTitle>
      </VListItem>
      <VListItem exact :to="{ name: 'logout' }">
        <VListItemTitle>sair</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script>
import { authComputed, layoutMenuMethods } from '@state/helpers'
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
  methods: {
    ...layoutMenuMethods,
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>

<template>
  <VMenu :nudge-width="150" offset-y>
    <template v-slot:activator="{ on }">
      <VBtn icon v-on="on">
        <VIcon large>mdi-menu-down</VIcon>
      </VBtn>
    </template>

    <VList>
      <VListItem>
        <VListItemTitle>Perfil</VListItemTitle>
      </VListItem>
      <VListItem>
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

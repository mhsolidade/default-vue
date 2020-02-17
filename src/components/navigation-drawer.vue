<template>
  <VNavigationDrawer v-if="loggedIn" v-model="drawer" app clipped>
    <!-- v-model="drawer" -->
    <VList dense>
      <VListItem link>
        <VListItemAction>
          <VIcon>mdi-view-dashboard</VIcon>
        </VListItemAction>
        <VListItemContent>
          <VListItemTitle>Dashboard</VListItemTitle>
        </VListItemContent>
      </VListItem>
      <VListItem link>
        <VListItemAction>
          <VIcon>mdi-settings</VIcon>
        </VListItemAction>
        <VListItemContent>
          <VListItemTitle>{{ activateMenu }}</VListItemTitle>
        </VListItemContent>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script>
import {
  authComputed,
  layoutMenuComputed,
  layoutMenuMethods,
} from '@state/helpers'

export default {
  data() {
    return {
      localDrawer: true,
    }
  },
  computed: {
    ...authComputed,
    ...layoutMenuComputed,
    drawer: {
      get() {
        return this.activateMenu
      },
      set(value) {
        this.setActivateMenu(value)
      },
    },
  },
  methods: {
    ...layoutMenuMethods,
  },
}
</script>

<style></style>

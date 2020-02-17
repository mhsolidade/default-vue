<template>
  <VNavigationDrawer v-if="loggedIn" app clipped>
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
          <VListItemTitle>Settings</VListItemTitle>
        </VListItemContent>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script>
import { authComputed } from '@state/helpers'

export default {
  computed: {
    ...authComputed,
  },
}
</script>

<style></style>

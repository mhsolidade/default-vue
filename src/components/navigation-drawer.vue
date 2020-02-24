<template>
  <VNavigationDrawer
    v-if="loggedIn"
    v-model="drawer"
    app
    clipped
    color="grey darken-3"
    dense
    dark
  >
    <!-- v-model="drawer" -->
    <VList dense>
      <VListItemGroup v-model="itemActive" color="black">
        <VListItem
          v-for="(item, i) in links"
          :key="i"
          active-class="info--text"
          :to="item.router"
          link
        >
          <VListItemAction v-if="item.icon">
            <VIcon>{{ item.icon }}</VIcon>
          </VListItemAction>
          <VListItemContent>
            <VListItemTitle>{{ item.name }} </VListItemTitle>
          </VListItemContent>
        </VListItem>
      </VListItemGroup>
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
      itemActive: 1,
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

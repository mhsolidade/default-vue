<template>
  <VBreadcrumbs class="grey lighten-1" :items="items">
    <template v-slot:item="{ item }">
      <VBreadcrumbsItem
        :disabled="item.disabled"
        :to="{ name: item.routerName }"
        exact
      >
        {{ item.text }}
      </VBreadcrumbsItem>
    </template>
  </VBreadcrumbs>
</template>
<script>
export default {
  data: () => ({
    items: [],
  }),
  watch: {
    $route: {
      immediate: true,
      handler: 'setList',
    },
  },
  methods: {
    setList(newValue) {
      this.items = newValue.meta.bradcrumb || []
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>

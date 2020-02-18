<template>
  <v-breadcrumbs class="grey lighten-1" :items="items">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :to="{ name: item.routerName }"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
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

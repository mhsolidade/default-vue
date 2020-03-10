<template>
  <VMenu offset-y>
    <template v-slot:activator="{ on }">
      <VBtn icon color="grey darken-2" dark v-on="on">
        <VIcon>mdi-pencil-outline</VIcon>
      </VBtn>
    </template>
    <VList>
      <slot name="links">
        <VListItem v-for="(item, index) in items" :key="index">
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </slot>
    </VList>
  </VMenu>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

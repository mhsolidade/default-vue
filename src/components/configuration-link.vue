<template>
  <VRow class="grey lighten-2 elevation-3 ma-3 px-3 mb-5" justify="center">
    <VCol cols="12" sm="8" md="8">
      <h2 class="headline">{{ title }}</h2>
      <span class="subtitle-1">
        {{ subtitle }}
      </span>
    </VCol>
    <VCol align-self="center" cols="12" sm="4" md="4" class="pa-0">
      <VRow justify="end" class="mr-4">
        <slot name="action">
          <VBtn :to="{ name: routerName }">{{ btnTitle }}</VBtn>
        </slot>
      </VRow>
    </VCol>
  </VRow>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
      required: true,
    },
    subtitle: {
      type: String,
      default: 'Title',
      required: true,
    },
    routerName: {
      type: String,
      default: 'Title',
      required: true,
    },
    btnTitle: {
      type: String,
      default: 'title',
      require: true,
    },
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

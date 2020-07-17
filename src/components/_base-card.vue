<template>
  <VCard>
    <VCol class="grey lighten-2 px-4">
      <slot name="title">
        <VCol cols="12" class="headline" justify="center">
          title
        </VCol>
      </slot>
    </VCol>
    <VCol v-if="!!$slots.subtitle" cols="12" class="ma-0 px-4">
      <slot name="subtitle"></slot>
    </VCol>
    <VCardText class="py-0 px-4">
      <slot name="body"></slot>
    </VCardText>
  </VCard>
</template>
<script>
export default {}
</script>
<style lang="scss" module>
@import '@design';
</style>

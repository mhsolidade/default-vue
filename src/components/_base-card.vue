<template>
  <VRow align="center" justify="center">
    <VCol col="10" sm="12" md="11" justify="center">
      <VCard>
        <VCol class="grey lighten-2 pa-4">
          <slot name="title">
            <VCol cols="12" class="headline" justify="center">
              title
            </VCol>
          </slot>
        </VCol>
        <VCol cols="12" class="ma-0 pa-3">
          <slot name="subtitle"></slot>
        </VCol>
        <VCardText class="pa-3">
          <slot name="body"></slot>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
<script>
export default {}
</script>
<style lang="scss" module>
@import '@design';
</style>

<template>
  <Layout>
    <VRow align="center" justify="center">
      <VCol cols="12" sm="8" md="5" class="pa-5">
        <VCard class="elevation-12">
          <slot />
        </VCard>
      </VCol>
    </VRow>
  </Layout>
</template>

<script>
import Layout from './main.vue'

export default {
  components: {
    Layout,
  },
}
</script>

<style lang="scss" module></style>

<template>
  <Layout>
    <VRow justify="center">
      <VCol cols="12" md="10">
        <RouterView :key="$route.fullPath" />
      </VCol>
    </VRow>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'

export default {
  components: {
    Layout,
  },
}
</script>

<style lang="scss" module></style>

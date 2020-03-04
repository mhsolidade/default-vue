<template>
  <Layout>
    <div>
      <RouterView :key="$route.fullPath" />
    </div>
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

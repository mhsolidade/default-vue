<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script>
import Layout from '@layouts/login.vue'

export default {
  components: {
    Layout,
  },

  created() {
    console.log('index')
  },
}
</script>

<style lang="scss" module></style>

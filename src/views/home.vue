<template>
  <div class="home">
    <img alt="Vue logo" src="@assets/images/logo.png" />
    <div>home</div>
    <routerLink :to="{ name: 'logout' }">logout</routerLink>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
}
</script>

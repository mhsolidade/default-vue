<template>
  <div :class="$style.container">
    <NavBar />
    <VContent>
      <VContainer class="fill-height" fluid>
        <VRow align="center" justify="center">
          <VCol cols="12" sm="8" md="5" class="pa-5">
            <VCard class="elevation-12">
              <slot />
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VContent>
  </div>
</template>

<script>
import NavBar from '@components/nav-bar.vue'

export default {
  components: { NavBar },
}
</script>

<style lang="scss" module>
@import '@design';
.container {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>

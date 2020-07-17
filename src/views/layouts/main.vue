<template>
  <div :class="$style.container">
    <NavDrawer />
    <NavBar />
    <VContent>
      <Breadcrumbs />
      <FastAlert />
      <VContainer fluid class="pt-0">
        <div>
          <slot />
        </div>
      </VContainer>
    </VContent>
    <DialogConfirmation v-model="show" />
  </div>
</template>
<script>
import NavBar from '@components/nav-bar.vue'
import NavDrawer from '@components/navigation-drawer.vue'
import Breadcrumbs from '@components/breadcrumbs.vue'
import FastAlert from '@components/fast-alert.vue'
import DialogConfirmation from '@components/dialog-confirmation.vue'
import { confirmationMethods, alertMethods } from '@state/helpers'

export default {
  components: {
    NavBar,
    NavDrawer,
    Breadcrumbs,
    FastAlert,
    DialogConfirmation,
  },
  data() {
    return {
      cout: 0,
      show: true,
    }
  },
  methods: {
    ...confirmationMethods,
    ...alertMethods,
    sendConfimation() {
      this.setConfirmation({
        description: 'nova descrição',
        title: 'novo titulo',
        promise: this.delete,
      })
    },
    delete() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('deletado')
          resolve(null)
          this.newAlert('deletado com sucesso')
        }, 3000)
      })
    },
  },
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

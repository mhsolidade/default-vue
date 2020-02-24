<template>
  <VDialog :value="active" persistent max-width="400">
    <VCard>
      <VCardTitle class="headline">
        {{ title }}
      </VCardTitle>
      <VCardText>
        {{ description }}
      </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn text :disabled="loading" @click="sendCancel">
          Cancelar
        </VBtn>
        <VBtn color="red darken-1" text :loading="loading" @click="confirmed">
          Confirmo
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<script>
import { confirmationComputde, confirmationMethods } from '@state/helpers'

export default {
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...confirmationComputde,
  },
  methods: {
    ...confirmationMethods,
    async confirmed() {
      this.loading = true
      await this.promise()
      this.sendCancel()
    },
    sendCancel() {
      this.loading = false
      this.cancel()
    },
  },
}
</script>

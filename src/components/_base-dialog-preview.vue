<template>
  <div class="text-center">
    <VDialog v-model="localValue" min-width="600" width="900">
      <VCard class="pa-5">
        <VBtn
          small
          absolute
          top
          right
          text
          fab
          class="mt-5"
          @click="localValue = !localValue"
        >
          <v-icon>mdi-close</v-icon>
        </VBtn>
        <VCardText>
          <VSheet class="mt-5" min-height="300" min-width="600">
            <div v-html="html"></div>
          </VSheet>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    html: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>

<template>
  <v-row justify="center" style="min-height: 10px;">
    <v-fade-transition mode="out-in">
      <v-alert v-show="active" class="grey lighten-4" width="100%">
        {{ text }}
      </v-alert>
    </v-fade-transition>
  </v-row>
</template>

<script>
import { alertComputde } from '@state/helpers'
export default {
  computed: {
    ...alertComputde,
  },
  watch: {
    active(newValue) {
      if (newValue) {
        this.$vuetify.goTo(0, {
          duration: 300,
          offset: 0,
          easing: 'linear',
        })
      }
    },
  },
}
</script>

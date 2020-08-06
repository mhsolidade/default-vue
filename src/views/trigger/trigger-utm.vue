<template>
  <BaseCard>
    <template v-slot:title>
      UTM de trackeamento da gatilho
    </template>
    <template v-slot:body>
      <VRow>
        <VCol cols="12" sm="6" md="6">
          <samp>Remover UTM’s do Feed/XML de produtos?</samp>
          <VSelect
            v-model="trigger.removeGlobalTracking"
            outlined
            item-text="name"
            item-value="value"
            :items="options"
          ></VSelect>
        </VCol>
        <VCol cols="12" sm="6" md="6">
          <v-btn outlined small class="" @click="addUtm">
            UTM’s Adicionar <v-icon>mdi-plus</v-icon>
          </v-btn>

          <VRow v-for="(tracking, key) in trackings" :key="key">
            <VCol cols="12" sm="5" md="5">
              <samp>Prioridade</samp>
              <VTextField
                v-model="tracking.name"
                counter="20"
                outlined
                required
                @change="setTrackings"
              ></VTextField>
            </VCol>
            <VCol cols="12" sm="5" md="5">
              <samp>Status</samp>
              <VTextField
                v-model="tracking.value"
                counter="20"
                outlined
                required
                @change="setTrackings"
              ></VTextField>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </template>
  </BaseCard>
</template>
<script>
export default {
  props: {
    trigger: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      options: [
        { value: true, name: 'Sim' },
        { value: false, name: 'Não' },
      ],
      trackings: [],
    }
  },
  created() {
    const tracking = this.trigger.config.tracking

    if (tracking) {
      for (const key in tracking) {
        if (Object.prototype.hasOwnProperty.call(tracking, key)) {
          this.trackings.push({ name: key, value: tracking[key] })
        }
      }
    }
  },
  methods: {
    addUtm() {
      this.trigger.config.tracking = this.trigger.config.tracking || {}

      this.trackings.push({ name: '', value: '' })
    },
    setTrackings() {
      this.trigger.config.tracking = {}
      this.trackings.forEach((item) => {
        this.trigger.config.tracking[item.name] = item.value
      })
    },
  },
}
</script>

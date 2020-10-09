<template>
  <div>
    <VRow align="center" class="" justify="center">
      <VCol cols="12" sm="12" md="10" class="mt-0 pt-0" justify="center">
        <VForm ref="form" v-model="valid">
          <TriggerDetails :trigger="trigger" />
          <TriggerValidity :trigger="trigger" />
          <TriggerUtm :trigger="trigger" />
          <TriggerFirstInteraction :trigger="trigger" />
          <TriggerNextInteraction :trigger="trigger" />
          <TriggerHtml
            :templates="templates"
            :themes="themes"
            :trigger="trigger"
          />

          <BaseCard>
            <template v-slot:title>
              <VCol cols="12" sm="12" md="12">
                <VRow>
                  <v-btn class="" :to="{ name: 'trigger' }">
                    Cancelar
                  </v-btn>
                  <v-btn class="ml-2" :loading="loading" @click="save">
                    salvar
                  </v-btn>
                </VRow>
              </VCol>
            </template>
          </BaseCard>
        </VForm>
      </VCol>
    </VRow>
  </div>
</template>
<script>
import { alertMethods } from '@state/helpers'
import triggerDetails from './trigger-details.vue'
import triggerValidity from './trigger-validity.vue'
import triggerUtm from './trigger-utm.vue'
import triggerFirstInteraction from './trigger-first-interaction.vue'
import triggerNextInteraction from './trigger-next-interaction.vue'
import triggerHtml from './trigger-html.vue'
export default {
  components: {
    TriggerDetails: triggerDetails,
    TriggerValidity: triggerValidity,
    TriggerUtm: triggerUtm,
    TriggerFirstInteraction: triggerFirstInteraction,
    TriggerNextInteraction: triggerNextInteraction,
    TriggerHtml: triggerHtml,
  },

  props: {
    trigger: {
      type: Object,
      default: () => {},
      required: true,
    },
    engine: {
      type: Object,
      default: () => {},
      required: true,
    },
    templates: {
      type: Array,
      default: () => {
        return []
      },
    },
    themes: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      valid: true,
      loading: false,
    }
  },
  methods: {
    ...alertMethods,
    async save() {
      if (!this.$refs.form.validate()) {
        this.$vuetify.goTo(0, {
          duration: 300,
          offset: 0,
          easing: 'linear',
        })
        return
      }
      this.loading = true
      if (this.trigger.id) {
        await this.updatedTrigger()
      } else {
        await this.createTrigger()
      }
    },
    async createTrigger() {
      await this.$store.dispatch('trigger/createTrigger', this.trigger)

      this.newAlert(`Gatilho criado com sucesso ${this.trigger.name}`)
      this.loading = false
    },
    async updatedTrigger() {
      await this.$store.dispatch('trigger/updateTrigger', this.trigger)
      this.newAlert(`Gatilho atualizado com sucesso ${this.trigger.name}`)
      this.loading = false
    },
  },
}
</script>

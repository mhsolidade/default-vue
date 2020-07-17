<template>
  <div>
    <VRow align="center" class="" justify="center">
      <VCol cols="12" sm="12" md="10" class="mt-0 pt-0" justify="center">
        <VForm ref="form" v-model="valid" :lazy-validation="lazy">
          <TriggerDetails :trigger="trigger" />
          <TriggerValidity :trigger="trigger" />

          <BaseCard>
            <template v-slot:title>
              <VCol cols="12" sm="12" md="12">
                <Vrow justify="space-between">
                  <v-btn class="" @click="validate">
                    Cancelar
                  </v-btn>
                  <v-btn class="ma-2" @click="validate">
                    salvar
                  </v-btn>
                  <v-btn class="" @click="validate">
                    Ativar e Confg. Repiques
                  </v-btn>
                </Vrow>
              </VCol>
            </template>
          </BaseCard>
        </VForm>
      </VCol>
    </VRow>
  </div>
</template>
<script>
import triggerDetails from './trigger-details.vue'
import triggerValidity from './trigger-validity.vue'
export default {
  components: {
    TriggerDetails: triggerDetails,
    TriggerValidity: triggerValidity,
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
  },
  data() {
    return {
      valid: true,
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>

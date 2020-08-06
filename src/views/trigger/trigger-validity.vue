<template>
  <BaseCard>
    <template v-slot:title>
      Validade do gatilho
    </template>
    <template v-slot:body>
      <VRow col="12" align="stretch" class="px-0 pt-2">
        <VCol cols="12" sm="6" md="6" class="py-0">
          <samp>O gatilho tem data de validade?</samp>
          <v-select
            v-model="trigger.hasValidityDate"
            :items="options"
            item-text="name"
            item-value="value"
            outlined
            :rules="rules.name"
          ></v-select>
        </VCol>
        <VCol
          v-if="!!trigger.hasValidityDate"
          col="12"
          sm="6"
          md="6"
          class="py-0"
        >
          <span class="ml-5 pl-3">Data de Validade</span>
          <BaseDatePicker
            v-model="trigger.startDate"
            persistent-hint
            prepend-icon="mdi-calendar"
            readonly
            outlined
            required
            :picker="{ 'allowed-dates': (val) => val > $moment().format() }"
          />
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
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      rules: {
        name: [
          (v) => {
            return !!v || 'Selecione uma opção'
          },
        ],
      },
      options: [
        { value: 'true', name: 'Sim' },
        { value: 'false', name: 'Não' },
      ],
    }
  },
}
</script>

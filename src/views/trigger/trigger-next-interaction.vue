<template>
  <BaseCard>
    <template v-slot:title>
      Próxima interação
      <p class="grey--text ">
        Se refere ao segundo envio, por exemplo, enviar o segundo e-mail 12
        horas após o primeiro e-mail.
      </p>
    </template>
    <template v-slot:body>
      <VRow>
        <VCol cols="12" sm="3" md="3">
          <samp>Valor</samp>
          <VTextField
            v-model="value"
            v-mask="'#####'"
            outlined
            required
            @change="setFirstInteraction"
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="3" md="3">
          <samp>Tipo</samp>
          <v-select
            v-model="type"
            :items="options"
            item-text="name"
            item-value="value"
            outlined
            @change="setFirstInteraction"
          ></v-select>
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
      rules: {
        name: [(v) => ''],
      },
      value: '',
      type: '',
      options: [
        { value: 'minute', name: 'Minuto' },
        { value: 'hour', name: 'Hora' },
        { value: 'day', name: 'Dia' },
      ],
    }
  },

  created() {
    if (this.trigger.config.nextInteraction) {
      const [
        tempValue,
        tempType,
      ] = this.trigger.config.nextInteraction[0].split(' ')
      this.value = tempValue
      this.type = tempType
    }
  },
  methods: {
    setFirstInteraction() {
      this.trigger.config.nextInteraction = `${this.value} ${this.type}`
    },
  },
}
</script>

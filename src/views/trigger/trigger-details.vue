<template>
  <BaseCard>
    <template v-slot:title>
      Detalhes
    </template>
    <template v-slot:body>
      <VRow>
        <VCol cols="12" sm="6" md="6" class="py-0">
          <samp>Nome</samp>
          <VTextField
            v-model="trigger.name"
            :rules="rules.name"
            counter="20"
            outlined
            required
          ></VTextField>
          <samp>Assunto do e-mail</samp>
          <VTextField
            v-model="subject"
            :rules="rules.name"
            counter="20"
            outlined
            required
          ></VTextField>
          <samp>Nome do remetente</samp>
          <VTextField
            v-model="trigger.fromName"
            :rules="rules.name"
            counter="20"
            outlined
            required
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6" md="6" class="py-0">
          <samp>Prioridade</samp>
          <VTextField
            v-model="trigger.sort"
            v-mask="'####'"
            :rules="rules.name"
            counter="20"
            outlined
            required
          ></VTextField>

          <samp>Status</samp>
          <v-select
            v-model="trigger.status"
            :items="status"
            item-text="name"
            item-value="value"
            outlined
            :rules="rules.name"
          ></v-select>

          <samp>Email do remetente</samp>
          <VTextField
            v-model="trigger.fromEmail"
            :rules="rules.name"
            counter="20"
            outlined
            required
          ></VTextField>
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
        name: [(v) => ''],
      },
      status: [
        { value: 'enabled', name: 'Ativo' },
        { value: 'disabled', name: 'Inativo' },
      ],
    }
  },
  computed: {
    subject: {
      get() {
        return this.trigger.config.subjectArray[0].subject || ''
      },
      set(newValue) {
        this.trigger.config.subjectArray[0].subject = newValue
        this.trigger.config.subjectArray[0].type = 'static'
      },
    },
  },
}
</script>

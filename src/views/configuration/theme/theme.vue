<template>
  <BaseCard>
    <template v-slot:title>Edição de themes</template>
    <template v-slot:body>
      <v-form v-model="valid" lazy-validation>
        <VRow>
          <v-col cols="12" md="6">
            <span>Nome</span>
            <v-text-field
              v-model="theme.name"
              :rules="rules.name"
              outlined
              required
            ></v-text-field>
          </v-col>
          <VSpacer></VSpacer>
        </VRow>

        <VRow>
          <VCol cols="12" md="11">
            <span>HTML - Header</span>
            <v-textarea
              v-model="theme.htmlHeader"
              class="mt-0"
              rows="10"
              row-height="20"
              outlined
              no-resize
            ></v-textarea>
          </VCol>
          <VSpacer></VSpacer>
        </VRow>
        <VRow>
          <VCol cols="12" md="11">
            <span>HTML - Footer</span>
            <v-textarea
              v-model="theme.htmlFooter"
              class="mt-0"
              rows="10"
              row-height="20"
              outlined
              no-resize
            ></v-textarea>
          </VCol>
          <VSpacer></VSpacer>
        </VRow>
        <VRow class="">
          <VCol cols="12" sm="2">
            <VBtn block outlined>Gerar Teste</VBtn>
          </VCol>
          <VCol cols="12" sm="2">
            <VBtn block outlined>Savar</VBtn>
          </VCol>
        </VRow>
      </v-form>
    </template>
  </BaseCard>
</template>
<script>
export default {
  props: {
    theme: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      rules: {
        name: [(v) => !!v || 'Preencha o nome'],
      },
    }
  },
}
</script>
<style lang="scss" module>
@import '@design';
textarea {
  margin-top: 0px !important;
}
</style>

<template>
  <BaseCard>
    <template v-slot:title>Edição de Banners</template>
    <template v-slot:body>
      <v-form v-model="valid" lazy-validation>
        <VRow>
          <v-col cols="12" md="6">
            <span>Nome</span>
            <v-text-field
              v-model="banner.name"
              :rules="rules.name"
              outlined
              required
            ></v-text-field>
          </v-col>
          <VSpacer></VSpacer>
          <v-col cols="12" md="4">
            <span>Status</span>
            <v-select
              v-model="banner.statusId"
              :items="status"
              item-text="name"
              item-value="id"
              outlined
              :rules="rules.name"
            ></v-select>
          </v-col>
          <VSpacer></VSpacer>
        </VRow>
        <VRow justify="space-around">
          <v-col cols="12" md="6">
            <span>Result Tag</span>
            <v-text-field
              v-model="banner.resultTag"
              :rules="rules.name"
              outlined
              required
            ></v-text-field>
          </v-col>
          <VSpacer></VSpacer>
          <v-col cols="12" md="2">
            <span>Data início</span>
            <BaseDatePicker
              v-model="banner.periodStart"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              outlined
              required
              :rules="rules.name"
            />
          </v-col>
          <v-col cols="12" md="2">
            <span>Data Término</span>
            <BaseDatePicker
              v-model="banner.periodEnd"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              outlined
              required
              :rules="rules.name"
            />
          </v-col>
          <VSpacer></VSpacer>
        </VRow>
        <VRow>
          <VCol cols="12" md="11">
            <span>HTML</span>
            <v-textarea
              v-model="banner.html"
              class="mt-0"
              rows="15"
              row-height="20"
              outlined
              no-resize
            ></v-textarea>
          </VCol>
          <VSpacer></VSpacer>
        </VRow>
        <VRow class="">
          <VCol cols="12" sm="2">
            <VBtn block outlined>Visualizar</VBtn>
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
    banner: {
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
      status: [
        { id: 1, name: 'Ativo' },
        { id: 3, name: 'Inativo' },
        { id: 2, name: 'Testado' },
      ],
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

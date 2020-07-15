<template>
  <BaseCard>
    <template v-slot:title>Edição de templates</template>
    <template v-slot:body>
      <v-form v-model="valid" lazy-validation>
        <VRow>
          <v-col cols="12" md="6">
            <span>Nome</span>
            <v-text-field v-model="template.name" :rules="rules.name" outlined required></v-text-field>
          </v-col>
          <VSpacer></VSpacer>
        </VRow>

        <VRow>
          <VCol cols="12" md="11">
            <span>HTML</span>
            <v-textarea
              v-model="template.html"
              class="mt-0"
              rows="10"
              row-height="20"
              outlined
              no-resize
            ></v-textarea>
          </VCol>
          <VSpacer></VSpacer>
        </VRow>
        <VRow class>
          <VCol cols="12" sm="2">
            <GeneretorTestThemeTemplate :template="template" />
          </VCol>
          <VCol cols="12" sm="2">
            <VBtn block outlined @click="createdOrUpdate">Savar</VBtn>
          </VCol>
        </VRow>
      </v-form>
    </template>
  </BaseCard>
</template>
<script>
import { alertMethods } from '@state/helpers'
import GeneretorTestThemeTemplate from '@components/generetor-test-theme-template.vue'

export default {
  components: {
    GeneretorTestThemeTemplate,
  },
  props: {
    template: {
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
  methods: {
    ...alertMethods,
    createdOrUpdate() {
      if (this.template.id) {
        this.updated()
      } else {
        this.created()
      }
    },
    created() {
      this.$store
        .dispatch('template/createTemplate', this.template)
        .then((resp) => {
          this.newAlert(`Template criada com sucesso ${this.template.name}`)
          this.$router.push({ name: 'template' })
        })
    },
    updated() {
      this.$store
        .dispatch('template/updateTemplate', this.template)
        .then((resp) => {
          this.newAlert(`Template atualizada com sucesso ${this.template.name}`)
        })
    },
  },
}
</script>
<style lang="scss" module>
@import '@design';
textarea {
  margin-top: 0px !important;
}
</style>

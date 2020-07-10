<template>
  <BaseCard>
    <template v-slot:title>Edição URL</template>
    <template v-slot:body>
      <v-form v-model="valid" lazy-validation>
        <VRow>
          <v-col cols="12" md="6">
            <span>Nome</span>
            <v-text-field
              v-model="url.name"
              :rules="rules.name"
              counter="20"
              outlined
              required
            ></v-text-field>
          </v-col>
          <VSpacer></VSpacer>
        </VRow>

        <VRow>
          <VCol cols="12" md="11">
            <span>Link</span>
            <v-textarea
              v-model="url.link"
              :rules="rules.isLink"
              class="mt-0"
              rows="2"
              row-height="20"
              outlined
              no-resize
            ></v-textarea>
          </VCol>
          <VSpacer></VSpacer>
        </VRow>
        <VRow class="">
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

export default {
  props: {
    url: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      // eslint-disable-next-line no-useless-escape
      regxLink: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
      rules: {
        name: [(v) => !!v || 'Preencha o nome'],
        isLink: [(v) => !!this.regxLink.test(v) || 'Link Inválido.'],
      },
    }
  },
  methods: {
    ...alertMethods,
    createdOrUpdate() {
      if (this.url.id) {
        this.updated()
      } else {
        this.created()
      }
    },
    created() {
      this.$store.dispatch('url/createUrl', this.url).then((resp) => {
        this.newAlert(`Url criada com sucesso ${this.url.name}`)
        this.$router.push({ name: 'url' })
      })
    },
    updated() {
      this.$store.dispatch('url/updateUrl', this.url).then((resp) => {
        this.newAlert(`Url atualizada com sucesso ${this.url.name}`)
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

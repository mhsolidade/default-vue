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
              v-model="banner.status"
              :items="status"
              item-text="name"
              item-value="value"
              outlined
              :rules="rules.name"
            ></v-select>
          </v-col>
          <VSpacer></VSpacer>
        </VRow>
        <VRow justify="space-around">
          <v-col cols="12" md="6">
            <span>Result Tag</span>
            <v-text-field :value="resultTag" disabled outlined></v-text-field>
          </v-col>
          <VSpacer></VSpacer>
          <v-col cols="12" md="2">
            <span>Data início</span>
            <BaseDatePicker
              v-model="banner.startDate"
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
              v-model="banner.endDate"
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
            <VBtn block outlined @click="showPreview = !showPreview">
              Visualizar
            </VBtn>
          </VCol>
          <VCol cols="12" sm="2">
            <VBtn block outlined @click="save">Savar</VBtn>
          </VCol>
        </VRow>
      </v-form>
      <SmartPreview v-model="showPreview" :html="banner.html"></SmartPreview>
    </template>
  </BaseCard>
</template>
<script>
import { confirmationMethods, alertMethods } from '@state/helpers'
import SmartPreview from './preview.vue'
export default {
  components: {
    SmartPreview,
  },
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
      showPreview: false,
      rules: {
        name: [(v) => !!v || 'Preencha o nome'],
      },
      status: [
        { value: 'enabled', name: 'Ativo' },
        { value: 'disabled', name: 'Inativo' },
        { value: 'testing', name: 'Testado' },
      ],
    }
  },
  computed: {
    resultTag() {
      return `{{banners.'${this.banner.name}'}}`
    },
  },
  methods: {
    ...confirmationMethods,
    ...alertMethods,
    sendConfimation(item) {
      this.setConfirmation({
        description: `Confirma a exclusão do banner ${item.name} ?`,
        title:
          'Atenção! Antes de remover o banner, confira se as referências foram removidas dos templates.',
        promise: this.delete,
        params: { item },
      })
    },
    delete({ item }) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('banner/deleteBanner', item.id).then((resp) => {
          resolve(null)
          this.newAlert(`deletado com sucesso ${item.name}`)
        })
      })
    },
    save() {
      if (this.banner.id) {
        this.updated()
      } else {
        this.createBanner()
      }
    },
    createBanner() {
      this.$store.dispatch('banner/createBanner', this.banner).then((resp) => {
        this.newAlert(`Banner criado com sucesso ${this.banner.name}`)
        this.$router.push({ name: 'banner' })
      })
    },
    updated() {
      this.$store.dispatch('banner/updateBanner', this.banner).then((resp) => {
        this.newAlert(`Banner atualizado com sucesso ${this.banner.name}`)
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

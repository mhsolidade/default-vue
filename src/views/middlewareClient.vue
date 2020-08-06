<template>
  <Layout>
    <VDialog
      :value="true"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <VCard>
        <VCardTitle primary-title>
          Para Continuar navegando selecione um cliente
        </VCardTitle>
        <VCardText>
          <VForm ref="form" v-model="valid">
            <VSelect
              v-model="selectClientId"
              :loading="tryingToFetch"
              :items="clients"
              label="Selecione um cliente"
              :rules="rule"
            ></VSelect>
          </VForm>
        </VCardText>
        <v-card-actions class="pr-3">
          <VSpacer></VSpacer>
          <VBtn outlined color="info" @click="setClientId">Continuar</VBtn>
        </v-card-actions>
      </VCard>
    </VDialog>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      clients: [],
      selectClientId: '',
      tryingToFetch: false,
      rule: [(v) => !!v || 'Selecione um cliente'],
      valid: true,
    }
  },
  async created() {
    this.tryingToFetch = true
    this.clients = await this.$store.dispatch('client/fetchClient')
    this.tryingToFetch = false
  },
  methods: {
    setClientId() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('client/setCurrentClientId', this.selectClientId)
          .then(() => {
            this.$router.push(
              this.$route.query.redirectFrom || { name: 'dashboard' }
            )
          })
      }
    },
  },
}
</script>

<style lang="scss" module></style>

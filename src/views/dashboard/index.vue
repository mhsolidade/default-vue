<template>
  <Layout>
    <VRow>
      <VCol cols="12">
        <BaseCard>
          <template v-slot:title>
            Volume de envios
          </template>
          <template v-slot:body>
            <VRow>
              <VCol cols="6">
                <BaseCardDash :loading="loadingMonth">
                  <template v-slot:subtitle-1>ÚLTIMOS 30 DIAS</template>
                  <template v-slot:title>1 Mi</template>
                  <template v-slot:subtitle-2>Total: 1.747,480</template>
                </BaseCardDash>
              </VCol>
              <VCol cols="6">
                <BaseCardDash :loading="loadingToday">
                  <template v-slot:subtitle-1>Hoje</template>
                  <template v-slot:title>46 Mi</template>
                  <template v-slot:subtitle-2>Total: 1.747,480</template>
                </BaseCardDash>
              </VCol>
            </VRow>
          </template>
        </BaseCard>
      </VCol>
    </VRow>
    <VRow class="mt-3">
      <VCol cols="12">
        <BaseCard>
          <template v-slot:title>
            Envios por gatilho hoje
          </template>
          <template v-slot:body>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="5"
              class=""
              hide-default-footer
              :options="{ itemsPerPage: -1 }"
              :disable-sort="$vuetify.breakpoint.xsOnly"
            >
            </v-data-table>
          </template>
        </BaseCard>
      </VCol>
    </VRow>
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
      headers: [
        {
          text: 'data',
          sortable: false,
          value: 'date',
        },
        { text: 'Regra', value: 'name' },
        { text: 'Nome', value: 'name' },
        { text: 'Envio', value: '' },
        { text: 'Abertura', value: 'status' },
        { text: 'Clique', value: 'actions' },
      ],
      loadingToday: true,
      loadingMonth: true,
      items: [],
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadingToday = false
      this.loadingMonth = false
    }, 8000)
  },
}
</script>

<style lang="scss" module></style>

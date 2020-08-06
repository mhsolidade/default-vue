<template>
  <Layout>
    <BaseCard>
      <template v-slot:title>
        Envios
      </template>
      <template v-slot:body>
        <VRow justify="space-between">
          <VCol cols="12" sm="12" md="4">
            <samp>Período</samp>
            <VRow class="pa-0 ml-1">
              <BaseDatePicker
                v-model="dateRange"
                :piker="{}"
                class=" mr-3"
                label="Inicio"
              ></BaseDatePicker>
              <BaseDatePicker
                v-model="dateRange"
                label="Fim"
                :piker="{}"
              ></BaseDatePicker>
            </VRow>
          </VCol>
          <VCol cols="12" sm="2" md="2">
            <samp>Agrupar</samp>

            <v-select
              v-model="status"
              :items="status"
              item-text="name"
              item-value="value"
              outlined
            ></v-select>
          </VCol>
          <VCol cols="12" sm="2" md="2">
            <samp>Exibir</samp>
            <v-select
              v-model="status"
              :items="status"
              item-text="name"
              item-value="value"
              outlined
            ></v-select>
          </VCol>
          <VCol cols="12" sm="2" md="2">
            <samp>Regra</samp>
            <v-select
              v-model="status"
              :items="status"
              item-text="name"
              item-value="value"
              outlined
            ></v-select>
          </VCol>
          <VCol align-self="center" class="pb-4">
            <VBtn x-large outlined>Filtrar</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="4">
            <BaseCardDash :loading="loading">
              <template v-slot:subtitle-1>TOTAL DE ENVIOS</template>
              <template v-slot:title>1 Mi</template>
              <template v-slot:subtitle-2>Total: 1.747,480</template>
            </BaseCardDash>
          </VCol>
          <VCol cols="12" sm="4">
            <BaseCardDash :loading="loading">
              <template v-slot:subtitle-1>TOTAL DE ABERTURAS</template>
              <template v-slot:title>46 Mi</template>
              <template v-slot:subtitle-2>Total: 1.747,480</template>
            </BaseCardDash>
          </VCol>
          <VCol cols="12" sm="4">
            <BaseCardDash :loading="loading">
              <template v-slot:subtitle-1>TOTAL DE CLIQUES</template>
              <template v-slot:title>46 Mi</template>
              <template v-slot:subtitle-2>Total: 1.747,480</template>
            </BaseCardDash>
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
      </template>
    </BaseCard>
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
      loading: true,
      items: [],
      dateRange: '',
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 8000)
  },
}
</script>

<style lang="scss" module></style>

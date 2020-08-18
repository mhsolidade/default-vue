<template>
  <Layout>
    <BaseCard>
      <template v-slot:title>
        Envios
      </template>
      <template v-slot:body>
        <VRow justify="space-between">
          <VCol>
            <BaseDatePickerRanger
              v-model="dateRange"
              :piker="{}"
              label="Período"
              outlined
            ></BaseDatePickerRanger>
          </VCol>
          <VCol>
            <v-select
              v-model="status"
              :items="items"
              item-text="name"
              item-value="value"
              label="Agrupar"
              outlined
            ></v-select>
          </VCol>
          <VCol>
            <v-select
              v-model="status"
              :items="items"
              item-text="name"
              item-value="value"
              label="Exibir"
              outlined
            ></v-select>
          </VCol>
          <!-- <VCol >
            <samp>Regra</samp>
            <v-select
              v-model="status"
              :items="status"
              item-text="name"
              item-value="value"
              label="Regra"
              outlined
            ></v-select>
          </VCol> -->
          <VCol>
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
        // { text: 'Regra', value: 'name' },
        { text: 'Nome', value: 'name' },
        { text: 'Envio', value: '' },
        { text: 'Abertura', value: 'status' },
        { text: 'Clique', value: 'actions' },
      ],
      loading: true,
      items: [],
      dateRange: [
        this.$moment()
          .subtract(30, 'days')
          .format('Y-MM-DD'),
        this.$moment().format('Y-MM-DD'),
      ],
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

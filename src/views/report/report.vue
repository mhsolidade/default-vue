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
              v-model="filter.groupBy"
              :items="items.groupBy"
              label="Agrupar"
              item-text="text"
              item-value="v"
              outlined
            ></v-select>
          </VCol>
          <VCol>
            <v-select
              v-model="filter.display"
              :items="items.display"
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
            <VBtn x-large outlined @click="getReport">Filtrar</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="4">
            <BaseCardDash :loading="loading">
              <template v-slot:subtitle-1>TOTAL DE ENVIOS</template>
              <template v-slot:title>
                {{ total | numberToFullNumber }}
              </template>
              <template v-slot:subtitle-2>Total: {{ total || 0 }}</template>
            </BaseCardDash>
          </VCol>
          <VCol cols="12" sm="4">
            <BaseCardDash :loading="loading">
              <template v-slot:subtitle-1>TOTAL DE ABERTURAS</template>
              <template v-slot:title>
                {{ totalOpen | numberToFullNumber }}
              </template>
              <template v-slot:subtitle-2>Total: {{ totalOpen || 0 }}</template>
            </BaseCardDash>
          </VCol>
          <VCol cols="12" sm="4">
            <BaseCardDash :loading="loading">
              <template v-slot:subtitle-1>TOTAL DE CLIQUES</template>
              <template v-slot:title>
                {{ totalClik | numberToFullNumber }}
              </template>
              <template v-slot:subtitle-2>Total: {{ totalClik || 0 }}</template>
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
                  :items="list"
                  :items-per-page="5"
                  class=""
                  hide-default-footer
                  :options="{ itemsPerPage: -1 }"
                  :disable-sort="$vuetify.breakpoint.xsOnly"
                  :loading="loading"
                >
                  <template v-slot:item.open="{ item }">
                    {{ item.open }} ({{ percentage(item.email, item.open) }}%)
                  </template>
                  <template v-slot:item.click="{ item }">
                    {{ item.click }} ({{ percentage(item.open, item.click) }}%)
                  </template>
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
          value: 'day',
        },
        // { text: 'Regra', value: 'name' },
        { text: 'Nome', value: 'channelName' },
        { text: 'Envio', value: 'email' },
        { text: 'Abertura', value: 'open' },
        { text: 'Clique', value: 'click' },
      ],
      list: [],
      loading: true,
      items: {
        groupBy: [
          { text: 'Hora', v: 'hour' },
          { text: 'Data', v: 'daily' },
          { text: 'Mês', v: 'monthly' },
          { text: 'Ano', v: 'yearly' },
        ],
        display: ['Hora', 'Data', 'Mês', 'Ano'],
        rules: [],
      },
      filter: {
        groupBy: 'daily',
        display: '',
        rules: '',
      },
      dateRange: [
        this.$moment()
          .subtract(30, 'days')
          .format('Y-MM-DD'),
        this.$moment().format('Y-MM-DD'),
      ],
      total: null,
      totalOpen: null,
      totalClik: null,
    }
  },
  mounted() {
    this.getReport()
  },
  methods: {
    async getReport() {
      this.loading = true
      this.list = []
      let data = {
        rangeStart: this.dateRange[0],
        rangeEnd: this.dateRange[1],
        groupBy: this.filter.groupBy,
      }
      const repotList = await this.$store.dispatch('report/getReport', data)
      this.list = repotList
      this.total = repotList.reduce((total, num) => {
        return total + Number(num.email)
      }, 0)
      this.totalOpen = repotList.reduce((total, num) => {
        return total + Number(num.open)
      }, 0)
      this.totalClik = repotList.reduce((total, num) => {
        return total + Number(num.click)
      }, 0)
      this.loading = false
    },
    percentage(total, value) {
      if (total > 0 && value > 0) {
        return (total / value).toFixed()
      }
      return 0
    },
  },
}
</script>

<style lang="scss" module></style>

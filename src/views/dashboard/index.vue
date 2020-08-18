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
                  <template v-slot:title>
                    {{ totalEmailLastThirtyDays }}
                  </template>
                  <template v-slot:subtitle-2
                    >Total: {{ totalEmailLastThirtyDays }}</template
                  >
                </BaseCardDash>
              </VCol>
              <VCol cols="6">
                <BaseCardDash :loading="loadingToday">
                  <template v-slot:subtitle-1>Hoje</template>
                  <template v-slot:title>{{ totalEmailToday }} Mi</template>
                  <template v-slot:subtitle-2
                    >Total:{{ totalEmailToday }}</template
                  >
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
              :items="totalTriggers"
              :items-per-page="5"
              class=""
              hide-default-footer
              :options="{ itemsPerPage: -1 }"
              :disable-sort="$vuetify.breakpoint.xsOnly"
            >
              <template v-slot:item.day="{ item }">
                {{ item.day | moment('DD/MM') }}
              </template>
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
        { text: 'Nome', value: 'channelName' },
        { text: 'Envio', value: 'email' },
        { text: 'Abertura', value: 'open' },
        { text: 'Clique', value: 'click' },
      ],
      loadingToday: true,
      loadingMonth: true,
      items: [],
      totalEmailLastThirtyDays: null,
      totalEmailToday: null,
      totalTriggers: [],
    }
  },
  mounted() {
    this.$store.dispatch('report/totalEmailLastThirtyDays').then((resp) => {
      this.totalEmailLastThirtyDays = resp
      this.loadingMonth = false
    })
    this.$store.dispatch('report/totalEmailToday').then((resp) => {
      this.totalEmailToday = resp
      this.loadingToday = false
    })
    this.$store.dispatch('report/totalTriggersToday').then((resp) => {
      this.totalTriggers = resp
      this.loadingToday = false
    })
  },
  methods: {
    percentage(total, value) {
      if (total > 0 && value > 0) {
        return total / value
      }
      return 0
    },
  },
}
</script>

<style lang="scss" module></style>

<template>
  <VRow align="center" justify="center">
    <VCol col="10" sm="12" md="11" justify="center">
      <VCard>
        <VCardText class="pa-5">
          <VCardTitle>Banners </VCardTitle>
          <VCardText>
            <VBtn :to="{ name: 'bannerNew' }">Criar Banner</VBtn>
          </VCardText>
          <v-data-table
            :headers="headers"
            :items="banners"
            :items-per-page="5"
            class=""
            hide-default-footer
            :options="{ itemsPerPage: -1 }"
          >
            <template v-slot:item.periodStart="{ item }">
              {{ item.periodStart | moment('DD/MM/YYYY') }}
            </template>
            <template v-slot:item.periodEnd="{ item }">
              {{ item.periodEnd | moment('DD/MM/YYYY') }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-chip :color="'success'" dark>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'ID',

          sortable: false,
          value: 'id',
        },
        { text: 'Nome', value: 'name' },
        { text: 'Início', value: 'periodStart' },
        { text: 'Fim', value: 'periodEnd' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', sortable: false, value: 'actions' },
      ],
    }
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

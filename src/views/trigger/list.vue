<template>
  <div>
    <VRow align="center" justify="center">
      <VCol col="6" sm="12" md="10" justify="center">
        <VCard>
          <VCardText class="pa-5">
            <VCardTitle>Gatilhos Ativos</VCardTitle>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class=""
              hide-default-footer
              :options="{ itemsPerPage: -1 }"
            >
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
    <VRow align="center" class="mt-5" justify="center">
      <VCol col="6" sm="12" md="10" justify="center">
        <VCard>
          <VCardText class="pa-5">
            <VCardTitle>Gatilhos Inativos</VCardTitle>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class=""
              hide-default-footer
              :options="{ itemsPerPage: -1 }"
            >
              <template v-slot:item.actions>
                <v-chip :color="'success'" dark>
                  Ativar
                </v-chip>
              </template>
            </v-data-table>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'ID',

          sortable: false,
          value: 'id',
        },
        { text: 'Prioridade', value: 'priority' },
        { text: 'Nome', value: 'name' },
        { text: 'Regra', value: 'rule' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', sortable: false, value: 'actions' },
      ],
      desserts: [
        {
          id: 1,
          name: 'Carrinho abandonado',
          priority: 1,
          rule: 'Carrinho abandonado',
          status: 'Ativo',
          actions: null,
        },
        {
          id: 2,
          name: 'Carrinho abandonado',
          priority: 1,
          rule: 'Carrinho abandonado',
          status: 'Ativo',
          actions: null,
        },
      ],
    }
  },
}
</script>

<style lang="scss" module></style>

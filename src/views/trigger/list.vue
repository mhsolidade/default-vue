<template>
  <div>
    <VRow align="center" class="" justify="center">
      <VCol col="6" sm="12" md="10" class="mt-0 pt-0" justify="center">
        <BaseCard>
          <template v-slot:title>
            Gatilhos Ativos
          </template>
          <template v-slot:body>
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
          </template>
        </BaseCard>
      </VCol>
    </VRow>
    <VRow align="center" class="mt-5" justify="center">
      <VCol col="6" sm="12" md="10" justify="center">
        <BaseCard>
          <template v-slot:title>
            Gatilhos inativos
          </template>
          <template v-slot:body>
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
          </template>
        </BaseCard>
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

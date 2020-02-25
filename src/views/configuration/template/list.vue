<template>
  <BaseCard>
    <template v-slot:title>
      <VRow>
        <VCol cols="10" class="headline" justify="center">
          Templates
        </VCol>
      </VRow>
    </template>
    <template v-slot:subtitle>
      <VBtn outlined :to="{ name: 'templateNew' }">Criar Template</VBtn>
    </template>
    <template v-slot:body>
      <v-data-table
        :headers="headers"
        :items="templates"
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
</template>
<script>
export default {
  props: {
    templates: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      checkbox: false,
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Nome',
          value: 'name',
        },

        {
          text: 'Ações',
          sortable: false,
          value: 'actions',
        },
      ],
    }
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

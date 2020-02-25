<template>
  <BaseCard>
    <template v-slot:title>
      <VRow>
        <VCol cols="10" class="headline" justify="center">
          URl's
        </VCol>
      </VRow>
    </template>
    <template v-slot:subtitle>
      <VBtn outlined :to="{ name: 'urlNew' }">Criar Url</VBtn>
    </template>
    <template v-slot:body>
      <v-data-table
        :headers="headers"
        :items="urls"
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
    urls: {
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
          text: 'Link',
          value: 'link',
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

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
          <BaseMenuActions v-slot:links>
            <template>
              <VListItem :to="{ name: 'urlEdit', params: { id: item.id } }"
                ><VListItemTitle>editar</VListItemTitle>
              </VListItem>
              <VListItem @click="sendConfimation(item)"
                ><VListItemTitle>deletar</VListItemTitle>
              </VListItem>
            </template>
          </BaseMenuActions>
        </template>
      </v-data-table>
    </template>
  </BaseCard>
</template>
<script>
import { confirmationMethods, alertMethods } from '@state/helpers'

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
  methods: {
    ...confirmationMethods,
    ...alertMethods,
    sendConfimation(item) {
      this.setConfirmation({
        description: `Confirma a exclusão do Url ${item.name} ?`,
        title: 'Atenção! Antes de remover o url.',
        promise: this.delete,
        params: { item },
      })
    },
    delete({ item }) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('url/deleteUrl', item.id).then((resp) => {
          resolve(null)
          this.newAlert(`deletado com sucesso ${item.name}`)
        })
      })
    },
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

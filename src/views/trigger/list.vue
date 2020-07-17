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
              :items="triggers"
              :items-per-page="5"
              class=""
              hide-default-footer
              :options="{ itemsPerPage: -1 }"
            >
              <template v-slot:item.actions="{ item }">
                <BaseMenuActions v-slot:links>
                  <template>
                    <VListItem
                      :to="{ name: 'themeEdit', params: { id: item.id } }"
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
              :headers="deactivatedheaders"
              :items="deactivatedEngines"
              :items-per-page="5"
              class=""
              hide-default-footer
              :options="{ itemsPerPage: -1 }"
            >
              <template v-slot:item.sort>
                --
              </template>
              <template v-slot:item.status>
                Inativo
              </template>
              <template v-slot:item.actions="{ item }">
                <VBtn
                  text
                  small
                  color="primary"
                  :to="{
                    name: 'triggerNew',
                    params: {
                      engineName: item.name,
                      engineId: item.id,
                    },
                  }"
                  >Ativar</VBtn
                >
              </template>
            </v-data-table>
          </template>
        </BaseCard>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import { confirmationMethods, alertMethods } from '@state/helpers'
export default {
  props: {
    deactivatedEngines: {
      type: Array,
      default: () => [],
      require: true,
    },
    triggers: {
      type: Array,
      default: () => [],
      require: true,
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
        { text: 'Prioridade', value: 'sort' },
        { text: 'Nome', value: 'name' },
        { text: 'Regra', value: 'engineName' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', sortable: false, value: 'actions' },
      ],
      deactivatedheaders: [
        {
          text: 'ID',
          sortable: false,
          value: 'id',
        },
        { text: 'Prioridade', sortable: false, value: 'sort' },
        { text: 'Nome', value: 'name' },
        { text: 'Regra', value: 'name' },
        { text: 'Status', sortable: false, value: 'status' },
        { text: 'Ações', sortable: false, value: 'actions' },
      ],
    }
  },
  methods: {
    ...confirmationMethods,
    ...alertMethods,
    sendConfimation(item) {
      this.setConfirmation({
        title: 'Atenção! Antes de remover o Gatilho.',
        description: `Confirma a exclusão do Gatilho ${item.name}?`,
        promise: this.delete,
        params: { item },
      })
    },
    delete({ item }) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('theme/deleteTheme', item.id).then((resp) => {
          resolve(null)
          this.newAlert(`deletado com sucesso ${item.name}`)
        })
      })
    },
  },
}
</script>

<style lang="scss" module></style>

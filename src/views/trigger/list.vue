<template>
  <div>
    <VRow align="center" class="" justify="center">
      <VCol col="6" sm="12" md="10" class="mt-0 pt-0" justify="center">
        <BaseCard>
          <template v-slot:title>
            Gatilhos Ativos
          </template>
          <template v-slot:body>
            <v-skeleton-loader
              ref="skeleton"
              :loading="loading"
              type="table-tbody"
              class="mx-auto"
            >
              <v-data-table
                :headers="headers"
                :items="triggers"
                :items-per-page="5"
                class=""
                hide-default-footer
                :options="{ itemsPerPage: -1 }"
                :disable-sort="$vuetify.breakpoint.xsOnly"
              >
                <template v-slot:item.actions="{ item }">
                  <BaseMenuActions v-slot:links>
                    <template>
                      <VListItem
                        :to="{
                          name: 'triggerEdit',
                          params: { triggerId: item.id },
                        }"
                        ><VListItemTitle>editar</VListItemTitle>
                      </VListItem>
                      <VListItem @click="openEmailTest(item)"
                        ><VListItemTitle>Envio de Teste</VListItemTitle>
                      </VListItem>
                      <VListItem @click="sendConfimation(item)"
                        ><VListItemTitle>Desativar</VListItemTitle>
                      </VListItem>
                    </template>
                  </BaseMenuActions>
                </template>
              </v-data-table>
            </v-skeleton-loader>
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
            <v-skeleton-loader
              ref="skeleton"
              :loading="loading"
              type="table-tbody"
              class="mx-auto"
            >
              <v-data-table
                :headers="deactivatedheaders"
                :items="deactivatedEngines"
                :items-per-page="5"
                class=""
                hide-default-footer
                :options="{ itemsPerPage: -1 }"
                :disable-sort="$vuetify.breakpoint.xsOnly"
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
            </v-skeleton-loader>
          </template>
        </BaseCard>
      </VCol>
    </VRow>
    <TriggerSendEmailTest
      v-if="!!emailTest"
      v-model="emailTest"
      :trigger="selectTrigger"
    ></TriggerSendEmailTest>
  </div>
</template>

<script>
import {
  confirmationMethods,
  alertMethods,
  tiggerMethods,
} from '@state/helpers'
import TriggerSendEmailTest from './trigger-send-email-test.vue'

export default {
  components: {
    TriggerSendEmailTest,
  },
  data() {
    return {
      emailTest: false,
      loading: false,
      selectTrigger: null,
      deactivatedEngines: [],
      triggers: [],
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
  created() {
    this.loading = true
    this.getDisabledEnabledTriggers()
      .then((resp) => {
        const { triggers, disabledEngines } = resp
        this.deactivatedEngines = disabledEngines
        this.triggers = triggers
        this.loading = false
      })
      .catch((error) => {
        this.loading = false
        console.log(error)
      })
  },
  methods: {
    ...tiggerMethods,
    ...confirmationMethods,
    ...alertMethods,
    sendConfimation(item) {
      this.setConfirmation({
        title: 'Atenção! Antes de desativar o Gatilho.',
        description: `Confirma a desativar do Gatilho ${item.name}?`,
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
    openEmailTest(item) {
      this.selectTrigger = item
      this.emailTest = true
    },
  },
}
</script>

<style lang="scss" module></style>

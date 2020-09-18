<template>
  <BaseCard>
    <template v-slot:title>
      <VRow>
        <VCol cols="10" sm="8" class="headline" justify="center">
          Banners
        </VCol>
        <VCol cols="2" sm="4" class="headline" align-self="center">
          <VCheckbox
            v-model="showInactive"
            hide-details
            class="ma-0 pa-0"
            :label="`Exibir inativos`"
          ></VCheckbox>
        </VCol>
      </VRow>
    </template>
    <template v-slot:subtitle v-if="'editBanners' in permission">
      <VBtn outlined :to="{ name: 'bannerNew' }">Criar Banner</VBtn>
    </template>
    <template v-slot:body>
      <v-data-table
        :headers="headers"
        :items="filterBanners"
        :items-per-page="5"
        class=""
        hide-default-footer
        :options="{ itemsPerPage: -1 }"
        :disable-sort="$vuetify.breakpoint.xsOnly"
      >
        <template v-slot:item.startDate="{ item }">
          {{ item.startDate | moment('DD/MM/YYYY') }}
        </template>
        <template v-slot:item.endDate="{ item }">
          {{ item.endDate | moment('DD/MM/YYYY') }}
        </template>
        <template v-slot:item.actions="{ item }">
          <BaseMenuActions v-slot:links>
            <template>
              <VListItem
                :to="{ name: 'bannerEdit', params: { bannerId: item.id } }"
                ><VListItemTitle>{{
                  'editBanners' in permission ? 'editar' : 'visualizar'
                }}</VListItemTitle>
              </VListItem>
              <VListItem
                @click="sendConfimation(item)"
                v-if="'editBanners' in permission"
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
import { confirmationMethods, alertMethods, authComputed } from '@state/helpers'

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
      showInactive: false,
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        { text: 'Nome', value: 'name' },
        { text: 'Início', value: 'startDate' },
        { text: 'Fim', value: 'endDate' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', sortable: false, value: 'actions' },
      ],
    }
  },
  computed: {
    ...authComputed,
    filterBanners() {
      return this.banners.filter((item) => {
        if (this.showInactive) return item.status !== 'enabled'
        return item.status === 'enabled'
      })
    },
  },
  methods: {
    ...confirmationMethods,
    ...alertMethods,
    sendConfimation(item) {
      this.setConfirmation({
        description: `Confirma a exclusão do banner ${item.name} ?`,
        title:
          'Atenção! Antes de remover o banner, confira se as referências foram removidas dos templates.',
        promise: this.delete,
        params: { item },
      })
    },
    delete({ item }) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('banner/deleteBanner', item.id).then((resp) => {
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

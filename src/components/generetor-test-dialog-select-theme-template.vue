<template>
  <VDialog
    v-model="showDialog"
    scrollable
    :overlay="false"
    :max-width="!!preview ? '700px' : '600px'"
    :width="!!preview ? 'auto' : 'auto' "
    :min-width="!!preview ? '' : 'auto' "
  >
    <VCard>
      <VBtn small absolute top right fab text class="mt-5" @click="showDialog = !showDialog">
        <v-icon>mdi-close</v-icon>
      </VBtn>
      <template v-if="!preview">
        <VCardText class="py-5 mt-5">
          <VSpacer></VSpacer>
          <span>{{label}}</span>
          <VSelect
            v-model="select"
            no-data-text="Lista indisponível"
            hide-details
            :items="items"
            return-object
            item-text="name"
            item-value="id"
            outlined
          ></VSelect>
        </VCardText>

        <VCardActions class="pa-5 ml-1">
          <VBtn outlined :disabled="!select" @click="setHtml">Gerar Teste</VBtn>
        </VCardActions>
      </template>
      <VCardText v-else>
        <VSheet class="mt-5" min-height="300" min-width="600">
          <div v-html="html"></div>
        </VSheet>
      </VCardText>
    </VCard>
  </VDialog>
</template>
<script>
import { themeMethods, templateMethods } from '@state/helpers'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    type: {
      type: String,
      validator: (val) => ['theme', 'template'].includes(val),
      default: 'theme',
      required: true,
    },
    theme: {
      type: Object,
      default: () => {},
    },
    template: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: true,
      select: null,
      items: [],
      html: '',
      preview: false,
    }
  },
  computed: {
    label() {
      if (this.type !== 'theme') return 'Selecione um tema'
      return 'Selecione um Template'
    },
    showDialog: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  async created() {
    if (this.type === 'theme') this.items = await this.fetchTemplates()
    if (this.type === 'template') this.items = await this.fetchThemes()
  },
  methods: {
    ...themeMethods,
    ...templateMethods,
    setHtml() {
      if (this.type === 'theme') {
        this.html += this.theme.htmlHeader
        this.html += this.select.html
        this.html += this.theme.htmlFooter
      } else {
        this.html += this.select.htmlHeader
        this.html += this.template.html
        this.html += this.select.htmlFooter
      }
      this.preview = true
    },
  },
}
</script>

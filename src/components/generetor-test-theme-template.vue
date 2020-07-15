<template>
  <div>
    <VBtn block outlined @click="showDialog = !showDialog">Gerar Teste</VBtn>
    <GeneretorTestDialogSelectThemeTemplate
      v-if="showDialog"
      v-model="showDialog"
      :type="type"
      :theme="theme"
      :template="template"
    ></GeneretorTestDialogSelectThemeTemplate>
  </div>
</template>
<script>
import GeneretorTestDialogSelectThemeTemplate from '@components/generetor-test-dialog-select-theme-template.vue'
export default {
  components: {
    GeneretorTestDialogSelectThemeTemplate,
  },
  props: {
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
      showDialog: false,
    }
  },
  computed: {
    type() {
      if (!this.$_.isEmpty(this.theme)) return 'theme'
      if (!this.$_.isEmpty(this.template)) return 'template'
      return ''
    },
  },
}
</script>

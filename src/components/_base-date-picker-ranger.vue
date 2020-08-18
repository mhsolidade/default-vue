<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="computedDateFormatted"
        v-bind="$attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      range
      locale="pt-br"
      v-bind="$attrs.picker || null"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">
        Selecionar
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      dateFormatted: this.formatDate(this.value),
      menu: false,
    }
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date).join(' ~ ')
    },
    date: {
      get() {
        return this.value
      },
      set(newValue) {
        this.dateFormatted = this.formatDate(newValue)
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    formatDate(dates) {
      if (dates.length === 0) return []
      return dates.map((date) => {
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      })
    },
    parseDate(dates) {
      if (dates.length === 0) return []
      return dates.map((date) => {
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      })
    },
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

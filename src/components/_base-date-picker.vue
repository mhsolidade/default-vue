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
        v-model="dateFormatted"
        v-bind="$attrs"
        v-on="on"
      ></v-text-field>
      <!-- @blur="date = parseDate(dateFormatted)" -->
    </template>
    <v-date-picker
      v-model="date"
      no-title
      locale="pt-br"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
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
      return this.formatDate(this.date)
    },
    date: {
      get() {
        return this.value.split(' ')[0]
      },
      set(newValue) {
        this.dateFormatted = this.formatDate(newValue)
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split(' ')[0].split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
<style lang="scss" module>
@import '@design';
</style>

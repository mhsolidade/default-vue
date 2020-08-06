<template>
  <div class="text-center">
    <VDialog v-model="localValue" min-width="600" width="800">
      <VCard class="pa-5">
        <VBtn
          small
          absolute
          top
          right
          text
          fab
          class="mt-5"
          @click="localValue = !localValue"
        >
          <v-icon>mdi-close</v-icon>
        </VBtn>
        <VCardTitle>
          <h3 class="font-weight-regular">
            Insira abaixo até 10 e-mails para receberem o teste.
          </h3>
          <p class="mt-2 body-2 font-weight-regular">
            Para enviar mais de um teste por vez, Basta separar os endereços
            usando ponto e vírgula. Exemplo:
            user1@email.com;user2@email.com;user3@email.com
          </p>
        </VCardTitle>
        <VCardText>
          <VTextarea
            v-model="emails"
            rows="5"
            row-height="30"
            label="Lista de emails"
            name="name"
            textarea
          ></VTextarea>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn outlined @click="sendTest">Enviar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    trigger: {
      type: Object,
      default: () => {
        return {}
      },
      required: true,
    },
  },
  data() {
    return {
      emails: '',
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    async sendTest() {
      await this.$store.dispatch('trigger/sendTestToEmails', {
        triggerId: this.trigger.id,
        listEmails: this.emails,
      })
    },
  },
}
</script>

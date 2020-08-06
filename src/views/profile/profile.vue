<template>
  <Layout>
    <VRow align="stretch" justify="center">
      <VCol cols="12" sm="6" md="6" class="py-0">
        <BaseCard :card="{ height: '100%' }">
          <template v-slot:title>
            Informações do usuário
          </template>
          <template v-slot:body>
            <VForm ref="formBaseInfo" v-model="baseInfo.valid">
              <samp>Nome</samp>
              <VTextField
                v-model="user.name"
                :rules="rules.name"
                counter="20"
                outlined
                required
              ></VTextField>
              <samp>Email</samp>
              <VTextField
                v-model="user.email"
                :rules="rules.email"
                outlined
                required
                @input="error.email = false"
              ></VTextField>
              <v-btn
                :absolute="$vuetify.breakpoint.smAndUp"
                :bottom="$vuetify.breakpoint.smAndUp"
                :left="$vuetify.breakpoint.smAndUp"
                outlined
                @click="saveBaseInfo"
              >
                Atualizar
              </v-btn>
            </VForm>
          </template>
        </BaseCard>
      </VCol>
      <VCol cols="12" sm="6" md="6" class="py-0">
        <VForm ref="formPassword" v-model="passwords.valid">
          <BaseCard :card="{ height: '100%' }">
            <template v-slot:title>
              Alterar senha
            </template>
            <template v-slot:body>
              <samp>Senha atual</samp>
              <VTextField
                v-model="passwords.currentPassword"
                value="password"
                outlined
                :rules="rules.currentPassword"
                required
                type="password"
                autocomplete="false"
                @input="error.currentPassword = false"
              ></VTextField>
              <span>Nova senha</span>
              <VTextField
                v-model="passwords.password"
                value="password"
                outlined
                :rules="rules.newPassword"
                required
                validateOnBlur
                type="password"
                autocomplete="false"
              ></VTextField>
              <span>Confirmação da nova senha</span>
              <VTextField
                v-model="passwords.passwordConfirmation"
                value="password"
                outlined
                :rules="rules.confirmationPassword"
                required
                validateOnBlur
                type="password"
                autocomplete="false"
              ></VTextField>
              <v-btn class="mb-4" outlined @click="savePassword">
                Atualizar senha
              </v-btn>
            </template>
          </BaseCard>
        </VForm>
      </VCol>
    </VRow>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'
import { authMethods, alertMethods } from '@state/helpers'

export default {
  components: {
    Layout,
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      },
      required: true,
    },
  },
  data() {
    return {
      baseInfo: {
        valid: true,
      },
      passwords: {
        editPassword: false,
        valid: true,
        currentPassword: '',
        password: '',
        passwordConfirmation: '',
      },
      error: {
        currentPassword: false,
        email: false,
      },
      rules: {
        name: [(v) => !!v || 'O nome é obrigatório'],
        email: [
          (v) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Email inválido.'
          },
          (v) => {
            return !this.error.email || 'Email já em uso.'
          },
        ],
        currentPassword: [
          (v) => !!v || 'A senha atual é obrigatória',
          (v) => !this.error.currentPassword || 'Senha Inválida',
        ],
        newPassword: [
          (v) => !!v || 'A senha atual é obrigatória',
          (v) => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres',
        ],
        confirmationPassword: [
          (v) => !!v || 'A confirmação é obrigatória',
          (v) => v === this.passwords.password || 'Deve ser igual a nova senha',
        ],
      },
    }
  },
  methods: {
    ...authMethods,
    ...alertMethods,
    async savePassword() {
      if (this.$refs.formPassword.validate()) {
        const {
          currentPassword,
          password,
          passwordConfirmation,
        } = this.passwords
        try {
          await this.changePassword({
            currentPassword,
            password,
            passwordConfirmation,
          })
          this.newAlert(`Senha alterada com sucesso`)
        } catch (error) {
          if (Object.prototype.hasOwnProperty.call(error, 'currentPassword')) {
            this.error.currentPassword = true
            this.$refs.formPassword.validate()
          }
        }
      }
    },
    async saveBaseInfo() {
      if (this.$refs.formBaseInfo.validate()) {
        try {
          await this.updatedBaseInfo({
            name: this.user.name,
            email: this.user.email,
          })
          this.newAlert(`Dados do usuário atualizados com sucesso`)
        } catch (error) {
          if (Object.prototype.hasOwnProperty.call(error, 'email')) {
            this.error.email = true
            this.$refs.formBaseInfo.validate()
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" module></style>

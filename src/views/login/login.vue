<template>
  <div>
    <VCardText class="text-center">
      <h1 class="title">Faça o seu login</h1>
    </VCardText>
    <VCardText>
      <VForm ref="form" @submit.prevent="tryToLogIn">
        <VRow class="px-2">
          <VCol col="12">
            <VRow>
              <VTextField
                v-model="username"
                label="E-mail"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                required
                :rules="rules.required"
                :error="authError"
              />
            </VRow>
            <VRow>
              <VTextField
                v-model="password"
                label="Senha"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                :rules="rules.required"
                :error="authError"
              />
            </VRow>
            <p v-if="authError" class="red--text pl-4">
              Usuário ou senha inválido
            </p>
          </VCol>
        </VRow>
        <VRow class="px-2">
          <VCol col="6" sm="8" md="6" align-self="end">
            <VRow>
              <RouterLink :to="{ name: 'recover' }">
                Esqueci minha senha
              </RouterLink>
            </VRow>
          </VCol>
          <VCol col="6" sm="8" md="6">
            <VRow align="center" justify="end">
              <VBtn type="submit" :loading="tryingToLogIn" rigth>Entrar</VBtn>
            </VRow>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </div>
</template>

<script>
import { authMethods } from '@state/helpers'

export default {
  components: {},
  data() {
    return {
      username: 'mhsolidade@gmail.com',
      password: 'S123456',
      authError: false,
      logError: '',
      tryingToLogIn: false,
      rules: {
        required: [(v) => !!v || `Preencha corretamente`],
      },
    }
  },
  methods: {
    ...authMethods,
    tryToLogIn() {
      this.authError = false
      if (!this.$refs.form.validate()) return
      this.tryingToLogIn = true
      this.logIn({
        username: this.username,
        password: this.password,
      })
        .then((success) => {
          if (success) {
            this.tryingToLogIn = false
            console.log('opa')
            this.$router.push(
              this.$route.query.redirectFrom || { name: 'dashboard' }
            )
          }
        })
        .catch((error) => {
          console.log('error', error)
          this.tryingToLogIn = false
          this.authError = true
          this.logError = error
        })
    },
  },
}
</script>

<style lang="scss" module></style>

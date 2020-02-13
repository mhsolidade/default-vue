<template>
  <Layout>
    <VCardText class="text-center">
      <h1 class="title">Faça o seu login</h1>
    </VCardText>
    <VCardText>
      <VForm>
        <VRow class="px-2">
          <VCol col="12">
            <VRow>
              <VTextField
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              />
            </VRow>
            <VRow>
              <VTextField
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </VRow>
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
              <VBtn rigth>Entrar</VBtn>
            </VRow>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </Layout>
</template>

<script>
import Layout from '@layouts/login.vue'

export default {
  components: {
    Layout,
  },
}
</script>

<style lang="scss" module></style>

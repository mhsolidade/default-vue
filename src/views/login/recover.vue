<template>
  <div>
    <VCardText>
      <h1 class="title text-center">Resetar senha</h1>
      <p>
        Insira seu email de acesso e receba as instruções para redefinição de
        senha
      </p>
    </VCardText>
    <VCardText>
      <VForm>
        <VRow class="px-2">
          <VCol col="12">
            <VRow>
              <VTextField
                label="Email"
                name="Email"
                prepend-icon="mdi-account"
                type="text"
              />
            </VRow>
          </VCol>
        </VRow>
        <VRow class="px-2">
          <VCol col="12" sm="10" md="10" align-self="end">
            <VRow>
              <RouterLink :to="{ name: 'login' }">
                Sabe sua senha? Clique aqui para entrar.
              </RouterLink>
            </VRow>
          </VCol>
          <VCol col="6" sm="2" md="2">
            <VRow align="center" justify="end">
              <VBtn rigth>Enviar</VBtn>
            </VRow>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </div>
</template>

<script>
export default {
  created() {
    console.log('recover')
  },
}
</script>

<style lang="scss" module></style>

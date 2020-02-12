<template>
  <Layout>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-text class="text-center">
            <h1 class="title">Faça o seu login</h1>
          </v-card-text>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'

export default {
  components: {
    Layout,
  },
}
</script>

<style></style>

<template>
  <div class="body">
    <v-card
      elevation="10"
      rounded="xl"
      max-width="25%"
      max-height="50%"
      color="#D5EAFF"
      align-self="center"
      class="card-login"
      min-width="250px"
      min-height="350px"
    >
      <v-row class="justify-center">
        <h2 class="mt-5 mb-5 text-truncate">Seja Bem-Vindo!</h2>
      </v-row>
      <v-col cols="12" align-self="center" class="d-flex justify-center">
        <v-col cols="10">
          <v-text-field
            outlined
            label="Usuário"
            prepend-inner-icon="mdi-account"
            :error="error.login"
            clearable
            rounded
            @input="clearError('login')"
          ></v-text-field>
          <v-text-field
            outlined
            label="Senha"
            prepend-inner-icon="mdi-lock"
            :error="error.password"
            type="password"
            @input="clearError('password')"
            rounded
          ></v-text-field>
        </v-col>
      </v-col>

      <v-row justify="space-around">
        <v-btn
          rounded
          color="primary"
          class="mb-5"
          :loading="loading"
          @click="login()"
        >
          Entrar
        </v-btn>
        <v-btn rounded color="primary" class="mb-5" :disabled="loading">
          Inscreva-se!
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      login: "",
      password: "",
    },
    error: {
      login: false,
      password: false,
    },
    loading: false,
  }),
  mounted() {},
  methods: {
    _toast: function(_message, _type) {
      this.$toast.open({
        message: _message,
        type: _type,
        position: "top-right",
      });
    },
    regexTypes: function() {
      return [null, undefined, ""];
    },
    clearError: function(prop) {
      this.error[prop] = false;
    },
    validInputs: function(form) {
      var valid = true;
      for (const key in form) {
        const element = form[key];
        if (this.regexTypes().includes(element)) {
          this.error[key] = true;
          valid = false;
        }
      }
      return valid;
    },
    login: function() {
      if (!this.validInputs(this.form)) {
        this._toast('O campo Usuário e Senha são obrigatórios."', "error");
        return false;
      }
      this.loading = true;
    },
  },
};
</script>

<style>
.card-login {
  margin-top: 15%;
  margin-left: 15%;
  margin: 300px auto;
}
</style>

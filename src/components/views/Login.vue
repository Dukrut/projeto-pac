<template>
  <div class="body overflow-hidden">

    <div class="row">
      <div class="col-4 d-flex justify-content-center align-middle card-login">
        <b-card
          img-top
          tag="article"
          style="max-width: 18rem"
          class="mb-2"
        >
          <!-- Label do texto de boas vindas -->
          <div class="mb-2 text-center">
           <h3>
              {{ card_title }}
            </h3>
          </div>

          <!--Ícone de avatar -->
          <div class="mb-2 justify-content-center align-middle text-center">
            <b-icon  icon="person-circle" font-scale="4"></b-icon>
            <i class="fas fa-ad"></i>
          </div>

          <!-- Campos de login e senha -->
          <b-card-text>
            <div>
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="form.email" @input="clearError('email')" :state="valid.email" type="email" class="form-control-sm" placeholder="E-mail"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="form.password" @input="clearError('password')" :state="valid.password" type="password" class="form-control-sm" placeholder="Senha"></b-form-input>
              </b-input-group>
            </div>
          </b-card-text>

          <!-- Botões -->
          <div class="row justify-content-center mt-4">
            <b-button class="col-5 btn-login text-center" :pill="true" @click="login()" :disabled="loading">
              <span v-if="!loading">Entrar<b-icon icon="arrow-bar-right"></b-icon></span>
              <b-spinner v-else></b-spinner>
            </b-button>
          </div>

        </b-card>
      </div>
      <div class="col-8 d-flex justify-content-center align-middle card-login">
        <b-card>
          <img src="../../../public/images/math.png"  alt="">
        </b-card>
      </div>

    </div>

  </div>
</template>

<script>
export default {

  data: () => ({
    card_title: "Seja Bem-Vind@!",
    form: {
      email: "",
      password: ""
    },
    valid: {
      email: null,
      password: null,
    },
    loading: false,
    authenticated: false,
  }),
  methods: {
    _toast: function(_message, _type){
      this.$toast.open({
        message: _message,
        type: _type,
        position: "top-right",
      })
    },
    regexTypes: function() {
      return [null, undefined, ""]
    },
    clearError: function(prop){
      this.valid[prop] = null
    },
    validInputs: function(form) {
      var valid = true
      var list_fields = []
      for (const key in form) {
        const element = form[key]
        if (this.regexTypes().includes(element)){
          list_fields.push(key)
          this.valid[key] = false
          valid = false
        }
      }

      var message = (list_fields.length > 1) ? "Os campos " : "O campo"
      list_fields.forEach(element => {
          if(element == "email")
            message += "<b> e-mail </b>,"
          else
            message += "<b> senha </b>,"
      })

      message = message.substring(0, message.length - 1)

      if (message.includes("e-mail") && message.includes("senha"))
        message = message.replace(",", "e");

      message += (list_fields.length > 1) ? "são obrigatórios. " : "é obrigatório."

      if(!valid)
        this._toast(message, "error")

      return valid
    },
    login: function() {
      if (!this.validInputs(this.form))
        return false

      this.loading = true

      var json = {
        login: this.form.email,
        password: this.form.password,
        token: ""
      }
      this.$axios({
        method: "POST",
        url: "http://localhost:8000/login",
        data: json
      }).then((response) => {
        if (response.status == 200)
          this.$router.push({ name: 'Sistema', params: {user: response.data}})
      }).catch((error) => {
        console.error("ERRO = ", error);
        this._toast("E-mail ou senha incorreto, verifique e tente novamente.", "error")
      }).finally(() =>{
        setTimeout(() => {
          this.loading = false;
        }, 500)
      });

    }
  }
}
</script>

<style>
  .card-login{
    height: 100vh;
    align-items: center
  }
  .card-img{
    height: 100vh;
    align-items: center
  }
  .avatar{
    border: solid black 1px;
    background-color: #F0F8FF
  }
  .btn-login{
    background-color: #1A526B !important;
    height: 45px !important;
  }
  .btn-login:hover{
    background-color: #E4EFFF !important;
    color: black !important;
  }
</style>

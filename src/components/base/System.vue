<template>
  <div class="body">
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "./Navbar"

export default {
  components:{
    Navbar
  },
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

      var _this = this;
      var user_data = {
        login: _this.form.email,
        password: _this.form.password,
        token: ""
      }

      this.$axios({
        method: "POST",
        url: "http://localhost:8000/login",
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*',
          'Access-Control-Allow-Origin': "*"
        },
        data: user_data,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
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

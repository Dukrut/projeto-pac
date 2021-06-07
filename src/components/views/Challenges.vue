<template>
  <div class="body p-4">

    <h3><b-icon icon="tv"></b-icon> Desafios</h3>
    <small>Você já completou 30 de 100 desafios essa semana.</small>
    <hr>

    <div class="col-12 d-flex justify-content-center align-middle h-50">
      <img src="../../../public/images/questions.png" class="rounded-3"  alt="">
    </div>

    <b-form-group label="Selecione o nível de dificuldade">
      <b-form-radio value="A">Fácil</b-form-radio>
      <b-form-radio value="B">Médio</b-form-radio>
      <b-form-radio value="C">Difícil</b-form-radio>
   </b-form-group>

   <div class="w-100 text-center">
     <b-button class="buttons w-25 mt-4">Iniciar Desafios</b-button>
   </div>

  </div>
</template>

<script>
// import Navbar from "./base/Navbar"

export default {
  components:{
  },
  data: () => ({

  }),
  methods: {
  }
}
</script>

<style>

  .nav-buttons{
    background-color: #D5EAFF;
  }
  .buttons{
    background-color: #1A526B !important;
  }
</style>

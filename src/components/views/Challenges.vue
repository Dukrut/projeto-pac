<template>
  <div class="p-4">

    <h3><b-icon icon="tv"></b-icon> Desafios</h3>
    <hr>

    <div v-if="!started">
      <h5>Olá <b>{{user.name}}</b>, você já completou 30 de 100 desafios.</h5>
      <div class="col-12 d-flex justify-content-center align-middle h-25">
        <img src="../../../public/images/questions.svg" class="rounded-3" style="height:62.4vh" alt="">
      </div>

      <b-form-group label="Selecione o nível de dificuldade" v-model="level">
        <b-form-radio value="1" v-model="level">&nbsp;Fácil</b-form-radio>
        <b-form-radio value="2" v-model="level">&nbsp;Médio</b-form-radio>
        <b-form-radio value="3" v-model="level">&nbsp;Difícil</b-form-radio>
     </b-form-group>

     <div class="w-100 text-center">
       <b-button class="buttons w-25 mt-4" @click="startChallenges()">Iniciar Desafios</b-button>
     </div>
  </div>

  <div v-else>
    <h5 v-if="key == 0">Boa sorte <b>{{user.name}}</b>! Preste muita atenção nas perguntas para responde-las corretamente.</h5>
    <div class="d-flex flex-column bd-highlight mb-3 overflow-auto">
      <div class="p-1 bd-highlight">
        <span>{{ key + 1 }}. <strong>Descrição</strong>: {{ challenges[key].description }}</span>
      </div>
      <div class="p-1 bd-highlight">
        <span><strong>Selecione a alternativa correta</strong>:</span>
        <b-form-radio-group
                v-model="answer[key]"
                :options="challenges[key].options"
                :name="answer[key]"
                inline
        ></b-form-radio-group>
      </div>

      <hr>
    </div>
    <div class="d-flex justify-content-center align-middle h-50">
      <b-button class="buttons mt-4" @click="backQuestion()"><b-icon icon="arrow-left-square"></b-icon> Voltar pergunta</b-button>
      <b-button v-if="key != 4" class="buttons mx-2 mt-4" @click="nextQuestion()">Próxima pergunta <b-icon icon="arrow-right-square"></b-icon></b-button>
      <b-button v-else class="buttons mx-2 mt-4" @click="nextQuestion()">Enviar respostas <b-icon icon="check-circle"></b-icon></b-button>
    </div>
    <div v-if="regexTypes().includes(answer[4])" class="d-flex justify-content-center align-middle w-100 timer">
      <h1><b-icon icon="stopwatch"></b-icon> Tempo restante:<span class="ml-4" :style="'color:'+color">{{ time }}</span></h1>
    </div>
    <div v-if="key == 4 && !regexTypes().includes(answer[4])" class="align-middle">
      <h2>GABARITO</h2>
      <p v-for="ans,index in answer"  :key="index"><strong>{{ index+1 }}</strong>. {{ answer[index]}}</p>
      <h3><b-icon icon="stopwatch"></b-icon> Tempo total:<span class="ml-4" :style="'color:'+color">{{ time }}</span></h3>
    </div>
  </div>

  </div>
</template>

<script>

export default {
  props:{
    user: {}
  },

  data: () => ({
    level: 1,
    started: false,
    challenges: [],
    answer: [null, null, null, null, null],
    time: "",
    color: "green",
    key: 0
  }),

  mounted() {
    setInterval(() => {
      this.timeChallenge()
    }, 1000);
  },

  methods: {

    getChallenges: function() {
      const service = this
      service.time = "10:00"
      service.$axios({
        method: "GET",
        url: "http://localhost:8000/questions/level/" + parseInt(service.level),
      }).then((response) => {
        let questions = response.data 
        if (!questions.length) {
          service._toast("Não há questões desse nível cadastradas no banco de questões, acione o seu professor!", "error")  
        }
        for (let index in questions) {
          let question = questions[index]
          let challenge = {
            title: null,
            description: null,
            correct: null,
            options: []
          }
          challenge.title = question.title
          challenge.description = question.description
          challenge.correct = question.correctResponse
          for (let index in question.alternatives) {
            let alternative = question.alternatives[index]
            challenge.options.push(alternative.description)
          }
          service.challenges.push(challenge)
        }
      }).catch((error) => {
        console.error(error)
        service._toast("Erro ao requisitar informações do servidor", "error")
      })
    },

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

    startChallenges: function(){
      this.started = true;
      this.getChallenges();
    },

    nextQuestion: function(){
      if(this.key == 4)
        return false

      if (this.regexTypes().includes(this.answer[this.key])) {
        this._toast("Selecione uma resposta antes de ir para a próxima pergunta", "error")
        return false;
      }

      this.key++
    },

    backQuestion: function(){
      if(this.key == 0)
        return false
      this.key--
    },

    timeChallenge(){
      if(!this.started || this.key == 4)
        return false

      var aux = this.time.split(":")
      var minute = parseInt(aux[0])
      var seconds = parseInt(aux[1])

      seconds--;

      if(seconds == -1){
        minute--
        seconds = 59;
      }

      if(minute > 5)
        this.color = "green"
      else if(minute <= 5 && minute >= 3)
        this.color = "orange"
      else
        this.color = "red"


      if(minute < 10)
        minute = "0" + String(minute)

      if(seconds < 10)
        seconds = "0" + String(seconds)

      this.time = minute + ":" + seconds;
    }

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

  .timer{
    margin-top: 10%;
  }
</style>

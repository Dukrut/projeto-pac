<template>
  <div class="p-4">

    <h3><b-icon icon="tv"></b-icon> Desafios</h3>
    <hr>

    <div v-if="!started">
      <h5>Olá <b>{{user.name}}</b>! É muito bom te ver aqui!</h5>
      <div class="w-100 text-center">
        <h3 for="">Selecione nível de dificuldade para iniciar os desafios.</h3>
        
        <b-form-group>
          <b-form-radio-group
            id="radio-group-1"
            v-model="level"
            :options="options"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>

        <div class="col-12 d-flex justify-content-center align-middle h-25">
          <img src="../../../public/images/questions.svg" class="rounded-3" style="height:62.4vh" alt="">
        </div>
        
        <b-button class="buttons w-25 mt-4" @click="startChallenges()">Iniciar Desafios</b-button>
      </div>
    </div>

    <div v-else class="w-100">
      <div class="row">
        <div class="col-8">
          <div class="p-1">
            <span>{{ labelAlternative(key) }}. <strong>Descrição da questão</strong></span><br>
            <p class="ml-4"> {{ challenges[key].description }} </p>
          </div>
          
          <div class="p-1">
            <span><strong>Selecione a alternativa correta</strong>:</span>
            <b-form-radio-group
                  v-model="answer[key]"
                  :options="challenges[key].options"
                  :name="answer[key]"
            ></b-form-radio-group>
          </div>
          <hr>  
        <div class="d-flex justify-content-center align-middle h-50">
          <b-button class="buttons mt-4 btn" @click="backQuestion()" style="height:38px" :disabled="key == 0"><b-icon icon="arrow-left-square"></b-icon> Voltar pergunta</b-button>
          <b-button v-if="key != 4" class="buttons btn mx-2 mt-4" style="height:38px" @click="nextQuestion()" :disabled="regexTypes().includes(answer[key])">Próxima pergunta <b-icon icon="arrow-right-square"></b-icon></b-button>
          <b-button v-else class="buttons mx-2 mt-4 btn" style="height:38px" @click="nextQuestion()">Enviar respostas <b-icon icon="check-circle"></b-icon></b-button>
        </div>
        </div>
        <div class="col-4 border-left div-left p-2">
          <div v-if="regexTypes().includes(answer[4])" class="d-flex justify-content-center align-middle w-100 timer">
            <h1><b-icon icon="stopwatch"></b-icon> Tempo restante:<span class="ml-4" :style="'color:'+color">{{ time }}</span></h1>
          </div>
          <hr>
          <div class="ml-3 p-2">
            <h3 class="text-center mt-3">Perguntas respondidas</h3>
            <div v-for="ans,index in answer"  :key="index" class="row mt-3">
              <strong>{{ index+1 }}</strong>.
              <div class="ml-3 p-2 rounded border" :style="'background-color:' + (regexTypes().includes(answer[index]) ? 'orange' : 'green') + '; width:25px'"/>
              <div class="ml-3">
                <span v-if="regexTypes().includes(answer[index])">
                  Essa questão ainda não foi respondida.
                </span>
                <span v-else>
                  Essa questão foi respondida.
                </span>
                </div>
            </div>
          </div>
        <hr>
        <div class="mt-3 p-2">
          <h3 class="text-center mt-3">Gabarito</h3>
          <div class="w-100">
            <span class="text-center" v-if="regexTypes().includes(answer[4])"> <i class="text-center">É necessário responder os 5 desafios antes de ver o gabarito.</i></span>
            <div>
              <p v-for="ans,index in answer"  :key="index" class="mt-3 ml-2"> <b>{{labelAlternative(index)}}</b>. {{answer[index]}}</p>
              <div class="d-flex justify-content-center align-middle h-50">
                <b-button class="buttons btn" @click="submitReply()">Enviar respostas <b-icon icon="check-circle"></b-icon> </b-button>
              </div>
            </div>
          </div>
        </div>
        
        </div>
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
    key: 0,
    options: [
      {text: 'Fácil',    value: '1'},
      {text: 'Moderado', value: '2'},
      {text: 'Difícil',  value: '3'}
    ]
  }),

  mounted() {
    setInterval(() => {
      this.timeChallenge()
    }, 1000);
  },

  methods: {

    getChallenges: function() {
      const service = this

      let user = JSON.parse(sessionStorage.getItem('user'))

      service.time = "10:00"
      service.$axios({
        method: "GET",
        url: "http://localhost:8000/questions/" + user.id + "/" + parseInt(service.level),
      }).then((response) => {
        let questions = response.data 
        if (!questions.length) {
          service._toast("Não há questões desse nível cadastradas no banco de questões, acione o seu professor!", "error")  
          return false
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

    labelAlternative: function(key){
      if (key == 0)
        return "A"
      else if (key == 1)
        return "B"
      else if (key == 2)
        return "C"
      else if (key == 3)
        return "D"
      else if (key == 4)
        return "E"
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
      setTimeout(() => {  
        if(this.key == 4)
          return false
        if (this.regexTypes().includes(this.answer[this.key])) {
          this._toast("Selecione uma resposta antes de ir para a próxima pergunta", "error")
          return false;
        }

        this.key++
      }, 150);
    },

    backQuestion: function(){
      setTimeout(() => {
        if(this.key == 0)
          return false
        this.key--
      }, 150);
    },

    timeChallenge: function(){
      if(!this.started || (this.key == 4 && !this.regexTypes().includes(this.answer[this.key])))
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
    },

    submitReply: function(){

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
  
  .div-left{
    height: 83vh;
  }

  .timer{
    margin-top: 10%;
  }

</style>

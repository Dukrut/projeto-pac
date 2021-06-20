<template>
  <div class="p-4">

    <h3><b-icon icon="tv"></b-icon> Desafios</h3>
    <small>Você já completou 30 de 100 desafios.</small>
    <hr>

    <div v-if="!started">
      <div class="col-12 d-flex justify-content-center align-middle h-25">
        <img src="../../../public/images/questions.png" class="rounded-3" style="height:62.4vh" alt="">
      </div>

      <b-form-group label="Selecione o nível de dificuldade" v-model="level">
        <b-form-radio value="easy" v-model="level">Fácil</b-form-radio>
        <b-form-radio value="medium" v-model="level">Médio</b-form-radio>
        <b-form-radio value="hard" v-model="level">Difícil</b-form-radio>
     </b-form-group>

     <div class="w-100 text-center">
       <b-button class="buttons w-25 mt-4" @click="startChallegens()">Iniciar Desafios</b-button>
     </div>
  </div>

  <div v-else>
    <span><b-icon icon="stopwatch"></b-icon> Tempo restante: {{ time }}</span>
    <div class="d-flex flex-column bd-highlight mb-3 overflow-auto">
      <div class="p-1 bd-highlight">
        <span>{{ key+1 }}. <strong>Descrição</strong>: {{ challenges[key].description }}</span>
      </div>
      <div class="p-1 bd-highlight">
        <span><strong>Selecione a resposta correta</strong>:</span>
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
    <div v-if="key == 4 && !regexTypes().includes(answer[4])" class="align-middle">
      <h2>GABARITO</h2>
      <p v-for="ans,index in answer"  :key="index"><strong>{{ index+1 }}</strong>. {{ answer[index]}}</p>
    </div>
  </div>

  </div>
</template>

<script>

export default {
  components:{
  },
  data: () => ({
    level: "easy",
    started: false,
    challenges: [],
    answer: [null, null, null, null, null],
    time: "",
    key: 0
  }),
  mounted() {
    setInterval(() => {
      this.timeChallenge()
    }, 60000);
  },
  methods: {
    getChallenges: function(){
      this.time = "10:00"
      this.challenges = [
        { description : "Em um sítio há 12 árvores. Cada árvore possui 12 galhos e em cada galho tem 12 maçãs. Quantas maçãs existem no sítio?",
          options: ["144", "1224", "1564", "1728", "1368"],
          correct: "144"
        },
        { description : "Leandro tem 40 balas chupou 12 e deu 10 para sua irmã. Com quantas balas ele ficou?",
          options: ["15", "18", "14", "16", "13"],
          correct: "15"
        },
        { description : "Quantos números 1 eu tenho de 1 até 191?",
          options: ["140", "136", "132", "150", "126"],
          correct: "140"
        },
        { description : "Pedro tem 30 anos e tem mais três irmãos: Bianca de 27, Victor de 23 e Alex de 18. Qual a diferença de idade entre Pedro e irmão caçula?",
          options: ["13", "11", "12", "14", "16"],
          correct: "13"
        },
        { description : "Quantos zeros tem o número UM BILHÃO?",
          options: ["6", "7", "8", "9", "10"],
          correct: "9"
        }
      ]
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
    startChallegens: function(){
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
      if(!this.started)
        return false

      var aux = this.time.split(":")
      var minute = parseInt(aux[0])
      var seconds = parseInt(aux[1])

      seconds--;

      if(seconds == -1){
        minute--
        seconds = 59;
      }

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
</style>

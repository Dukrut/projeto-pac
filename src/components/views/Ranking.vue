<template>
  <div class="body p-4">
    <h3><b-icon icon="trophy"></b-icon> Ranking</h3>
    <hr>

    <div class="container">
        <div id="podium">
            <div class="podiumPosition" id="secondPlace"><b>{{podium[1].id}}</b></div>
            <div class="podiumPosition" id="firstPlace"><b>{{podium[0].id}}</b></div>
            <div class="podiumPosition" id="thirdPlace"><b>{{podium[2].id}}</b></div>
        </div>
        <div id="labels">
            <div class="podiumName" id="secondName">{{podium[1].name}}</div>
            <div class="podiumName" id="firsName">{{podium[0].name}}</div>
            <div class="podiumName" id="thrirdName">{{podium[2].name}}</div>
        </div>
    </div>
    <div class="container" style="margin-top: -50px"> <!-- Tabela vai aqui -->
        <table class="w-100 border">
          <thead class="text-center border header-table">
            <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
          </thead>      
          <tbody class="border">
            <tr class="border" :class="{'item-table-striped':index%2 == 0, 'item-table': index%2 != 0}" v-for="item, index in items" :key="index">
              <td class="p-2 border text-justify"> {{item.position}} </td>
              <td class="p-2 border text-justify">{{item.student}}</td>
              <td class="p-2 border text-justify"> {{item.points}} </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<style>

  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  .container {
    width: 70%;
    height: 40%;
    margin: auto;
  }
  #podium, #labels {
    width: 57%;
    height: 40%;
    margin: auto;
  }
  #podium {
    margin-top: 70px;
    margin-left: 20.99%;
    position: relative;
  }
  .podiumPosition, .podiumName {
    width: 190px;
    float: left;
    margin: 0 10px 0 10px;
    border-radius: 15px;
    text-align: center;
  }
  .podiumPosition { 
    color: white; 
    font-size: 25px;
  }
  .podiumName {
    width: 190px;
    margin: 0 7.7px 0 7.7px;
    animation: podiumName 2.1s linear;
    font-size: 20px;
  }
  #firstPlace {
    background: #FFD700;
    height: 120px;
    line-height: 120px;
    animation: firstPlace .7s linear;
  }
  #secondPlace {
    background: #C0C0C0;
    margin-top: 40px;
    height: 80px;
    line-height: 80px;
    animation: secondPlace 1.4s linear;
  }
  #thirdPlace {
    background: #CD7F32;
    margin-top: 60px;
    height: 60px;
    line-height: 60px;
    animation: thirdPlace 2.1s linear;
  }
  @keyframes firstPlace {
    from {
        opacity: 0;
        margin-top: 115px;
        height: 5px;
    }
    to {
        opacity: 1;
        height: 120px;
    }
  }
  @keyframes secondPlace {
    from {
        opacity: 0;
        margin-top: 115px;
        height: 5px;
    }
    to {
        opacity: 1;
        margin-top: 40px;
        height: 80px;
    }
  }
  @keyframes thirdPlace {
    from {
        opacity: 0;
        margin-top: 115px;
        height: 5px;
    }
    to {
        opacity: 1;
        margin-top: 60px;
        height: 60px;
    }
  }
  @keyframes podiumName {
    from { opacity: 0;}
    to { opacity: 1;}
  }

  /*-----------------------------------*/

  .nav-buttons{
    background-color: #D5EAFF;
  }
  .btn-primary{
    background-color: #1A526B !important;
    border: 1px solid #1A526B !important;
  }
  .buttons{
    background-color: #1A526B !important;
  }
  .header-table{
    background-color: #f8f9fa;
  }
  .item-table{
    background-color: #f8f9fa;
  }
  .item-table-striped{
    background-color: #ecedee;
  }
  .item-table:hover{
    background-color: #e5e6e7 !important;
  }
  .item-table-striped:hover{
    background-color: #e5e6e7 !important;
  }
  .item-table-button{
    width: 100px;
  }
  .ml-4{
    margin-left: 2rem;
  }
  .ml-3{
    margin-left: 1.5rem;
  }
  .ml-2{
    margin-left: 1rem;
  }
  .ml-1{
    margin-left: 0.5rem;
  }

</style>

<script>

export default {
  components:{
  },
  data: () => ({
    fields: [
      {name: "Posição"},
      {name: "Nome" },
      {name: "Pontuação"}
    ],
    podium: [
      {
        position: "1º Lugar",
        name: 'Braian Costa Zapelini',
        description: "100",
        id: 1
      },
      {
        position: "2º Lugar",
        name: 'Gabriel da Costa',
        description: "90",
        id: 2
      },
      {
        position: "3º Lugar",
        name: 'Leonardo Cech',
        description: "80",
        id: 3
      }
    ],
    items: [],
    remove_group:{
      name: null,
      id: null
    },
    edit_group:{
      name: null,
      id: null,
      description: null,
      permissions: {
        modules:{
          challenges: false,
          ranking: false,
          reports: false,
          configuration: false
        },
        actions:{
          conf_chanllenges:false,
          view_challenges: false,
          play_challegens: false,
          conf_users: false,
          view_users: false,
          conf_groups: false,
          view_groups: false
        }
      }
    },
    new_group:{
      name: null,
      description: null,
      permissions: {
        modules:{
          challenges: true,
          ranking: true,
          reports: false,
          configuration: false
        },
        actions:{
          conf_chanllenges:false,
          view_challenges: true,
          play_challegens: true,
          conf_users: false,
          view_users: false,
          conf_groups: false,
          view_groups: false
        }
      }
    },
    error_new_group:{
      name: null,
      description: null,
    },
    error_edit_group:{
      name: null,
      description: null
    }
  }),

  mounted() { this.getRanking() },

  methods: {

    regexTypes: function() {
      return [null, undefined, ""]
    },

    getRanking: function() {
      const service = this
      service.$axios({
        method: "GET",
        url: "http://localhost:8000/users/ranking"
      }).then((response) => {
        let ranking = response.data
        for (let index in ranking) {
          service.items.push(ranking[index])
        }
      }).catch((error) => {
        console.error(error)
        service._toast("Erro ao requisitar informações do servidor", "error")
      })
    }

  }
}

</script>
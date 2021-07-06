<template>
  <div class="body p-4">
    <h3><b-icon icon="clipboard-data"></b-icon> Relatórios</h3>
    <hr>
    <div>
        <select v-on:change="filterMember" class="dropDown">
          <option value="genders">Todos os alunos</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
        <!-- <select v-on:change="filterMember2" class="dropDown">
          <option value="ages">Todos os anos</option>
          <option value="9º Ano">9º Ano</option>
          <option value="8º Ano">8º Ano</option>
          <option value="7º Ano">7º Ano</option>
          <option value="6º Ano">6º Ano</option>
          <option value="5º Ano">5º Ano</option>
          <option value="4º Ano">4º Ano</option>
        </select> -->
        <table class="w-100 border" id="table">
          <thead class="text-center border header-table">
            <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
          </thead>    
          <tbody class="border">
              <tr class="border" :class="{'item-table-striped':index%2 == 0, 'item-table': index%2 != 0}" v-for="m, index in member" :key="index">
                <td>{{m.index}}</td>
                <td>{{m.name}}</td>
                <td>{{m.gender}}</td>
                <td>{{m.age}}</td>
                <td>{{m.easyScore}}</td>
                <td>{{m.mediumScore}}</td>
                <td>{{m.hardScore}}</td>
                <td>{{m.date}}</td>
              </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<style>

  #table{
    text-align: center;
    margin-top: 10px;
    font-size: 100%;
  }

  #table tbody tr td{
    padding: 0.70%;
  }

  .dropDown{
    font-size: 100%;
    padding: 0.5%;
    padding-right: 0.2%;
    border-radius: 5px;
    margin-right: 0.5%;
  }
  /*-----------------------------------------*/

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
  .d-33 {
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }

</style>

<script>

var member = [{"index":1, "name":"Braian Costa Zapelini", "gender":"Masculino", "age": "9º Ano", "easyScore": "100/100", "mediumScore": "80/100", "hardScore": "50/100", "date": "05/07/2021"},
              {"index":2, "name":"Ana Julia", "gender":"Feminino", "age": "8º Ano", "easyScore": "90/100", "mediumScore": "20/100", "hardScore": "75/100", "date": "04/07/2021"},
              {"index":3, "name":"Gabriel da Costa", "gender":"Masculino", "age": "7º Ano", "easyScore": "100/100", "mediumScore": "36/100", "hardScore": "24/100", "date": "03/07/2021"},
              {"index":4, "name":"Leonardo Cech", "gender":"Masculino", "age": "9º Ano", "easyScore": "100/100", "mediumScore": "68/100", "hardScore": "74/100", "date": "02/07/2021"},
              {"index":5, "name":"Aluno", "gender":"Feminino", "age": "6º Ano", "easyScore": "0/100", "mediumScore": "0/100", "hardScore": "0/100", "date": "01/01/2021"},
              {"index":6, "name":"Aluno", "gender":"Masculino", "age": "5º Ano", "easyScore": "0/100", "mediumScore": "0/100", "hardScore": "0/100", "date": "01/01/2021"},
              {"index":7, "name":"Aluno", "gender":"Feminino", "age": "4º Ano", "easyScore": "0/100", "mediumScore": "0/100", "hardScore": "0/100", "date": "01/01/2021"},
              {"index":8, "name":"Aluno", "gender":"Feminino", "age": "6º Ano", "easyScore": "0/100", "mediumScore": "0/100", "hardScore": "0/100", "date": "01/01/2021"},
              {"index":9, "name":"Aluno", "gender":"Feminino", "age": "5º Ano", "easyScore": "0/100", "mediumScore": "0/100", "hardScore": "0/100", "date": "01/01/2021"},
              {"index":10, "name":"Aluno", "gender":"Masculino", "age": "7º Ano", "easyScore": "0/100", "mediumScore": "0/100", "hardScore": "0/100", "date": "01/01/2021"},
              ];

export default {
  components:{
    //TODO
  },
  
  data: () => ({
    member: member,
    fields: [
      {name: "Código Aluno"},      
      {name: "Nome Completo" },
      {name: "Gênero"},
      {name: "Turma"},
      {name: "Pontuação Fácil"},
      {name: "Pontuação Médio"},
      {name: "Pontuação Difícil"},
      {name: "Data de Realização"}
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

  methods: {
    filterMember: function(evt){
      var val = evt.target.value;
      if (val == 'genders') {
          this.member = member;
      } else{ 
          this.member = member.filter(function (e){ return e.gender == val;})
      }
    },
    // filterMember2: function(evt){
    //   var val = evt.target.value;
    //   if (val == 'ages') {
    //       this.member = member;
    //   } else{
    //       this.member = member.filter(function (e){ return e.age == val;})
    //   }
    // }
  }
}

</script>

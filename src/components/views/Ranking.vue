<template>
  <div class="body p-4">
    <h3><b-icon icon="people"></b-icon> Ranking</h3>
    <hr>
    <table class="w-100 border">
      <thead class="text-center border header-table">
        <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
      </thead>      
      <tbody class="border">
        <tr class="border" :class="{'item-table-striped':index%2 == 0, 'item-table': index%2 != 0}" v-for="item,index in items" :key="index">
          <td class="p-2 border text-justify"> {{item.position}} </td>
          <td class="p-2 border text-justify">{{item.name}}</td>
          <td class="p-2 border text-justify"> {{item.description}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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
    items: [
      {
        position: "1º Lugar",
        name: 'Braian Costa Zapelini',
        description: "100",
        id: 1
      },
      {
        position: "2º Lugar",
        name: 'Gusthawo Junkes',
        description: "90",
        id: 2
      },
      {
        position: "3º Lugar",
        name: 'Sílvio Baião Amarante',
        description: "80",
        id: 3
      },
      {
        position: "4º Lugar",
        name: 'Sasha Quintal da Silva',
        description: "70",
        id: 4
      },
      {
        position: "5º Lugar",
        name: 'Brenda Pereira',
        description: "60",
        id: 5
      },
      {
        position: "6º Lugar",
        name: 'Eduardo Krutsch',
        description: "50",
        id: 6
      },
      {
        position: "7º Lugar",
        name: 'Márcia Belmira',
        description: "40",
        id: 7
      },
      {
        position: "8º Lugar",
        name: 'Ana Julia',
        description: "30",
        id: 8
      }
    ],
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

    regexTypes: function() {
      return [null, undefined, ""]
    },

  }
}

</script>

<style>

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

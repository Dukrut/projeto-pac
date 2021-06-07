<template>
  <div class="body p-4">
      <h3><b-icon icon="people"></b-icon> Grupos</h3>

      <b-button-group class="mb-3 mt-2">
        <b-button size="sm" class="buttons" ><b-icon icon="plus"></b-icon> Novo grupo</b-button>
      </b-button-group>


      <table class="w-100 border">
        <thead class="text-center border">
          <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
        </thead>
        <tbody class="border">
          <tr class="border" v-for="item,index in items" :key="index">
            <td class="p-2 border text-justify">{{item.name}}</td>
            <td class="p-2 border text-justify"> {{item.description}} </td>
            <td class="p-2 border text-center">
              <button type="button" name="button" @click="editGroup(item.id)">Editar</button>
              <button type="button" name="button" @click="removeGroup(item.id)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>

      <b-modal
        id="add-edit-group"
        ref="modal"
        title="Grupo"
        >
         <b-form-group
           label="Name"
           label-for="name-input"
           invalid-feedback="Name is required"
         >
         <b-form-input
           id="name-input"
           required
         ></b-form-input>
       </b-form-group>
   </b-modal>
  </div>
</template>

<script>
// import Navbar from "./base/Navbar"

export default {
  components:{
  },
  data: () => ({
    fields: [
      { name: "Nome" },
      { name: "Descrição" },
      { name: "Ações" }
    ],
    items: [
      {
        name: 'Dev',
        description: "Desenvolvedores do Sistema",
        id: 1
      },
      {
        name: 'Usuários',
        description: "Usuários comuns.",
        id: 2
      },

    ]
  }),
  methods: {
    editGroup:function (id){
      console.log(id);
    },
    removeGroup:function (id){
      console.log(id);
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

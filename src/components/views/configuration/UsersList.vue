<template>
  <div class="body p-4">
      <h3><b-icon icon="person"></b-icon> Usuários</h3>

      <b-button-group class="mb-3 mt-2">
        <b-button size="sm" class="buttons" ><b-icon icon="person-plus"></b-icon> Novo Usuário</b-button>
      </b-button-group>
      <b-table striped
               hover
               bordered
               table-variant="light"
               class="text-center"
               :items="items"
               :fields="fields">
               <template #cell(ações)>
                  <b-button-group class="mx-1">
                    <b-button size="sm" variant="primary"><b-icon icon="pencil-square"></b-icon></b-button>
                  </b-button-group>
                  <b-button-group class="mx-1">
                    <b-button size="sm" variant="danger"><b-icon icon="dash"></b-icon></b-button>
                  </b-button-group>
              </template>
      </b-table>
  </div>
</template>

<script>
// import Navbar from "./base/Navbar"

export default {
  components:{
  },
  data: () => ({
    fields: ["nome_completo", "email", "data_de_nascimento", "telefone", "administrador", "endereço", "grupo", "ações"],
    items: [
      { nome_completo: 'Eduardo',
        email: "eduardo@eduardo.com.br",
        data_de_nascimento:"01/01/1950",
        telefone: '(47) 99999-9999',
        administrador: "Sim",
        endereço: "Jaraguá do Sul",
        grupo: "Dev",
      },
      { nome_completo: 'Camille',
        email: "camille@camille.com.br",
        data_de_nascimento:"01/01/1950",
        telefone: '(47) 99999-9999',
        administrador: "Sim",
        endereço: "Jaraguá do Sul",
        grupo: "Dev",
      },

    ]
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

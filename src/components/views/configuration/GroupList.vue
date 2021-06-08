<template>
  <div class="body p-4">
    <h3><b-icon icon="people"></b-icon> Grupos</h3>
    <hr>
    <b-button-group class="mb-3 mt-2">
      <b-button size="sm" class="buttons" @click="showModalCreate()"><b-icon icon="plus"></b-icon> Novo grupo</b-button>
    </b-button-group>
    <table class="w-100 border">
      <thead class="text-center border header-table">
        <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
      </thead>
      <tbody class="border">
        <tr class="border" :class="{'item-table-striped':index%2 == 0, 'item-table': index%2 != 0}" v-for="item,index in items" :key="index">
          <td class="p-2 border text-justify">{{item.name}}</td>
          <td class="p-2 border text-justify"> {{item.description}} </td>
          <td class="p-2 border text-center">
            <button class="btn-primary rounded" @click="showModalEdit(item)"><b-icon icon="pencil"></b-icon></button>
          </td>
          <td class="p-2 border text-center">
            <button class="btn-danger rounded" @click="showModalRemove(item)"><b-icon icon="trash"></b-icon></button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Excluir -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-remove-group"
             title="Excluir grupo"
             button-size="sm">
      <p>
        Você tem certeza que deseja remover o grupo <b>{{remove_items.name}}</b>?
      </p>
    </b-modal>

    <!-- Modal de Edição -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-edit-group"
             @cancel="cancelEdit()"
             title="Editar grupo"
             button-size="sm"
             size="lg">
      <p>Você está editando o grupo <b>{{edit_items.name}}</b></p>
      <label><b>Nome</b></label>
      <input type="text" class="form-control form-control-sm" v-model="edit_items.name" value="">
      <label class="mt-2"><b>Descrição</b></label>
      <input type="text" class="form-control form-control-sm" v-model="edit_items.description" name="" value="">
      <label class="mt-2"><b>Permissões dos módulos</b></label>
      <br>
      <div class="form-check form-check-inline mt-1">
        <input class="form-check-input" type="checkbox" id="challenges" v-model="edit_items.permissions.modules.challenges">
        <label class="form-check-label" for="challenges">Desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="ranking" v-model="edit_items.permissions.modules.ranking">
        <label class="form-check-label" for="ranking">Ranking</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="reports" v-model="edit_items.permissions.modules.reports">
        <label class="form-check-label" for="reports">Relatórios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="configuration" v-model="edit_items.permissions.modules.configuration">
        <label class="form-check-label" for="configuration">Configurações</label>
      </div>
      <br>
      <label class="mt-2"><b>Permissões de ações</b></label>
      <br>
      <label class="mt-1" for=""><i>Desafios</i></label>
      <br>
      <div class="form-check form-check-inline mt-1">
        <input class="form-check-input" type="checkbox" id="conf_chanllenges" v-model="edit_items.permissions.actions.conf_chanllenges">
        <label class="form-check-label" for="conf_chanllenges">Criar, editar e excluir desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="view_challenges" v-model="edit_items.permissions.actions.view_challenges">
        <label class="form-check-label" for="view_challenges">Visualizar desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="play_challegens" v-model="edit_items.permissions.actions.play_challegens">
        <label class="form-check-label" for="play_challegens">Jogar desafios</label>
      </div>
      <br>
      <label class="mt-2" for=""><i>Configurações</i></label>
      <br>
      <div class="form-check form-check-inline mt-1 col-5">
        <input class="form-check-input" type="checkbox" id="conf_users" v-model="edit_items.permissions.actions.conf_users">
        <label class="form-check-label" for="conf_users">Cadastrar, editar e excluir usuários</label>
      </div>
      <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="view_users" v-model="edit_items.permissions.actions.view_users">
        <label class="form-check-label" for="view_users">Visualizar usuários</label>
      </div>
      <br>
      <div class="form-check form-check-inline col-5">
        <input class="form-check-input" type="checkbox" id="conf_groups" v-model="edit_items.permissions.actions.conf_groups">
        <label class="form-check-label" for="conf_groups">Cadastrar, editar e excluir grupos</label>
      </div>
      <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="view_groups" v-model="edit_items.permissions.actions.view_groups">
        <label class="form-check-label" for="view_groups">Visualizar grupos</label>
      </div>
    </b-modal>

    <!-- Modal de Criação -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-new-group"
             @cancel="cancelEdit()"
             title="Editar grupo"
             button-size="sm"
             size="lg">
      <p>Você está editando o grupo <b>{{edit_items.name}}</b></p>
      <label><b>Nome</b></label>
      <input type="text" class="form-control form-control-sm" v-model="edit_items.name" value="">
      <label class="mt-2"><b>Descrição</b></label>
      <input type="text" class="form-control form-control-sm" v-model="edit_items.description" name="" value="">
      <label class="mt-2"><b>Permissões dos módulos</b></label>
      <br>
      <div class="form-check form-check-inline mt-1">
        <input class="form-check-input" type="checkbox" id="challenges" v-model="edit_items.permissions.modules.challenges">
        <label class="form-check-label" for="challenges">Desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="ranking" v-model="edit_items.permissions.modules.ranking">
        <label class="form-check-label" for="ranking">Ranking</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="reports" v-model="edit_items.permissions.modules.reports">
        <label class="form-check-label" for="reports">Relatórios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="configuration" v-model="edit_items.permissions.modules.configuration">
        <label class="form-check-label" for="configuration">Configurações</label>
      </div>
      <br>
      <label class="mt-2"><b>Permissões de ações</b></label>
      <br>
      <label class="mt-1" for=""><i>Desafios</i></label>
      <br>
      <div class="form-check form-check-inline mt-1">
        <input class="form-check-input" type="checkbox" id="conf_chanllenges" v-model="edit_items.permissions.actions.conf_chanllenges">
        <label class="form-check-label" for="conf_chanllenges">Criar, editar e excluir desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="view_challenges" v-model="edit_items.permissions.actions.view_challenges">
        <label class="form-check-label" for="view_challenges">Visualizar desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="play_challegens" v-model="edit_items.permissions.actions.play_challegens">
        <label class="form-check-label" for="play_challegens">Jogar desafios</label>
      </div>
      <br>
      <label class="mt-2" for=""><i>Configurações</i></label>
      <br>
      <div class="form-check form-check-inline mt-1 col-5">
        <input class="form-check-input" type="checkbox" id="conf_users" v-model="edit_items.permissions.actions.conf_users">
        <label class="form-check-label" for="conf_users">Cadastrar, editar e excluir usuários</label>
      </div>
      <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="view_users" v-model="edit_items.permissions.actions.view_users">
        <label class="form-check-label" for="view_users">Visualizar usuários</label>
      </div>
      <br>
      <div class="form-check form-check-inline col-5">
        <input class="form-check-input" type="checkbox" id="conf_groups" v-model="edit_items.permissions.actions.conf_groups">
        <label class="form-check-label" for="conf_groups">Cadastrar, editar e excluir grupos</label>
      </div>
      <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="view_groups" v-model="edit_items.permissions.actions.view_groups">
        <label class="form-check-label" for="view_groups">Visualizar grupos</label>
      </div>
    </b-modal>

  </div>
</template>

<script>

export default {
  components:{
  },
  data: () => ({
    fields: [
      {name: "Nome" },
      {name: "Descrição"},
      {name: "Editar"},
      {name: "Excluir"}
    ],
    items: [
      {
        name: 'Dev',
        description: "Desenvolvedores do Sistema",
        permissions: {
          modules:{
            challenges: false,
            ranking: true,
            reports: false,
            configuration: true
          },
          actions:{
            conf_chanllenges:true,
            view_challenges: true,
            play_challegens: true,
            conf_users: true,
            view_users: true,
            conf_groups: true,
            view_groups: true
          }
        },
        id: 1
      },
      {
        name: 'Usuários',
        description: "Usuários comuns.",
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
        },
        id: 2
      },
    ],
    remove_items:{
      name: null,
      id: null
    },
    edit_items:{
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
    }
  }),
  methods: {
    showModalEdit:function (item){
      this.edit_items.name = item.name;
      this.edit_items.id = item.id;
      this.edit_items.description = item.description;
      this.edit_items.permissions = item.permissions;
      this.$root.$emit('bv::show::modal', 'modal-edit-group')
    },
    showModalRemove:function (item){
      this.remove_items.name = item.name;
      this.remove_items.id = item.id;
      this.$root.$emit('bv::show::modal', 'modal-remove-group')
    },
    showModalCreate:function (){
      this.$root.$emit('bv::show::modal', 'modal-new-group')
    },
    cancelEdit:function(){
      this.edit_items.name = null;
      this.edit_items.description = null;
      this.edit_items.id = null
    },
    cancelRemove:function(){
      this.remove_items.name = null;
      this.remove_items.id = null
    }
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
</style>

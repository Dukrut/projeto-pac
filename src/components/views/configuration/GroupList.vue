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
          <td class="p-2 border text-center item-table-button">
            <button class="btn-primary rounded" @click="showModalEdit(item)"><b-icon icon="pencil"></b-icon></button>
          </td>
          <td class="p-2 border text-center item-table-button">
            <button class="btn-danger rounded" @click="showModalRemove(item)"><b-icon icon="trash"></b-icon></button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Excluir -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-remove-group"
             @ok.prevent="saveRemoveGroup()"
             @close="cancelRemove()"
             title="Excluir grupo"
             button-size="sm">
      <p>
        Você tem certeza que deseja remover o grupo <b>{{remove_group.name}}</b>?
      </p>
    </b-modal>

    <!-- Modal de Edição -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-edit-group"
             @ok.prevent="saveEditGroup()"
             @close="cancelEdit()"
             @cancel="cancelEdit()"
             title="Editar grupo"
             button-size="sm"
             size="lg">

      <div class="row">
        <div class="col-5">
          <label><b>Nome</b></label>
          <b-form-input v-model="edit_group.name" @input="clearError('name', error_edit_group)" :state="error_edit_group.name" type="text" class="form-control-sm" placeholder="Nome"></b-form-input>
        </div>
        <div class="col-7">
          <label><b>Descrição</b></label>
          <b-form-input v-model="edit_group.description" @input="clearError('description', error_edit_group)" :state="error_edit_group.description" type="text" class="form-control-sm" placeholder="Descrição"></b-form-input>
        </div>
      </div>
      <label class="mt-4"><b>Permissões dos módulos</b></label>

      <br>
      <div class="form-check form-check-inline mt-1 ml-2">
        <input class="form-check-input" type="checkbox" id="challenges" v-model="edit_group.permissions.modules.challenges">
        <label class="form-check-label" for="challenges">Desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="ranking" v-model="edit_group.permissions.modules.ranking">
        <label class="form-check-label" for="ranking">Ranking</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="reports" v-model="edit_group.permissions.modules.reports">
        <label class="form-check-label" for="reports">Relatórios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="configuration" v-model="edit_group.permissions.modules.configuration">
        <label class="form-check-label" for="configuration">Configurações</label>
      </div>
      <br>
      <label class="mt-4"><b>Permissões de ações</b></label>
      <br>
      <label class="mt-1" for=""><i>Desafios</i></label>
      <br>
      <div class="form-check form-check-inline mt-1 ml-2">
        <input class="form-check-input" type="checkbox" id="conf_challenges" v-model="edit_group.permissions.actions.conf_challenges">
        <label class="form-check-label" for="conf_challenges">Criar, editar e excluir desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="view_challenges" v-model="edit_group.permissions.actions.view_challenges">
        <label class="form-check-label" for="view_challenges">Visualizar desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="play_challenges" v-model="edit_group.permissions.actions.play_challenges">
        <label class="form-check-label" for="play_challenges">Jogar desafios</label>
      </div>
      <br>
      <label class="mt-4" for=""><i>Configurações</i></label>
      <br>
      <div class="form-check form-check-inline mt-1 col-5 ml-2">
        <input class="form-check-input" type="checkbox" id="conf_users" v-model="edit_group.permissions.actions.conf_users">
        <label class="form-check-label" for="conf_users">Cadastrar, editar e excluir usuários</label>
      </div>
      <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="view_users" v-model="edit_group.permissions.actions.view_users">
        <label class="form-check-label" for="view_users">Visualizar usuários</label>
      </div>
      <br>
      <div class="form-check form-check-inline col-5 ml-2">
        <input class="form-check-input" type="checkbox" id="conf_groups" v-model="edit_group.permissions.actions.conf_groups">
        <label class="form-check-label" for="conf_groups">Cadastrar, editar e excluir grupos</label>
      </div>
      <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="view_groups" v-model="edit_group.permissions.actions.view_groups">
        <label class="form-check-label" for="view_groups">Visualizar grupos</label>
      </div>
    </b-modal>

    <!-- Modal de Criação -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-new-group"
             @cancel="cancelNew()"
             @ok.prevent="saveNewGroup()"
             title="Criar grupo"
             button-size="sm"
             size="lg">

       <div class="row">
         <div class="col-5">
           <label><b>Nome</b></label>
           <b-form-input v-model="new_group.name" @input="clearError('name', error_new_group)" :state="error_new_group.name" type="text" class="form-control-sm" placeholder="Nome"></b-form-input>
         </div>
         <div class="col-7">
           <label ><b>Descrição</b></label>
          <b-form-input v-model="new_group.description" @input="clearError('description', error_new_group)" :state="error_new_group.description" type="text" class="form-control-sm" placeholder="Descrição"></b-form-input>
        </div>
      </div>

      <label class="mt-4"><b>Permissões dos módulos</b></label>
      <br>
      <div class="form-check form-check-inline mt-1 ml-2">
        <input class="form-check-input" type="checkbox" id="challenges" v-model="new_group.permissions.modules.challenges">
        <label class="form-check-label" for="challenges">Desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="ranking" v-model="new_group.permissions.modules.ranking">
        <label class="form-check-label" for="ranking">Ranking</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="reports" v-model="new_group.permissions.modules.reports">
        <label class="form-check-label" for="reports">Relatórios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="configuration" v-model="new_group.permissions.modules.configuration">
        <label class="form-check-label" for="configuration">Configurações</label>
      </div>
      <br>
      <label class="mt-4"><b>Permissões de ações</b></label>
      <br>
      <label class="mt-1" for=""><i>Desafios</i></label>
      <br>
      <div class="form-check form-check-inline mt-1 ml-2">
        <input class="form-check-input" type="checkbox" id="conf_challenges" v-model="new_group.permissions.actions.conf_challenges">
        <label class="form-check-label" for="conf_challenges">Criar, editar e excluir desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="view_challenges" v-model="new_group.permissions.actions.view_challenges">
        <label class="form-check-label" for="view_challenges">Visualizar desafios</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="play_challenges" v-model="new_group.permissions.actions.play_challenges">
        <label class="form-check-label" for="play_challenges">Jogar desafios</label>
      </div>
      <br>
      <label class="mt-4" for=""><i>Configurações</i></label>
      <br>
      <div class="form-check form-check-inline mt-1 ml-2">
        <input class="form-check-input" type="checkbox" id="conf_users" v-model="new_group.permissions.actions.conf_users">
        <label class="form-check-label" for="conf_users">Cadastrar, editar e excluir usuários</label>
      </div>
      <div class="form-check form-check-inline ">
        <input class="form-check-input" type="checkbox" id="view_users" v-model="new_group.permissions.actions.view_users">
        <label class="form-check-label" for="view_users">Visualizar usuários</label>
      </div>
      <br>
      <div class="form-check form-check-inline ml-2">
        <input class="form-check-input" type="checkbox" id="conf_groups" v-model="new_group.permissions.actions.conf_groups">
        <label class="form-check-label" for="conf_groups">Cadastrar, editar e excluir grupos</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="view_groups" v-model="new_group.permissions.actions.view_groups">
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
    items: [],
    remove_group: {
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
          conf_challenges:false,
          view_challenges: false,
          play_challenges: false,
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
          conf_challenges:false,
          view_challenges: true,
          play_challenges: true,
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

  mounted() { this.getGroups() },

  methods: {

    getGroups: function() {
      this.$axios({
        method: "GET",
        url: "http://localhost:8000/groups",
      }).then((response) => {
        this.prepare(response.data)
      }).catch((error) => {
        console.error(error)
        this._toast("Erro ao requisitar informações do servidor", "error")
      })
    },

    prepare: function(groups = []) {
      for (let index in groups) {
        let group = groups[index]
        let item = {
          id: group.id,
          name: group.name,
          description: group.description,
          permissions: {
            modules: {
              challenges: group.permission.viewChallenges,
              ranking: group.permission.viewRanking,
              reports: group.permission.viewReports,
              configuration: group.permission.viewConfig
            },
            actions: {
              conf_challenges: group.action.confChallenges,
              play_challenges: group.action.playChallenges,
              conf_users: group.action.confUsers,
              view_users: group.action.viewUsers,
              conf_groups: group.action.confGroups,
              view_groups: group.action.viewGroups
            }
          }
        }

        this.items.push(item)
      }
    },

    showModalEdit: function(item) {
      this.edit_group.name = item.name;
      this.edit_group.id = item.id;
      this.edit_group.description = item.description;
      this.edit_group.permissions = item.permissions;
      this.$root.$emit('bv::show::modal', 'modal-edit-group')
    },

    showModalRemove: function(item) {
      this.remove_group.name = item.name;
      this.remove_group.id = item.id;
      this.$root.$emit('bv::show::modal', 'modal-remove-group')
    },

    showModalCreate: function () {
      this.$root.$emit('bv::show::modal', 'modal-new-group')
    },

    cancelEdit: function() {
      this.edit_group = {
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
            conf_challenges:false,
            view_challenges: false,
            play_challenges: false,
            conf_users: false,
            view_users: false,
            conf_groups: false,
            view_groups: false
          }
        }
      }

      this.error_edit_group = {
        name: null,
        description: null
      }
    },

    cancelRemove:function() {
      this.remove_group = {
        id: null,
        name: null
      }
    },

    cancelNew: function() {
      this.new_group  = {
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
            conf_challenges:false,
            view_challenges: true,
            play_challenges: true,
            conf_users: false,
            view_users: false,
            conf_groups: false,
            view_groups: false
          }
        }
      }

      this.error_new_group = {
        name: null,
        description: null
      }
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

    validInputs: function(data, error){
      var list_fields = []
      var valid = true

      if (this.regexTypes().includes(data.name)){
        valid = false
        error.name = false
        list_fields.push("name")
      }
      if (this.regexTypes().includes(data.description)){
        valid = false
        error.description = false
        list_fields.push("description")
      }

      var message = (list_fields.length > 1) ? "Os campos " : "O campo"
      list_fields.forEach(element => {
          if(element == "description")
            message += "<b> descrição </b>,"
          else
            message += "<b> nome </b>,"
      })

      message = message.substring(0, message.length - 1)

      if (message.includes("descrição") && message.includes("nome"))
        message = message.replace(",", "e");

      message += (list_fields.length > 1) ? "são obrigatórios. " : "é obrigatório."

      if(!valid)
        this._toast(message, "error")

      return valid
    },

    clearError: function(prop, error){
      error[prop] = null
    },

    saveNewGroup() {
      const service = this
      const groupToSave = service.new_group

      if (!service.validInputs(groupToSave, service.error_new_group))
        return false

      const view = groupToSave.permissions.modules
      const actions = groupToSave.permissions.actions

      let newGroup = {
        name: groupToSave.name,
        description: groupToSave.description,
        permission: {
          viewChallenges: view.challenges,
          viewRanking: view.ranking,
          viewReports: view.reports,
          viewConfig: view.configuration
        },
        action: {
          confChallenges: actions.conf_challenges,
          playChallenges: actions.play_challenges,
          confUsers: actions.conf_users,
          viewUsers: actions.view_users,
          confGroups: actions.conf_groups,
          viewGroups: actions.view_groups
        }
      }

      service.$axios({
        method: "POST",
        url: "http://localhost:8000/groups/create",
        data: newGroup
      }).then((response) => {
        if (response.status == 200){
          service._toast("Salvo com sucesso!", "success")
          service.$root.$emit('bv::hide::modal', 'modal-new-group')
        }
      }).catch((error) => {

        service._toast("Não foi possível salvar, tente novamente mais tarde.", "error")
        console.error(error);
      })

    },

    saveEditGroup() {
      const service = this
      const groupToEdit = service.edit_group
      if (!this.validInputs(this.edit_group, this.error_edit_group))
        return false

      const view = groupToEdit.permissions.modules
      const actions = groupToEdit.permissions.actions

      let updated = {
        id: groupToEdit.id,
        name: groupToEdit.name,
        description: groupToEdit.description,
        permission: {
          viewChallenges: view.challenges,
          viewRanking: view.ranking,
          viewReports: view.reports,
          viewConfig: view.configuration
        },
        action: {
          confChallenges: actions.conf_challenges,
          playChallenges: actions.play_challenges,
          confUsers: actions.conf_users,
          viewUsers: actions.view_users,
          confGroups: actions.conf_groups,
          viewGroups: actions.view_groups
        }
      }

      this.$axios({
        method: "POST",
        url: "http://localhost:8000/groups/update",
        data: updated
      }).then((response) => {
        if (response.status == 200){
          this._toast("Salvo com sucesso!", "success")
          this.$root.$emit('bv::hide::modal', 'modal-new-group')
        }
      }).catch((error) => {
        this._toast("Não foi possível salvar, tente novamente mais tarde.", "error")
        console.error(error);
      })
    },

    saveRemoveGroup: function() {
      this.$axios({
        method: "DELETE",
        url: "http://localhost:8000/groups/delete/" + this.remove_group.id
      }).then((response) => {
        if (response.status == 200) {
          this._toast("Excluído com sucesso!", "success")
        }
      }).catch((error) => {
        this._toast("Não foi possível excluir esse grupo, tente novamente mais tarde.", "error")
        console.error(error);
      }).finally(() => {
        this.$root.$emit('bv::hide::modal', 'modal-remove-group')
      })
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

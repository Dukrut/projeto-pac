<template>
  <div class="body p-4">
    <h3><b-icon icon="person"></b-icon> Usuários</h3>
    <hr>
    <b-button-group class="mb-3 mt-2">
      <b-button size="sm" class="buttons" @click="showModalCreate()" v-b-modal.modal-new-users><b-icon icon="plus"></b-icon> Novo Usuário</b-button>
    </b-button-group>

    <table class="w-100 border">
      <thead class="text-center border header-table">
        <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
      </thead>
      <tbody class="border">
        <tr class="border text-center" :class="{'item-table-striped':index % 2 == 0, 'item-table': index%2 != 0}" v-for="item,index in items" :key="index">
          <td class="p-2 border text-justify"> {{item.name}} </td>
          <td class="p-2 border text-justify"> {{item.email}} </td>
          <td class="p-2 border text-justify"> {{item.birth}} </td>
          <td class="p-2 border text-justify"> {{item.phone}} </td>
          <td class="p-2 border text-justify"> {{item.school.name}} </td>
          <td class="p-2 border text-justify"> {{item.classroom.name}} </td>
          <td class="p-2 border text-justify"> {{item.address.city}} </td>
          <td class="p-2 border text-justify"> {{item.flagMaster == 1 ? 'Sim' : 'Não'}} </td>
          <td class="p-2 border text-justify"> {{item.group.name}} </td>
          <td class="p-2 border text-center">
            <button class="btn-primary rounded" @click="showModalEdit(item)"><b-icon icon="pencil"></b-icon></button>
          </td>
          <td class="p-2 border text-center">
            <button class="btn-danger rounded" @click="showModalRemove(item)"><b-icon icon="trash"></b-icon></button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Editar -->
    <b-modal id="modal-edit-users"
             size="lg"
             ok-title="Confirmar"
             cancel-title="Cancelar"
             @cancel="cancelEditUsers()"
             @close="cancelEditUsers()"
             @ok.prevent="saveEditUsers()"
             button-size="sm"
             title="Editar usuário">
      <b-row>
        <b-col>
          <label for="name">Nome Completo</label>
          <b-form-input id="name" type="text" size="sm" v-model="edit_users.name" @input="clearError('name', error_edit_users)" :state="error_edit_users.name" placeholder="Ex: Maria Lopes da Silva"></b-form-input>
        </b-col>
        <b-col>
          <label for="email">Email</label>
          <b-form-input id="email" type="email" size="sm" v-model="edit_users.email" @input="clearError('email', error_edit_users)" :state="error_edit_users.email" placeholder="Ex: example@example.com"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <label for="birth">Data de Nascimento</label>
          <b-form-input id="birth" type="date" size="sm" v-model="edit_users.birth" @input="clearError('birth', error_edit_users)" :state="error_edit_users.birth"></b-form-input>
        </b-col>
        <b-col>
          <label for="phone">Telefone</label>
          <b-form-input id="phone" type="tel" size="sm" v-model="edit_users.phone" @input="clearError('phone', error_edit_users)" :state="error_edit_users.phone" placeholder="Ex: (99) 99999-9999"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <label for="school">Escola</label>
          <b-form-input id="school" type="text" size="sm" v-model="edit_users.school" @input="clearError('school', error_edit_users)" :state="error_edit_users.school" placeholder="Ex: E.E.B Escola Exemplo"></b-form-input>
        </b-col>
        <b-col>
          <label for="classroom">Turma</label>
          <b-form-input id="classroom" type="text" size="sm" v-model="edit_users.classroom" @input="clearError('classroom', error_edit_users)" :state="error_edit_users.classroom" placeholder="Ex: 6º 02"></b-form-input>
        </b-col>
        <b-col>
          <label for="city">Cidade</label>
          <b-form-input id="city" type="text" size="sm" v-model="edit_users.city" @input="clearError('city', error_edit_users)" :state="error_edit_users.city" placeholder="Ex: São Paulo"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <label for="status">O usuário é um administrador?</label>
          <b-form-checkbox
                id="status"
                v-model="edit_users.status"
                switch
                name="status"
                value="Sim"
                unchecked-value="Não"
                >
                  {{status}}
                </b-form-checkbox>
        </b-col>
        <b-col>
          <b-form inline>
            <label class="mr-sm-2" for="group">Grupo</label>
            <b-form-select
                  id="group"
                  class="mt-2"
                  :options="groups"
                  :value="groups.value"
                  v-model="edit_users.group" 
                  @input="clearError('group', error_edit_users)" 
                  :state="error_edit_users.group"
                  ></b-form-select>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-modal>
      
    <!-- Modal de Excluir -->
    <b-modal id="modal-remove-users"
             size="lg"
             ok-title="Confirmar"
             cancel-title="Cancelar"
             @close="cancelRemoveUsers()"
             @ok.prevent="saveRemoveUsers()"
             button-size="sm"
             title="Excluir usuário">
      <p>
        Você tem certeza que deseja remover o usuário <b>{{remove_user.name}}</b>?
      </p>
    </b-modal>

    <!-- modal add users -->
    <div>
      <b-modal id="modal-new-users" 
                size="lg" 
                ok-title="Confirmar"
                cancel-title="Cancelar"
                @cancel="cancelNew()"
                @ok.prevent="saveNewUser()"
                button-size="sm"
                title="Novo Usuário">
          <b-row>
            <b-col>
              <label for="name">Nome Completo</label>
              <b-form-input id="name" type="text" size="sm" v-model="new_user.name" @input="clearError('name', error_new_users)" :state="error_new_users.name" placeholder="Ex: Maria Lopes da Silva"></b-form-input>
            </b-col>
            <b-col>
              <label for="email">Email</label>
              <b-form-input id="email" type="email" size="sm" v-model="new_user.email" @input="clearError('email', error_new_users)" :state="error_new_users.email" placeholder="Ex: example@example.com"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for="birth">Data de Nascimento</label>
              <b-form-input id="birth" type="date" size="sm" v-model="new_user.birth" @input="clearError('birth', error_new_users)" :state="error_new_users.birth"></b-form-input>
            </b-col>
            <b-col>
              <label for="phone">Telefone</label>
              <b-form-input id="phone" type="tel" size="sm" v-model="new_user.phone" @input="clearError('phone', error_new_users)" :state="error_new_users.phone" placeholder="Ex: (99) 99999-9999"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for="school">Escola</label>
              <b-form-input id="school" type="text" size="sm" v-model="new_user.school" @input="clearError('school', error_new_users)" :state="error_new_users.school" placeholder="Ex: E.E.B Escola Exemplo"></b-form-input>
            </b-col>
            <b-col>
              <label for="classroom">Turma</label>
              <b-form-input id="classroom" type="text" size="sm" v-model="new_user.classroom" @input="clearError('classroom', error_new_users)" :state="error_new_users.classroom" placeholder="Ex: 6º 02"></b-form-input>
            </b-col>
            <b-col>
              <label for="city">Cidade</label>
              <b-form-input id="city" type="text" size="sm" v-model="new_user.city" @input="clearError('city', error_new_users)" :state="error_new_users.city" placeholder="Ex: São Paulo"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for="status">O usuário é um administrador?</label>
              <b-form-checkbox
                id="status"
                v-model="new_user.status"
                switch
                name="status"
                value="Sim"
                unchecked-value="Não"
              >
                {{status}}
              </b-form-checkbox>
            </b-col>
            <b-col>
              <b-form inline>
                <label class="mr-sm-2" for="group">Grupo</label>
                <b-form-select
                  id="group"
                  class="mt-2"
                  :options="groups"
                  :value="groups.value"
                  v-model="new_user.group" 
                  @input="clearError('group', error_new_users)" 
                  :state="error_new_users.group"
                ></b-form-select>
              </b-form>
            </b-col>
            <b-col>
            </b-col>
          </b-row>
        </b-modal>
      </div>
      <div>
        <b-modal ok-title="Confirmar"
        cancel-title="Cancelar"
        id="modal-remove-user"
        @ok.prevent="saveRemoveUser()"
        @close="cancelRemove()"
        title="Excluir usuário"
        button-size="sm">
        <p>Você tem certeza que deseja remover <b>{{remove_user.name}}</b> do sistema?</p>
        <p>Essa acão resultará na exclusão de todos os dados desse usuário e removerá o acesso do mesmo.</p>
        </b-modal>
      </div>
  </div>
</template>

<script>
  export default {
    components:{
    },
    data: () => ({
      fields: [
        {name: "Nome Completo"     },
        {name: "Email"             },
        {name: "Data de Nascimento"},
        {name: "Telefone"          },
        {name: "Escola"            },
        {name: "Turma"             },
        {name: "Cidade"            },
        {name: "Administrador"     },
        {name: "Grupo"             },
        {name: "Editar"            },
        {name: "Excluir"           }
      ],
      items: [],
      remove_user: {
        id:   null,
        name: null
      },
      edit_users: {
        id:        null,
        name:      null,
        email:     null,
        birth:     null,
        phone:     null,
        school:    null,
        classroom: null,
        city:      null,
        status:    null,
        group:     null
      },
      new_user: {
        name:      null,
        email:     null,
        birth:     null,
        phone:     null,
        school:    null,
        classroom: null,
        city:      null,
        status:    null,
        group:     null
      },
      error_new_users: {
        id:        null,
        name:      null,
        email:     null,
        birth:     null,
        phone:     null,
        school:    null,
        classroom: null,
        city:      null,
        status:    null,
        group:     null
      },
      error_edit_users: {
        id:        null,
        name:      null,
        email:     null,
        birth:     null,
        phone:     null,
        school:    null,
        classroom: null,
        city:      null,
        status:    null,
        group:     null
      },
      selected: null,
      status: "Não",
      groups: [
        {value: null, text: '-- Selecione --', disabled: true }
      ]
    }),

    mounted() { 
      this.getUsers()
    },

    methods: {
      getUsers: function() {
        const service = this
        service.$axios({
          method: "GET",
          url: "http://localhost:8000/users",
        }).then((response) => {
          let users = response.data
          for (let index in users) {
            let user = users[index]

            const address = {
              city: undefined
            }
            const group = {
              name: undefined
            }
            const school = {
              name: undefined
            }
            const classroom = {
              name: undefined
            }

            if (!user.address) user.address = address
            if (!user.group) user.group = group
            if (!user.school) user.school = school
            if (!user.classroom) user.classroom = classroom
            user.birth = service.$moment().format('DD/MM/Y') //TODO ajustar com dia data certa

            service.items.push(user)
          }
        }).catch((error) => {
          console.error(error);
          service._toast("Erro ao requisitar informações do servidor", "error")
        })  
      },

      clearError: function(prop, error) {
        error[prop] = null
      },

      saveNewUser: function() {
        if (!this.validInputs(this.new_user, this.error_new_users))
          return false

        let userModal = this.new_user;
        delete userModal.school;
        delete userModal.classroom;
        delete userModal.address;
        userModal.birth = this.$moment(userModal.birth).format('DD/MM/Y');
        userModal.flagMaster = userModal.status ? 1 : 0;
        userModal.points = 0;
        userModal.extraTime = 0;
        this.$axios({
          method: "POST",
          url: "http://localhost:8000/users/create",
          data: userModal
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

      validInputs: function(data, error) {
        var list_fields = []
        var valid = true
           
        for (const prop in data) {
          if (this.regexTypes().includes(data[prop])){
            valid = false
            error[prop] = false
            list_fields.push(prop)
          }
        }
        var message = (list_fields.length > 1) ? "Os campos " : "O campo"
        list_fields.forEach(element => {
            if (element == "name")
              message += "<b> nome completo </b>,"
            else if(element == "email")
              message += "<b> email </b>,"
            else if(element == "birth")
              message += "<b> data de nascimento </b>,"
            else if(element == "phone")
              message += "<b> telefone </b>,"
            else if(element == "school")
              message += "<b> escola </b>,"
            else if(element == "classroom")
              message += "<b> turma </b>,"
            else if(element == "city")
              message += "<b> cidade </b>,"
            else
              message += "<b> grupo </b>,"
        })

        message = message.substring(0, message.length - 1)

        if(list_fields.length > 1) {
          var index = message.lastIndexOf(",");
          message = message.substring(0, index) + "e" + message.substring(index + 1);
        }
        message += (list_fields.length > 1) ? " são obrigatórios. " : "é obrigatório."

        if(!valid)
          this._toast(message, "error")

        return valid
      },

      saveRemoveUser: function() {
        this.$axios({
          method: 'DELETE',
          url:'http://localhost:8000/users/delete/' + this.remove_user.id
        }).then((response) => {
          if (response.status == 200)
            this._toast('Usuário removido com sucesso', 'success')
        }).catch((error) => {
          this._toast('Não foi possível excluir esse usuário, tente novamente mais tarde.', 'error')
          console.error(error);
        }).finally(() => {
          this.$root.$emit('bv::hide::modal', 'modal-remove-user')
        })
      },

      showModalEdit: function(item) {
        this.edit_users.id        = item.id;
        this.edit_users.name      = item.name;
        this.edit_users.email     = item.email;
        this.edit_users.birth     = item.birth;
        this.edit_users.phone     = item.phone;
        this.edit_users.school    = item.school;
        this.edit_users.classroom = item.classroom;
        this.edit_users.city      = item.city;
        this.edit_users.status    = item.status;
        this.edit_users.group     = item.group;
        this.$root.$emit('bv::show::modal', 'modal-edit-users')
      },

      showModalCreate: function() {
        this.$root.$emit('bv::show::modal', 'modal-new-users')
        this.getGroupsForRegistry()
      },

      showModalRemove: function(user) {
        this.remove_user.id = user.id,
        this.remove_user.name = user.name
        this.$root.$emit('bv::show::modal', 'modal-remove-user')
      },

      saveEditUser: function() {
        const service = this
        const userToEdit = service.edit_users
        if (!this.validInputs(this.edit_users, this.error_edit_users))
          return false

        let updated = {
          id:        userToEdit.id,
          name:      userToEdit.name,
          email:     userToEdit.email,
          birth:     userToEdit.birth,
          phone:     userToEdit.phone,
          school:    userToEdit.school,
          classroom: userToEdit.classroom,
          city:      userToEdit.city,
          status:    userToEdit.status,
          group:     userToEdit.group
        }

        this.$axios({
          method: "POST",
          url: "http://localhost:8000/users/update",
          data: updated
        }).then((response) => {
          if (response.status == 200){
            this._toast("Salvo com sucesso!", "success")
            this.$root.$emit('bv::hide::modal', 'modal-new-user')
          }
        }).catch((error) => {
          this._toast("Não foi possível salvar, tente novamente mais tarde.", "error")
          console.error(error);
        })
      },

      cancelRemove: function() {
        this.remove_user = {
          id:   null,
          name: null
        }
      },

      cancelEdit: function() {
        this.edit_users = {
          id:        null,
          name:      null,
          email:     null,
          birth:     null,
          phone:     null,
          school:    null,
          classroom: null,
          city:      null,
          status:    null,
          group:     null
        }
      },

      cancelNewUser: function() {
        this.new_user  = {
          id:        null,
          name:      null,
          email:     null,
          birth:     null,
          phone:     null,
          school:    null,
          classroom: null,
          city:      null,
          status:    null,
          group:     null
        }

        this.error_new_users = {
          id:        null,
          name:      null,
          email:     null,
          birth:     null,
          phone:     null,
          school:    null,
          classroom: null,
          city:      null,
          status:    null,
          group:     null
        }
      }, 

      getGroupsForRegistry: function() {
        this.$axios({
          method: "GET",
          url: "http://localhost:8000/groups",
        }).then((response) => {
          if (this.groups.length == 1) {
            let groups = response.data
            for (let index in groups) {
              let group = groups[index]
              let item = {
                value: group.id,
                text: group.name,
                disabled: false
              }
              this.groups.push(item)
            }
          }
        }).catch((error) => {
          console.error(error)
          this._toast("Erro ao requisitar informações do servidor", "error")
        })
      },
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

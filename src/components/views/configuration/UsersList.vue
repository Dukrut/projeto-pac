<template>
  <div class="body p-4">
      <h3><b-icon icon="person"></b-icon> Usuários</h3>
      <hr>
      <b-button-group class="mb-3 mt-2">
        <b-button size="sm" class="buttons" v-b-modal.modal-new-users><b-icon icon="plus"></b-icon> Novo Usuário</b-button>
      </b-button-group>

      <!--<table class="w-100 border">
        <thead class="text-center border header-table">
          <th class="p-2" v-for="field, index in fields" :key="index">{{field.name}}</th>
        </thead>
        <tbody class="border">
          <tr class="border text-center" :class="{'item-table-striped':index%2 == 0, 'item-table': index%2 != 0}" v-for="item,index in items" :key="index">
            <td class="p-2 border text-justify">{{item.name}}</td>
            <td class="p-2 border text-justify"> {{item.email}} </td>
            <td class="p-2 border text-justify"> {{item.birth}} </td>
            <td class="p-2 border text-justify"> {{item.phone}} </td>
            <td class="p-2 border text-justify"> {{item.school}} </td>
            <td class="p-2 border text-justify"> {{item.classroom}} </td>
            <td class="p-2 border text-justify"> {{item.city}} </td>
            <td class="p-2 border text-justify"> {{item.admin}} </td>
            <td class="p-2 border text-justify"> {{item.group}} </td>
            <td class="p-2 border text-center">
              <button class="btn-primary rounded" @click="showModalEdit(item)"><b-icon icon="pencil"></b-icon></button>
            </td>
            <td class="p-2 border text-center">
              <button class="btn-danger rounded" @click="showModalRemove(item)"><b-icon icon="trash"></b-icon></button>
            </td>
          </tr>
        </tbody>
      </table>-->
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
              <label for="fullname">Nome Completo</label>
              <b-form-input id="fullname" type="text" size="sm" v-model="new_user.fullname" @input="clearError('fullname', error_new_user)" :state="error_new_user.fullname" placeholder="Ex: Maria Lopes da Silva"></b-form-input>
            </b-col>
            <b-col>
              <label for="email">Email</label>
              <b-form-input id="email" type="email" size="sm" v-model="new_user.email" @input="clearError('email', error_new_user)" :state="error_new_user.email" placeholder="Ex: example@example.com"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for="birth">Data de Nascimento</label>
              <b-form-input id="birth" type="date" size="sm" v-model="new_user.birth" @input="clearError('birth', error_new_user)" :state="error_new_user.birth"></b-form-input>
            </b-col>
            <b-col>
              <label for="phone">Telefone</label>
              <b-form-input id="phone" type="tel" size="sm" v-model="new_user.phone" @input="clearError('phone', error_new_user)" :state="error_new_user.phone" placeholder="Ex: (99) 99999-9999"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for="school">Escola</label>
              <b-form-input id="school" type="text" size="sm" v-model="new_user.school" @input="clearError('school', error_new_user)" :state="error_new_user.school" placeholder="Ex: E.E.B Escola Exemplo"></b-form-input>
            </b-col>
            <b-col>
              <label for="classroom">Turma</label>
              <b-form-input id="classroom" type="text" size="sm" v-model="new_user.classroom" @input="clearError('classroom', error_new_user)" :state="error_new_user.classroom" placeholder="Ex: 6º 02"></b-form-input>
            </b-col>
            <b-col>
              <label for="city">Cidade</label>
              <b-form-input id="city" type="text" size="sm" v-model="new_user.city" @input="clearError('city', error_new_user)" :state="error_new_user.city" placeholder="Ex: São Paulo"></b-form-input>
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
                  :options="options"
                  :value="options.value"
                  v-model="new_user.group" 
                  @input="clearError('group', error_new_user)" 
                  :state="error_new_user.group"
                ></b-form-select>
              </b-form>
            </b-col>
            <b-col>
            </b-col>
          </b-row>
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
      new_user: {
        fullname: null,
        email: null,
        birth: null,
        phone: null,
        school: null,
        classroom: null,
        city: null,
        status: null,
        group: null
      },
      error_new_user: {
        fullname: null,
        email: null,
        birth: null,
        phone: null,
        school: null,
        classroom: null,
        city: null,
        status: null,
        group: null
      },
      items: [],
      selected: null,
      status: "Não",
      options: [
        {value: null, text: '-- Selecione --', disabled: true },
        {text: 'Professores', value:"teacher"},
        {text: 'Alunos', value:"students"}
      ]
    }),

    mounted() { 
      this.getUsers() 
    },

    methods: {
      getUsers: function() {
        this.$axios({
          method: "GET",
          url: "http://localhost:8080/users",
        }).then((response) => {
          let users = response.data;
          for (let index in users) {
            users[index].birth = this.formatDate(users[index].birth)
            this.items.push(users[index])
          }
        }).catch((error) => {
          console.error(error);
          // this._toast("Erro ao requisitar informações do servidor", "error")
        })  
      },

      formatDate: function(date) {
        let newDate = new Date(date)      
        return newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
      },

      clearError: function(prop, error) {
        error[prop] = null
      },

      saveNewUser: function() {
        if (!this.validInputs(this.new_user, this.error_new_user))
          return false

        // var json = this.new_user;
        return false;
        // console.log(json);
        // this.$axios({
        //   method: "POST",
        //   url: "http://localhost:8000/group/create",
        //   data: json
        // }).then((response) => {
        //   if (response.status == 200){
        //     this._toast("Salvo com sucesso!", "success")
        //     this.$root.$emit('bv::hide::modal', 'modal-new-group')
        //   }
        // }).catch((error) => {

        //   this._toast("Não foi possível salvar, tente novamente mais tarde.", "error")
        //   console.error(error);
        // })
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
           
        for(const prop in data) {
          if (this.regexTypes().includes(data[prop])){
            valid = false
            error[prop] = false
            list_fields.push(prop)
          }
        }
        var message = (list_fields.length > 1) ? "Os campos " : "O campo"
        list_fields.forEach(element => {
            if(element == "fullname")
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
            else if(element == "status")
              message += "<b> status </b>,"
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

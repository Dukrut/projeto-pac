<template>
  <div class="body p-4">
      <h3><b-icon icon="person"></b-icon> Usuários</h3>
      <hr>
      <b-button-group class="mb-3 mt-2">
        <b-button size="sm" class="buttons" v-b-modal.modalUsers><b-icon icon="plus"></b-icon> Novo Usuário</b-button>
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

      <!-- modal add users -->
      <div>
        <b-modal id="modalUsers" size="lg" title="Novo Usuário">
          <b-row>
            <b-col>
              <label for="fullname">Nome Completo</label>
              <b-form-input id="fullname" type="text" size="sm" placeholder="nome completo"></b-form-input>
            </b-col>
            <b-col>
              <label for="email">Email</label>
              <b-form-input id="email" type="email" size="sm" placeholder="example@example.com"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col>
              <label for="birth">Data de Nascimento</label>
              <b-form-input id="birth" type="date" size="sm" placeholder="00/00/0000"></b-form-input>
            </b-col>
            <b-col>
              <label for="phone">Telefone</label>
              <b-form-input id="phone" type="tel" size="sm" placeholder="Ex: (99) 99999-9999"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col>
              <label for="school">Escola</label>
              <b-form-input id="school" type="text" size="sm" placeholder="nome da escola"></b-form-input>
            </b-col>
            <b-col>
              <label for="classroom">Turma</label>
              <b-form-input id="classroom" type="text" size="sm" placeholder="Ex: 6º 02"></b-form-input>
            </b-col>
            <b-col>
              <label for="city">Cidade</label>
              <b-form-input id="city" type="text" size="sm" placeholder="Ex: São Paulo"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-2">
            <b-col>
              <!-- <b-form-group label="O usuário é um administrador?" v-model="level">
                <b-form-radio value="yes" v-model="new_user.admin">Sim</b-form-radio>
                <b-form-radio value="no" v-model="new_user.admin">Não</b-form-radio>
              </b-form-group> -->
            </b-col>
            <b-col>
              <b-form inline>
                <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
                <b-form-select
                  id="inline-form-custom-select-pref"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :options="[{ text: 'Choose...', value: null }, 'One', 'Two', 'Three']"
                  :value="null"
                ></b-form-select>
              </b-form>
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
      items: [],
      selected: null,
      options: [
        {value: null, text: '-- Selecione --', disabled: true },
        {text: 'Sim' },
        {text: 'Não' }
      ]
    }),

    mounted() { this.getUsers() },

    methods: {

      getUsers: function() {
        this.$axios({
          method: "GET",
          url: "http://localhost:8000/users",
        }).then((response) => {
          let users = response.data;
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
            user.birth = this.formatDate(user.birth)

            this.items.push(user)
          }
        }).catch((error) => {
          console.error(error);
          // this._toast("Erro ao requisitar informações do servidor", "error")
        })  
      },

      formatDate: function(date) {
        let newDate = new Date(date)      
        return newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
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

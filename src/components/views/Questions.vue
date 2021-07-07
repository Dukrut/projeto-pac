<template>
  <div class="body p-4">
    <h3><b-icon icon="puzzle"></b-icon> Questões</h3>
    <hr>
    <b-button-group class="mb-3 mt-2">
      <b-button size="sm" class="buttons"><b-icon icon="plus"></b-icon> Nova questão</b-button>
    </b-button-group>
      <table class="w-100 border">
        <thead class="text-center border header-table">
          <th class="p-2" v-for="field, index in fields" :key="index"> {{field.name}} </th>
        </thead>
        <tbody class="border">
          <tr class="border text-center" :class="{'item-table-striped':index % 2 == 0, 'item-table': index % 2 != 0}" v-for="item, index in items" :key="index">
            <td class="p-2 border text-justify"> {{item.title}} </td>
            <td class="p-2 border text-justify"> {{item.description}} </td>
            <td class="p-2 border text-justify"> {{item.level}} </td>
            <td class="p-2 border text-justify"> {{item.correctResponse}} </td>
            <td class="p-2 border text-center">
              <button class="btn-warning rounded" @click="showModalDetail(item)"><b-icon icon="arrow-up-right"></b-icon></button>
            </td>
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
    <b-modal ok-title="Confirmação"
             cancel-title="Cancelar"
             id="modal-remove-question"
             @ok.prevent="removeQuestion(item)"
             @close="cancelRemove()"
             title="Excluir questão"
             button-size="sm">
      <p>
        Você tem certeza que deseja remover a questão <b>{{remove_question.title}}</b>?
      </p>
    </b-modal>

    <!-- Modal de Edição -->
    <b-modal ok-title="Confirmar"
             cancel-title="Cancelar"
             id="modal-edit-question"
             @ok.prevent="cancelEdit()"
             @close="cancelEdit()"
             @cancel="cancelEdit()"
             title="Editar Questão"
             button-size="sm"
             size="lg">
    <div class="p-4">
      <b-row>
        <b-col>
          <label>Título:</label>
          <b-form-input v-model="edit_question.title" id="title" type="text" size="sm" placeholder="Ex: Question 1"></b-form-input>
        </b-col>
        <b-col>
          <label>Dificuldade:</label>
          <b-form-select 
            v-model="edit_question.level" 
            :options="levelOpt"
            class="mb-3"
            id="level"
          ></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
            <label>Descrição:</label>
            <b-form-textarea
              id="description"
              v-model="edit_question.description"
              placeholder="Ex: Quanto é o resultado da soma de 1 + 1?"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b>Alternativas</b>
          <div v-for="alternative, index in edit_question.alternatives" :key="index">
            <b>{{alternative.option}}:&nbsp;</b>
            <b-form-input v-model="alternative.description" type="text" size="sm" placeholder="Ex: Question 1"></b-form-input>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b></b>
        <b-col>
          <b>Alternativa correta</b>
          <b-form-group>
            <b-form-radio-group
              class="pt-2"
              v-model="edit_question.correctResponse"
              :options="['A', 'B', 'C', 'D', 'E']"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    </b-modal>

    <!-- Modal de Detalhe -->
    <b-modal ok-title="Ok"
             cancel-title="Cancelar"
             id="modal-detail-question"
             @ok.prevent="closeDetail()"
             @close="closeDetail()"
             @cancel="closeDetail()"
             title="Detalhamento"
             button-size="sm"
             size="lg">

    <div class="d-33">
      <p id="title" type="text" class="form-control-sm"><span><b>Título:&nbsp;</b></span>{{question.title}}</p>
      <p id="level" type="text" class="form-control-sm"><span><b>Dificuldade:&nbsp;</b></span>{{question.level}}</p>
      <p id="correctResponse" type="text" class="form-control-sm text-right"><span><b>Alternativa correta:&nbsp;</b></span>{{question.correctResponse}}</p>
    </div>
    <p id="description" type="text" class="form-control-sm"><span><b>Descrição:&nbsp;</b></span>{{question.description}}</p>
    <hr>
    <div v-for="alternative, index in question.alternatives" :key="index">
      <div><b>{{alternative.option}}:&nbsp;</b>{{alternative.description}}</div>
    </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({
    fields: [
      {name: "Título"              },
      {name: "Descrição"           },
      {name: "Dificuldade"         },
      {name: "Alternativa correta" },
      {name: "Detalhar"            },
      {name: "Editar"              },
      {name: "Excluir"             }
    ],
    items: [],
    remove_question: {
      id: undefined,
      title: undefined
    },
    edit_question: {
      title: undefined,
      description: undefined,
      level: undefined,
      correctResponse: undefined,
      alternatives: []
    },
    question: {
      title: undefined,
      description: undefined,
      level: undefined,
      correctResponse: undefined,
      alternatives: []
    },
    selected: null,
    levelOpt: [
      {value: 1, text: "Fácil"  },
      {value: 2, text: "Médio"  },
      {value: 3, text: "Difícil"}
    ]
  }),

  mounted() { this.getQuestions() },

  methods: {

    _toast: function(_message, _type){
      this.$toast.open({
        message: _message,
        type: _type,
        position: "top-right",
      })
    },

    getQuestions: function() {
      const service = this
      service.$axios({
        method: "GET",
        url: "http://localhost:8000/questions",
      }).then((response) => {
        let questions = response.data
        for (let index in questions) {
          let question = questions[index]
          question.level = this.getLabelByLevel(question.level)
          service.items.push(question)
        }
      }).catch((error) => {
        console.error(error);
        service._toast("Erro ao requisitar informações do servidor", "error")
      })
    },

    getLabelByLevel: function(level) {
      if (level) {
        if (level == 1) {
          return 'Fácil'
        } else if (level == 2) {
          return 'Médio'
        } else {
          return 'Difícil'
        }
      }
    },

    showModalRemove: function (item = {}) {
      this.remove_question.title = item.title;
      this.remove_question.id = item.id;
      this.$root.$emit('bv::show::modal', 'modal-remove-question')
    },

    removeQuestion: function() {
      const service = this
      service.$axios({
        method: "DELETE",
        url: "http://localhost:8000/questions/delete/" + service.remove_question.id
      }).then((response) => {
        if (response.status == 200) {
          service._toast("Excluído com sucesso!", "success")
          service.items = [];
          service.getQuestions()
        }
      }).catch((error) => {
        service._toast("Não foi possível excluir essa questão, tente novamente mais tarde.", "error")
        console.error(error);
      }).finally(() => {
        service.$root.$emit('bv::hide::modal', 'modal-remove-question')
      })
    },

    cancelRemove: function(){
      this.remove_question = {
        id: undefined,
        title: undefined
      }
    },

    showModalEdit: function(item = {}) {
      const service = this
      service.edit_question.title = item.title
      service.edit_question.description = item.description
      service.edit_question.level = service.getIntValFromDisplay(item.level)
      service.edit_question.correctResponse = item.correctResponse
      service.edit_question.alternatives = item.alternatives
      this.$root.$emit('bv::show::modal', 'modal-edit-question')
    },

    editQuestion: function(item = {}) {
      console.log(item)
    },

    cancelEdit: function() {
      this.edit_question = {
        title: undefined,
        description: undefined,
        level: undefined,
        correctResponse: undefined,
        alternatives: []
      }
    },

    updateQuestion: function() {
      const service = this
      let question = service.edit_question
      service.$axios({
        method: 'POST',
        url: 'http://localhost:8000/questions/update',
        data: question
      }).then((response) => {
        if (response.status == 200) {
          this._toast("Salvo com sucesso!", "success")
          this.$root.$emit('bv::hide::modal', 'modal-edit-group')
        }
      }).catch((error) => {
        this._toast("Não foi possível salvar, tente novamente mais tarde.", "error")
        console.error(error);
      })
    },

    showModalDetail: function(item = {}) {
      const service = this
      service.question.title = item.title
      service.question.description = item.description
      service.question.level = item.level
      service.question.correctResponse = item.correctResponse
      service.question.alternatives = item.alternatives
      this.$root.$emit('bv::show::modal', 'modal-detail-question')
    },

    closeDetail: function() {
      this.$root.$emit('bv::hide::modal', 'modal-detail-question')
    },

    getIntValFromDisplay: function(display) {
      if (display) {
        if (display == 'Fácil') {
          return 1
        } else if (display == 'Médio') {
          return 2
        } else {
          return 3
        }
      }
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
  .d-33 {
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }
</style>

<template>
  <div class="body">
    <b-navbar class="navbar" type="dark">
      <b-navbar-nav>
        <b-nav-item @click="changeView('Desafios')"><b-icon icon="tv"></b-icon> Desafios</b-nav-item>
        <b-nav-item @click="changeView('Ranking')"><b-icon icon="star"></b-icon> Ranking</b-nav-item>
        <b-nav-item @click="changeView('Relatórios')"><b-icon icon="file-bar-graph"></b-icon> Relatórios</b-nav-item>
        <b-nav-item @click="changeView('Questões')"><b-icon icon="question-circle"></b-icon> Questões</b-nav-item>
        <b-nav-item-dropdown>
          <template v-slot:button-content>
            <b-icon icon="gear"></b-icon> Configurações
          </template>
          <b-dropdown-item @click="changeView('Usuários')"><b-icon icon="person"></b-icon> Usuários</b-dropdown-item>
          <b-dropdown-item @click="changeView('Grupos')"><b-icon icon="people"></b-icon> Grupos</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item>Sair</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div>
      <users-list v-if="view == 'Usuários' && user.action.viewUsers"></users-list>
      <group-list v-else-if="view == 'Grupos' && user.action.viewGroups"></group-list>
      <challenges :user='user' v-else-if="view == 'Desafios'"></challenges>
      <ranking v-else-if="view == 'Ranking' && user.permission.viewRanking"></ranking>
      <questions v-else-if="view == 'Questões'"></questions>
      <reports v-else-if="view == 'Relatórios'"></reports>
    </div>

  </div>
</template>

<script>
import UsersList from '../views/configuration/UsersList.vue'
import GroupList from '../views/configuration/GroupList.vue'
import Challenges from '../views/Challenges.vue'
import Ranking from '../views/Ranking.vue'
import Questions from '../views/Questions.vue'
import Reports from '../views/Reports.vue'

export default {
  props: {
    user: JSON.parse(sessionStorage.getItem('user'))
  },
  components:{
    UsersList,
    GroupList,
    Challenges,
    Ranking,
    Questions,
    Reports
  },
  data: () => ({
    view: "Desafios",
    user: JSON.parse(sessionStorage.getItem('user'))
  }),

  mounted() {
    console.log(this.user)
  },

  methods: {
    changeView: function(view){
      this.view = view
    }
  }
}
</script>

<style>
  .navbar{
    background-color: #1A526B
  }
</style>

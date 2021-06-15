<template>
  <div class="body">
    <b-navbar class="navbar" type="dark">
      <b-navbar-nav>
        <b-nav-item @click="changeView('Desafios')"><b-icon icon="tv"></b-icon> Desafios</b-nav-item>
        <b-nav-item><b-icon icon="star"></b-icon> Ranking</b-nav-item>
        <b-nav-item><b-icon icon="file-bar-graph"></b-icon> Relatórios</b-nav-item>
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
      <users-list v-if="view == 'Usuários'"></users-list>
      <group-list v-else-if="view == 'Grupos'"></group-list>
      <challenges v-else-if="view == 'Desafios'"></challenges>
    </div>

  </div>
</template>

<script>
import UsersList from '../views/configuration/UsersList.vue';
import GroupList from '../views/configuration/GroupList.vue';
import Challenges from '../views/Challenges.vue';

export default {
  components:{
    UsersList,
    GroupList,
    Challenges
  },
  data: () => ({
    view: "Desafios",
  }),
  methods: {
    changeView: function(view){
      this.view = view;
    }
  }
}
</script>

<style>
  .navbar{
    background-color: #1A526B
  }
</style>

<template>
  <div class="body">
    <b-navbar class="navbar">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Configurações" right>
          <b-dropdown-item @click="changeView('Usuários')"><b-icon icon="person"></b-icon> Usuários</b-dropdown-item>
          <b-dropdown-item @click="changeView('Grupos')"><b-icon icon="people"></b-icon> Grupos</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <div>
      <users-list v-if="view == 'Usuários'"></users-list>
      <group-list v-else-if="view == 'Grupos'"></group-list>
    </div>

  </div>
</template>

<script>
import UsersList from '../UsersList.vue';
import GroupList from '../GroupList.vue';

export default {
  components:{
    UsersList,
    GroupList
  },
  data: () => ({
    view: "home",
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
    background-color: #B9D6FF

  }
</style>

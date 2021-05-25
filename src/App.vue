<template>
  <v-app>
    <v-main>
      <Login/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>

<style media="screen">
  .body{
    height: 100vh;
    background: #F0F8FF;
    overflow: hidden;
  }
</style>

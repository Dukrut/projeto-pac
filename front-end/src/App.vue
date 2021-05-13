<template>
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/RegisterUser';

export default {
  name: 'App',

  components: {
    HelloWorld,
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

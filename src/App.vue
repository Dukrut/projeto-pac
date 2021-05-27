<template>
    <div>
      <router-link to="/login">Login</router-link>
      <router-link to="/system">Sistema</router-link>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'App',

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

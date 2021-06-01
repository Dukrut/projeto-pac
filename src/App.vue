<template>
    <div>
      <router-link to="/login"></router-link>
      <router-link to="/system"></router-link>
      <router-link to="/users"></router-link>
      <router-link to="/groups"></router-link>
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

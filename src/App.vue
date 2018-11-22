<template>
  <div id="vue-view">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from 'components/Navbar';
  export default {
    components: {
      Navbar,
    },
  };
</script>

<style src="../public/css/reset.css"></style>
<style src="../public/css/bootstrap.grid.css"></style>

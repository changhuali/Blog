<template>
  <div id="vue-view">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './Navbar';
  
  export default {
    components: {
      Navbar,
    },
  };
</script>

<style src="../../../public/css/reset.css"></style>
<style src="../../../public/css/common.css"></style>

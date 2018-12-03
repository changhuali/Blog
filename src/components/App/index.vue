<template>
  <div id="vue-view">
    <div :class="$style['app-header']">
      <Navbar></Navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  /* import global css
  ** Must first than Components for override
  */
  import '../../../public/css/reset.css';
  import '../../../public/css/common.css';

  import Navbar from './Navbar';

  export default {
    components: {
      Navbar,
    },
  };
</script>

<style src="./index.less" module></style>

<template>
  <div class="header">
    <nav class="container">
      <a v-for="navInfo in navbar.navConfig" :href="navInfo.url">{{navInfo.label}}</a>
    </nav>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState('navbar', {
        navbar: state => state,
      }),
    }
  };
</script>

<style src="./index.less" scoped></style>

<template>
  <div class="header">
    <div class="container header-center">
      <a class="app-logo">Li blog</a>
      <nav>
        <router-link
          v-for="navInfo in navbar.navConfig"
          active-class="nav-active"
          :to="navInfo.url"
        >
          {{navInfo.label}}
        </router-link>
      </nav>
    </div>
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

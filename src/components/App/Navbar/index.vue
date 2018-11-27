<template>
  <div class="header">
    <div class="container header-center">
      <a class="app-logo">Li blog</a>
      <nav>
        <a
          v-for="navInfo in navbar.navConfig"
          :href="navInfo.url"
        >
          {{navInfo.label}}
        </a>
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

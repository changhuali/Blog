<template>
  <div class="container main">
    <MainList></MainList>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import MainList from './MainList';
  import Sidebar from './Sidebar';
  
  export default {
    components: {
      MainList,
      Sidebar,
    },
    computed: {
      ...mapState('user', {
        user: state => state
      }),
    },
    methods: {
      ...mapActions('user', [
        'updateValueAction',
      ]),
      ...mapMutations('user', [
        'updateValue',
      ]),
      handleUserClick(path, val) {
        this.updateValueAction({ path, val });
      },
    },
  };
</script>

<style src="./index.less"></style>

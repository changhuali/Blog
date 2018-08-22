<template>
  <div>
    <div class="username">{{user.username}}</div>
    <span>{{user.sex}}</span>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  export default {
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

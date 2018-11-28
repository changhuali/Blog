<template>
  <div class="box">
    <div class="title">About me</div>
    <div class="clearfix content">
      <img :src="headImg" />
      <p class="desc">
        Here is something about me!
      </p>
    </div>  
  </div>
</template>

<script>
  import headImg from 'img/about-me/head.jpg';

  export default {
    data: function() {
      return {
        headImg,
      };
    }
  };
</script>

<style src="./index.less" scoped></style>

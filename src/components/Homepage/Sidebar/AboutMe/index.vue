<template>
  <div :class="$style['about-me']">
    <div :class="$style['title']">个人信息</div>
    <div :class="$style['content']">
      <img :class="$style['head-img']" :src="headImg" />
      <div :class="$style['self-desc']">
        昵称：饭饭<br />
        职业：前端开发者<br />
        <span :class="$style['git-link']"></span>：<a href="https://github.com/changhuali" target="_blank">github</a><br />
        爱好：dnfer<br />
      </div>
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

<style src="./index.less" module></style>

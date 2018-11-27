<template>
  <div class="box">
    <h1>{{dataItem.title}}</h1>
    <p>{{dataItem.content}}</p>
    <div class="info">
      <span class="time">发布时间：{{dataItem.publishTime}}</span>
      <span class="read">阅读量：{{dataItem.readCount}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['dataItem'],
  };
</script>

<style src="./index.less" scoped></style>

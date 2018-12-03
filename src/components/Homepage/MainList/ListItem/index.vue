<template>
  <div :class="$style['item-box']">
    <h1 :class="$style['title']">{{dataItem.title}}</h1>
    <p :class="$style['content']">{{dataItem.content}}</p>
    <div :class="$style['info']">
      <span :class="$style['time']">发布时间：{{dataItem.publishTime}}</span>
      <span :class="$style['read']">阅读量：{{dataItem.readCount}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['dataItem'],
  };
</script>

<style src="./index.less" module></style>

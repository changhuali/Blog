<template>
  <div class="main">
    <ListFilter />
    <div class="list-box">
      <ListItem
        v-for="(dataItem, index) in list"
        :key="index"
        :dataItem="dataItem"
      />
    </div>
  </div>
</template>

<script>
  import ListFilter from './ListFilter';
  import ListItem from './ListItem';

  export default {
    components: {
      ListFilter,
      ListItem,
    },
    data: function() {
      return {
        list: [
          {
            title: '详解js原型，构造函数以及class之间的原型关系',
            category: 'share',
            content: '含义： 是一个函数的属性，这个属性是一个指针，指向一个对象作用： 构造函数调用 访问该构造函数所关联的原型对象 2. PROTO 含义： 是一个对象拥有的内置属性，是js内部使用寻找原型链的属性，通过该属性可以允许实例对象直接访问到原型 含义：原型对象的constructor 指向其构造函数,如果',
            publishTime: '2018-11-27 16:34:49',
            readCount: '0',
          },
          {
            title: '详解js原型，构造函数以及class之间的原型关系',
            category: 'share',
            content: '含义： 是一个函数的属性，这个属性是一个指针，指向一个对象作用： 构造函数调用 访问该构造函数所关联的原型对象 2. PROTO 含义： 是一个对象拥有的内置属性，是js内部使用寻找原型链的属性，通过该属性可以允许实例对象直接访问到原型 含义：原型对象的constructor 指向其构造函数,如果',
            publishTime: '2018-11-27 16:34:49',
            readCount: '0',
          },
          {
            title: '详解js原型，构造函数以及class之间的原型关系',
            category: 'share',
            content: '含义： 是一个函数的属性，这个属性是一个指针，指向一个对象作用： 构造函数调用 访问该构造函数所关联的原型对象 2. PROTO 含义： 是一个对象拥有的内置属性，是js内部使用寻找原型链的属性，通过该属性可以允许实例对象直接访问到原型 含义：原型对象的constructor 指向其构造函数,如果',
            publishTime: '2018-11-27 16:34:49',
            readCount: '0',
          },
        ],
      };
    }
  };
</script>

<style src="./index.less" scoped></style>

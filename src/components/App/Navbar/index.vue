<template>
  <div class="container" :class="$style['container']">
    <div ref="logo" :class="$style['logo']"></div>
    <nav :class="$style['nav']">
      <router-link
        v-for="navInfo in navbar.navConfig"
        :active-class="$style['active']"
        :to="navInfo.url"
        :key="navInfo.url"
        exact
      >
        {{navInfo.label}}
      </router-link>
    </nav>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import { mapState } from 'vuex';
  
  export default {
    mounted: function() {
      const { svgDom } = this.initSvg('logo');
      const svg = d3.select(svgDom);
      // draw a book
      const book = svg.append('g');
      book.append('path')
        .attr('d', 'M0 3 L0 23 L15 28 L30 23 L30 3 L15 8 Z')
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .attr('fill', '#666');
      book.append('path')
        .attr('d', 'M15 28 L15 8 Z')
        .attr('stroke', '#666');
      // draw text
      const pen = svg.append('g');
      pen.append('text')
        .text('饭')
        .attr('x', 12)
        .attr('y', 28)
        .attr('fill', '#fff')
        .attr('transform', 'scale(0.6), rotate(15)');
      pen.append('text')
        .text('饭')
        .attr('x', 20)
        .attr('y', 40)
        .attr('fill', '#fff')
        .attr('transform', 'scale(0.6), rotate(-15)');
    },
    computed: {
      ...mapState('navbar', {
        navbar: state => state,
      }),
    },
    methods: {
      initSvg: function(containerRef) {
        const graphBox = this.$refs[containerRef];
        const { width, height } = graphBox.getBoundingClientRect();
        const svgDom = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgDom.setAttribute('width', width);
        svgDom.setAttribute('height', height);
        graphBox.append(svgDom);
        return { svgDom, svgWidth: width, svgHeight: height };
      },
    },
  };
</script>

<style src="./index.less" module></style>

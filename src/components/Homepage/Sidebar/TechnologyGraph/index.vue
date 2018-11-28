<template>
  <div class="box">
    <div class="title">技术栈</div>
    <div ref="graphBox" class="graph-box">
      <!-- here is svg element -->
    </div>  
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import htmlIcon from 'img/technology-icon/html5-css3.png';
  import jsIcon from 'img/technology-icon/javascript.png';
  import reactIcon from 'img/technology-icon/react.png';
  import reduxIcon from 'img/technology-icon/redux.svg';
  import vueIcon from 'img/technology-icon/vue.png';
  import jqueyIcon from 'img/technology-icon/jquery.png';
  import gulpIcon from 'img/technology-icon/gulp.png';
  import bootstrapIcon from 'img/technology-icon/bootstrap.svg';
  import expressjsIcon from 'img/technology-icon/expressjs.png';
  import nodejsIcon from 'img/technology-icon/nodejs.svg';
  import webpackIcon from 'img/technology-icon/webpack.svg';
  
  export default {
    mounted: function() {
      const { svgDom, svgWidth, svgHeight } = this.initSvg('graphBox');
      const svg = d3.select(svgDom);

      const simulation = d3.forceSimulation(this.technologies)
        .force('charge', d3.forceManyBody().strength(-20).distanceMax(40))
        .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
        .on('tick', () => {
          circle
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
          image
            .attr('x', d => d.x - d.value * 2.5 / 2)
            .attr('y', d => d.y - d.value * 2.5 / 2);
        });
      const nodes = simulation.nodes();

      const scaleColor = d3.scaleOrdinal(d3.schemeCategory10);

      const nodeG = svg
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .call(d3.drag()
          .on('start', d => {
            if (!d3.event.active) simulation.alphaTarget(0.2).restart();
            d.fx = d.x;
					  d.fy = d.y;
          })
          .on('drag', d =>{
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = d3.event.x;
					  d.fy = d3.event.y;
          })
          .on('end',d => {
            d.fx = null;
					  d.fy = null;
          })
        );
      const circle = nodeG
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.value * 2)
        .attr('fill', d => scaleColor(d.category));
      const image = nodeG
        .append('image')
        .attr('xlink:href', d => d.icon)
        .attr('x', d => d.x - d.value * 2.5 / 2)
        .attr('y', d => d.y- d.value * 2.5 / 2)
        .attr('width', d => d.value * 2.5)
        .attr('height', d => d.value * 2.5);
    },
    data: function() {
      return {
        technologies: [
          {
            name: 'html5&css3',
            category: 'language',
            icon: htmlIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'javascript',
            category: 'language',
            icon: jsIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'react',
            category: 'library',
            icon: reactIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'redux',
            category: 'library plugin',
            icon: reduxIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'vue',
            category: 'library',
            icon: vueIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'jquery',
            category: 'library',
            icon: jqueyIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'bootstrap',
            category: 'library',
            icon: bootstrapIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'expressjs',
            category: 'framework',
            icon: expressjsIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'nodejs',
            category: 'backend',
            icon: nodejsIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'webpack',
            category: 'workflow',
            icon: webpackIcon,
            desc: '',
            value: 10,
          },
          {
            name: 'gulp',
            category: 'workflow',
            icon: gulpIcon,
            desc: '',
            value: 10,
          },
        ],
      }
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

<style src="./index.css" scoped></style>

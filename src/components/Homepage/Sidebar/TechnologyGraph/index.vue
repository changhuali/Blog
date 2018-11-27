<template>
  <div class="box">
    <div class="title">Technology graph</div>
    <div ref="graphBox" class="graph-box">
      <!-- here is svg element -->
    </div>  
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    mounted: function() {
      const { svgDom, svgWidth, svgHeight } = this.initSvg('graphBox');
      const svg = d3.select(svgDom);

      const simulation = d3.forceSimulation(this.technologies)
        .force('charge', d3.forceManyBody().strength(-30).distanceMax(50))
        .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
        .on('tick', () => {
          circle
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        });
      const nodes = simulation
        .nodes();

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
        .attr('cx', d => {
          return d.x;
        })
        .attr('cy', d => {
          return d.y;
        })
        .attr('r', d => d.value / 5)
        .attr('fill', d => scaleColor(d.category));
    },
    data: function() {
      return {
        technologies: [
          {
            name: 'html',
            category: 'language',
            icon: '',
            desc: '',
            value: 100,
          },
          {
            name: 'javascript',
            category: 'language',
            icon: '',
            desc: '',
            value: 100,
          },
          {
            name: 'css',
            category: 'language',
            icon: '',
            desc: '',
            value: 100,
          },
          {
            name: 'react',
            category: 'library',
            icon: '',
            desc: '',
            value: 80,
          },
          {
            name: 'vue',
            category: 'library',
            icon: '',
            desc: '',
            value: 80,
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

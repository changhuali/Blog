<template>
  <div class="aside-box">
    <AboutMe />
    <TechnologyGraph />
  </div>
</template>

<script>
  import AboutMe from './AboutMe';
  import TechnologyGraph from './TechnologyGraph';

  export default {
    components: {
      AboutMe,
      TechnologyGraph,
    },
  };
</script>

<style src="./index.less" scoped></style>

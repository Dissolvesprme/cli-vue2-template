<template>
  <div class="layout">
    <TopHeader />
    <div class="container">
      <NavSide />
      <router-view />
    </div>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue';
import NavSide from './components/navSide.vue';
import './index.moudle.scss';

export default {
  name: 'layout',
  components: {
    TopHeader,
    NavSide
  },
  data() {
    return {};
  },
  mounted() {
    console.log('函数test');
  }
};
</script>

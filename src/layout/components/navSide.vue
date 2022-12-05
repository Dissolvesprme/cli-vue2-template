<template>
  <div class="container-side">
    <aside class="aside">侧边栏</aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name);
      tab.name === 'three' && this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.top-header {
  position: relative;
  z-index: 10;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  height: 64px;
}
.logo {
  height: 64px;
  padding-left: 40px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  font-family: Avenir, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
  line-height: 64px;
  white-space: nowrap;
  text-decoration: none;
}
.content {
  /* height: 10px; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* padding: 10px 10px; */
}
</style>

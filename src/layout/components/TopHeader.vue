<template>
  <div class="container">
    <header class="top-header">
      <el-row>
        <el-col :span="6">
          <div class="logo">组件管理平台</div>
        </el-col>
        <!-- <el-col :span="18" class="left">
        <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="组件" name="first"></el-tab-pane>
            <el-tab-pane label="模板" name="second"></el-tab-pane>
            <el-tab-pane label="实验页" name="three"></el-tab-pane>
          </el-tabs>
        </div>
      </el-col> -->
      </el-row>
    </header>
    <side class="left-side"> 这是侧边栏 </side>
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

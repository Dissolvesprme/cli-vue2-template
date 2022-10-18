<template>
  <div class="layout">
    <TopHeader />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";

export default {
  name: "layout",
  components: {
    TopHeader,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>

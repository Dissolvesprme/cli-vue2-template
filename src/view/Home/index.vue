<template>
  <div class="testbox">
    <UploadBox />
  </div>
</template>

<script>
import UploadBox from "../../components/UploadBig/index.vue";
export default {
  name: "Home",
  components: {
    UploadBox,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
// .test {
//   height: 100%;
//   width: 100%;
// }
</style>

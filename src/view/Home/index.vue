<template>
  <div class="testbox">
    <!-- <UploadBox /> -->
    <Table></Table>
  </div>
</template>

<script>
// import UploadBox from '../../components/UploadBig/index.vue';
import Table from '@/components/Table/index.vue';

export default {
  name: 'NewHome',
  components: {
    // UploadBox,
    Table
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.testbox {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>

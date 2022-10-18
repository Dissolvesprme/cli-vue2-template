<template>
  <div class="file-upload-fragment">
    <div class="file-upload-fragment-container">
      <el-upload
        class="fufc-upload"
        action=""
        :on-change="handleFileChange"
        :auto-upload="false"
        :show-file-list="false"
      >
        <template #trigger>
          <el-button class="fufc-upload-file" size="small" type="primary">
            选择文件
          </el-button>
        </template>
        <el-button
          class="fufc-upload-server"
          size="small"
          type="success"
          @click="handleUploadFile"
        >
          上传到服务器
        </el-button>
        <el-button
          class="fufc-upload-stop"
          size="small"
          type="primary"
          @click="stopUpload"
        >
          暂停上传
        </el-button>
        <el-button
          class="fufc-upload-continue"
          size="small"
          type="success"
          @click="continueUpload"
          >继续上传</el-button
        >
      </el-upload>
      <el-progress :percentage="percentage" color="#409eff" />
    </div>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
export default {
  name: 'UploadBig',
  components: {},
  data() {
    return {
      percentage: 0,
      currentFile: null,
      chunkSize: 5 * 1024 * 1024
    };
  },
  metheds: {
    // change事件
    handleFileChange(file) {
      if (!file) return;
      this.currentFile = file;
    },
    // 创建切片
    createChunkList(file, chunkSize) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push(file.splice(cur, cur + chunkSize)); // 分片
        cur += chunkSize;
      }
      return fileChunkList;
    },
    // 标识Hash
    createMD5(fileChunkList) {
      return new Promise((resolve, reject) => {
        const slice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice;
        const chunks = fileChunkList.length;
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();
        // 读取文件切片
        fileReader.onload = function (e) {
          spark.append(e.target.result);
          currentChunk++;
          if (currentChunk < chunks) {
            loadChunk();
          } else {
            // 读取切片，返回最终文件的Hash值
            resolve(spark.end());
          }
        };
        fileReader.onerror = function (e) {
          reject(e);
        };
        function loadChunk() {
          fileReader.readAsArrayBuffer(fileChunkList[currentChunk]);
        }
        loadChunk();
      });
    },
    // 上传click事件
    handleUploadFile() {},
    // 暂停上传
    stopUpload() {},
    // 继续上传
    continueUpload() {}
  }
};
</script>

<style scoped lang="scss">
.file-upload-fragment {
  width: 100%;
  height: 100%;
  padding: 10px;
  &.container {
    position: relative;
    margin: 0 auto;
    width: 600px;
    height: 300px;
    top: calc(50% - 150px);
    min-width: 400px;
    .fufc-upload {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .el-progress {
      margin-top: 10px;
      /deep/.el-progress__text {
        min-width: 0px;
      }
    }
  }
}
</style>

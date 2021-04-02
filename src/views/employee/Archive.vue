<template>
  <div class="main">
    <div class="text-center">
      <h1
        class="primary"
        style="display: inline-block; font-size: 28px; margin-bottom: 0"
      >
        就职经历
      </h1>
    </div>
    <div class="archive">
      <el-timeline>
        <el-timeline-item
          v-for="item in archive"
          :timestamp="item.hireDate"
          :key="item"
          placement="top"
        >
          <el-card shadow="hover">
            <h4>就职于 {{ item.company.name }}</h4>
            <p>就职时间： {{ item.hireDate }} ----- {{ item.departureDate }}</p>
            <el-collapse-item style="text-align: left" title="详细内容">
              {{ item.content }}
            </el-collapse-item>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { get_archive } from '/src/api/archive.js'
export default {
  name: 'index',
  data() {
    return {
      archive: {},
    }
  },
  created() {
    get_archive().then((res) => {
      this.archive = res.data.data
    })
  },
  mounted() {},
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #f7f8ff !important;
}
</style>

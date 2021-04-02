<template>
  {{ archives }}
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="整体浏览">
        <basic />
      </el-tab-pane>
      <el-tab-pane label="具体信息">
        <detail />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import basic from './components/basic.vue'
import detail from './components/detail.vue'
import { get_company_archive } from '/src/api/archive.js'
export default {
  name: '',
  components: { basic, detail },
  data() {
    return {
      archives: [],
    }
  },
  created() {
    get_company_archive().then((res) => {
      this.archives = res.data.data
    })
  },
  methods: {},
}
</script>

<style scoped></style>

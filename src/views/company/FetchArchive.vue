<template>
  <el-button type="primary" @click="authorization">获取档案信息</el-button>
</template>

<script>
export default {
  name: '',
  components: {},
  mounted() {},
  data() {
    return {}
  },
  methods: {
    authorization() {
      this.$prompt('请输入授权码', '调取档案', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.$message.success('获取成功')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
  },
}
</script>

<style scoped></style>

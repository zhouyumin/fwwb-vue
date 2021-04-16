<template>
  <el-menu
    :default-active="$route.path"
    :collapse="isCollapse"
    background-color="#263238"
    text-color="#8A979Eee"
    active-text-color="#fff"
    router
    class="el-menu-vertical"
  >
    <el-menu-item index="" class="brand">
      <i class="el-icon-coordinate"></i>
      <template #title><span>今目标</span> </template>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>

    <el-submenu index="/manage/basic">
      <template #title>
        <i class="el-icon-document"></i>
        <span>档案记录</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/manage/basic">
          <template #title>
            <i class="el-icon-s-data"></i>
            <span>整体浏览</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/detail">
          <template #title>
            <i class="el-icon-s-grid"></i>
            <span>具体信息</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/add">
      <i class="el-icon-folder-add"></i>
      <template #title>添加档案</template>
    </el-menu-item>
    <el-menu-item index="/fetch" @click="fetch">
      <i class="el-icon-search"></i>
      <template #title>调取档案</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { get_company_archive } from '/src/api/archive.js'

export default {
  props: {
    isCollapse: false,
  },
  data() {
    return {
      archives: [],
    }
  },
  methods: {
    fetch() {
      this.$prompt('请输入授权码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
      })
        .then(({ value }) => {
          this.$router.push({
            name: 'fetch',
            params: {
              authorization: value,
            },
          })
        })
        .catch(() => {
          /*取消输入后，跳转至档案管理页面*/
          this.$message.warning('取消输入')
          this.$router.push('manage')
        })
    },
  },
  created() {},
}
</script>

<style scoped lang="less">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.brand {
  height: 60px;
  background-color: #409eff !important;
  line-height: 60px;
  font-size: 24px !important;
  color: #fff !important;
  i {
    font-size: 24px;
    color: #fff;
  }
}
.el-menu {
  border-right: none;
}
</style>

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
    <el-menu-item index="/manage">
      <i class="el-icon-document"></i>
      <template #title>档案管理</template>
    </el-menu-item>
    <el-menu-item index="/add">
      <i class="el-icon-s-promotion"></i>
      <template #title>添加档案</template>
    </el-menu-item>
    <el-menu-item index="/fetch">
      <i class="el-icon-present"></i>
      <template #title >调取档案</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: false,
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
}
</script>

<style scoped lang="less">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 180px;
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

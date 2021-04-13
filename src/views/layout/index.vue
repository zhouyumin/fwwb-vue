<template>
  <el-container class="full-screen" v-loading="loading">
    <el-aside width="auto">
      <company-menu-side
        v-show="identity == 'Company'"
        :isCollapse="isCollapse"
        style="height: 100%"
      />
      <employee-menu-side
        v-show="identity == 'Employee'"
        :isCollapse="isCollapse"
        style="height: 100%"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="flex">
          <span
            :class="{
              'el-icon-s-fold': !isCollapse,
              'el-icon-s-unfold': isCollapse,
            }"
            class="icon pointer"
            @click="isCollapse = !isCollapse"
          ></span>
          <span class="title">{{ title }}</span>
        </div>
        <div class="logout success pointer flex">
          <span class="el-icon-switch-button"></span>
          <span @click="onLogOut">安全退出</span>
        </div>
      </el-header>
      <el-main class="main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CompanyMenuSide from '@/company/MenuSide.vue'
import EmployeeMenuSide from '@/employee/MenuSide.vue'
import { logout } from '/src/api/user.js'
import { getUserProfile } from '/src/api/user.js'
import {get_company_archive} from "../../api/archive";
export default {
  components: {
    CompanyMenuSide,
    EmployeeMenuSide,
  },
  created() {
    getUserProfile()
      .then((res) => {
        const data = res.data.data
        this.identity = data.business_number != null ? 'Company' : 'Employee'
        this.loading = false
        this.title = data.name
        if (this.identity === 'Company') {
          this.$store.commit('setCompany', data)
          get_company_archive().then((r) => {
            this.$store.commit('setArchive', r.data.data)
          })
        } else if (this.identity === 'Employee') {
          this.$store.commit('setEmployee', data)
        }
      })
      .catch((err) => {
        if (err.msg === '未审核') {
          this.$router.replace({
            name: 'authorization',
            params: { identity: err.data.identity },
          })
        }
      })
  },
  data() {
    return {
      isCollapse: false,
      title: '',
      identity: '',
      loading: true
    }
  },
  methods: {
    onLogOut() {
      this.$confirm('确认退出？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          logout().then(() => {
            window.localStorage.removeItem('authorization')
          })
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出登录成功',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录',
          })
        })
    },
  },
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  span {
    line-height: 60px;
  }
  .icon {
    font-size: 24px;
    margin-right: 16px;
  }
  .title {
    font-size: 16px;
  }
}

.logout {
  i {
    margin-right: 5px;
  }
}

.main {
  background-color: #e9eef3;
  padding: 0;
}

.main_cont {
  min-height: 700px;
}

.avatar-wrap {
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.text-white-50 {
  color: black;
  font-size: 14px;
  text-decoration: none;
}
</style>

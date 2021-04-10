<template>
  <archive-info :info="info" ></archive-info>
</template>

<script>
import {fetch_archive} from '/src/api/archive'
import {Msg} from '/src/utils/pubMethod.js'
import archiveInfo from './components/archiveInfo.vue'

export default {
  name: "fetch",
  components: {archiveInfo},
  data() {
    return {
      ArchiveData: [],
      code: 0,
      req:{},
      info:{}
    }
  },
  methods: {
    /*跳出弹框要求输入授权码*/
    getAuthorization() {
      this.$prompt('请输入授权码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
      }).then(({value}) => {
        /*判断授权码的返回值*/
        this.req.authorization = value
        this.getDataByCode(this.req)
      }).catch(() => {
        /*取消输入后，跳转至档案管理页面*/
        Msg(this.$message, 'warning', '取消输入')
        this.$router.push('manage')
      });
    },
    getDataByCode(data) {
      /*调取“通过授权码获取相应数据”的接口，获取返回数据*/
      fetch_archive(data)
        .then((result) => {
          if (result.data.data != null ) {
            this.info = result.data.data
            Msg(this.$message, 'success', '调取成功： ' +data.authorization)
            /*******操作********/
          } else{
            this.$alert('授权码无效，请重新输入', '提示', {
              type: 'warning',
              confirmButtonText: '确定',
              callback: action => {
                this.getAuthorization()
              }
            });
          }
        })
        .catch(err => {
          console.log(err)
          Msg(this.$message, 'error', '发生错误')
          return -1
       })
    }
  },
  watch: {
    $route(to,from){
      if (to.path==='/fetch'){
        this.info = {}
        this.getAuthorization()
      }
    },
  },
  mounted() {
    this.getAuthorization()
  }
}


</script>

<style scoped>

</style>
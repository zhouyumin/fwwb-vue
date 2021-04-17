<template>
  <el-skeleton :rows="12" animated :loading="archives.length < 1" />
  <archive-info :allInfo="archives" v-if="archives.length > 1" />
</template>
<script>
import { fetch_archive } from '/src/api/archive'
import { Msg } from '/src/utils/pubMethod.js'
import archiveInfo from './components/archiveInfo.vue'

export default {
  name: 'fetch',
  components: { archiveInfo },
  data() {
    return {
      archives: [],
    }
  },
  methods: {
    getInfo() {
      if (this.$route.params.authorization != '') {
        fetch_archive(this.$route.params.authorization)
          .then((result) => {
            if (result.data.data != null) {
              Msg(this.$message, 'success', '调取成功')
              this.archives = result.data.data
            }
          })
          .catch(() => {
            this.archives = []
          })
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.path.startsWith('/fetch')) {
        this.getInfo()
      }
    },
  },
  created() {
    this.getInfo()
  },
}
</script>

<style scoped></style>

<template>
  <el-dialog :title="$t('components.fileSelect.title')" v-model="show" @close="close" width="800px">
    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :action="uploadUrl"
        :headers="uploadHeaders"
        list-type="picture"
        :multiple="multiple"
        :data="{path: uploadPath}"
        :on-success="handleSuccess"
    >
      <template #trigger>
        <el-button type="primary">{{ $t('components.fileSelect.choose') }}</el-button>
      </template>
    </el-upload>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="4" v-for="(file, index) in tableData" :key="index" style="margin-bottom: 20px">
        <div style="width: 100px; height: 100px; background-color: var(--el-color-info-light-8);" @click="handleChoose(file)">
          <el-image :src="cover(file.path, 'xs')" fit="contain" style="width: 100px; height: 100px;"></el-image>
        </div>
      </el-col>
    </el-row>
    <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
  </el-dialog>
</template>

<script>
import list from '@/mixins/list'
import ResourceRequest from '@/api/resource'
import CustomPagination from "@/components/pagination";
import tools from "@/utils/tools";

export default {
  name: "file-select",
  components: {CustomPagination},
  mixins: [list],
  emits: ['confirm'],
  props: {
    uploadPath: {
      type: String,
      default: 'other'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      uploadUrl: process.env.VUE_APP_API + process.env.VUE_APP_API_PREFIX + '/material',
      // uploadUrl: 'http://192.168.0.16/admin/material',
      uploadHeaders: {
        Authorization: 'Bearer ' + this.$store.getters['user/token']
      },
      fileList: []
    }
  },
  created() {
    this.loadListData()
  },
  methods: {
    loadListData() {
      let params = {page: this.current, page_num: this.size, filetype: 'image'}
      ResourceRequest.list(params).then(res => {
        this.tableData = res.data
        this.pagination = res.pagination
        this.pagination.pageNum = this.size
      }).catch(err => {
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleSuccess(res) {
      this.$emit('confirm', res.path)
    },
    handleChoose(file) {
      this.$emit('confirm', file.path)
    },
    cover(file, mode) {
      return tools.cdn(file, mode)
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>
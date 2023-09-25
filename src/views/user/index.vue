<template>
  <div class="d-flex flex-justify-between">
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-input v-model="form.keyword" :placeholder="$t('user.placeholder.0')" clearable style="width: 200px; margin-right: 20px;"></el-input>
        <el-input v-model="form.recommenderId" :placeholder="$t('user.placeholder.1')" clearable style="width: 300px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">{{ $t('button.search') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="plus" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>
  </div>

  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 106px)">
    <el-table-column prop="id" label="ID" align="center" width="120" fixed="left"></el-table-column>

    <el-table-column prop="avatar" label="头像" align="center" width="120"></el-table-column>

    <el-table-column prop="name" label="用户名" width="120"></el-table-column>

    <el-table-column prop="nickname" label="用户昵称" width="120" fixed="left"></el-table-column>

    <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>

    <el-table-column prop="email" label="邮箱" width="200"></el-table-column>

    <el-table-column prop="birthday" label="生日" width="120"></el-table-column>

    <el-table-column prop="status" label="状态" width="120">
      <template #default="scope">
        <span v-if="scope.row.status == -1" style="color: var(--el-color-danger)">已删除</span>
        <span v-else-if="scope.row.status == 1" style="color: var(--el-color-success)">正常</span>
        <span v-else-if="scope.row.status == 2" style="color: var(--el-color-warning)">已冻结</span>
      </template>
    </el-table-column>

    <el-table-column prop="created_at" label="注册时间" width="200"></el-table-column>

    <el-table-column prop="last_login_at" label="最后登录时间" width="200"></el-table-column>

    <el-table-column label="操作" width="240" fixed="right">
      <template #default="scope">
        <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDelete(scope.row, scope.$index)">
          {{ $t('button.delete') }}
        </el-button>
        <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">
          {{ $t('button.edit') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import tools from "@/utils/tools";
import list from '@/mixins/list'
import UserRequest from '@/api/user'
import CustomPagination from "@/components/pagination";

export default {
  name: "user-list",
  components: {CustomPagination},
  mixins: [list],
  data() {
    return {
      form: {
        keyword: '',
        recommenderId: ''
      }
    }
  },
  created() {
    this.loadListData()
  },
  methods: {
    loadListData() {
      this.loading = true
      let params = {page: this.current, page_num: this.size}
      if (this.form.keyword !== '') {
        params.keyword = this.form.keyword
      }
      if (this.form.recommenderId !== '') {
        params.recommender_id = this.form.recommenderId
      }
      UserRequest.list(params).then(res => {
        this.tableData = res.data
        this.pagination = res.pagination
        this.pagination.pageNum = this.size
        this.loading = false
      }).catch(err => {
        // console.log(err)
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    cover(file) {
      return tools.avatar(file)
    }
  }
}
</script>

<style scoped>
  .line-clamp {
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
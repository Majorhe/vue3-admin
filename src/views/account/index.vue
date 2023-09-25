<template>
  <div class="d-flex flex-justify-between">
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-input v-model="form.keyword" :placeholder="$t('message.searchbarPlaceholder')" clearable style="width: 300px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">{{ $t('button.search') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" icon="refresh" @click="loadListData">刷新</el-button>
      <el-button type="primary" icon="plus" @click="addDialogVisible = true">添加</el-button>
    </div>
  </div>

  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 106px)">
    <el-table-column prop="id" label="ID" align="center" width="120">
    </el-table-column>

    <el-table-column prop="name" label="用户名" width="120" fixed="left"></el-table-column>

    <el-table-column prop="phone" label="手机号" width="120"></el-table-column>

    <el-table-column prop="email" label="邮箱" width="200"></el-table-column>

    <el-table-column prop="email" label="状态" width="200">
      <template #default="scope">
        <span v-if="scope.row.status == -1" style="color: var(--el-color-danger)">已删除</span>
        <span v-else-if="scope.row.status == 1" style="color: var(--el-color-success)">正常</span>
        <span v-else-if="scope.row.status == 2" style="color: var(--el-color-warning)">已冻结</span>
      </template>
    </el-table-column>

    <el-table-column label="所属管理员组" width="300">
      <template #default="scope">
        <div v-if="scope.row.role" style="color: var(--el-color-primary)">
          {{ scope.row.role.replaceAll(',', ' | ') }}
        </div>
        <span v-else style="color: var(--el-color-error)">未分组</span>
      </template>
    </el-table-column>

    <el-table-column prop="position" label="职位" width="200"></el-table-column>

    <el-table-column prop="created_at" label="创建时间" width="200"></el-table-column>

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

  <account-add :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @success="loadListData"></account-add>
  <account-edit :form="formData" :dialog-visible="editDialogVisible" @close="editDialogVisible = false" @success="loadListData"></account-edit>
  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import list from '@/mixins/list'
import AccountRequest from "@/api/account";
import AccountAdd from './add'
import AccountEdit from './edit'
import CustomPagination from '@/components/pagination'

export default {
  name: 'account-list',
  components: {AccountAdd, AccountEdit, CustomPagination},
  mixins: [list],
  data() {
    return {
      form: {
        keyword: ''
      }
    }
  },
  created() {
    this.loadListData()
  },
  methods: {
    loadListData() {
      this.loading = true
      let params = {size: this.size, page: this.current}
      if (this.form.keyword !== '') {
        params.keyword = this.form.keyword
      }
      AccountRequest.list(params).then(res => {
        this.loading = false
        this.tableData = res.data
        this.pagination = res.pagination
      }).catch(err => {
        this.loading = false
        this.$message.error(err || '获取数据失败')
      })
    },
    handleEdit(data) {
      this.formData = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        position: data.position,
        role: data.role ? data.role_id.split(',').map(item => { return parseInt(item) }) : '',
      }
      this.editDialogVisible = true
    },
    handleDelete(account, index) {
      this.$messageBox.confirm(this.$t('account.deleteTips')).then((action) => {
        if (action === 'confirm') {
          AccountRequest.del(account.id).then(() => {
            this.$message.success(this.$t('message.operateSuccess'))
            this.tableData.splice(index, 1)
          }).catch(err => {
            // console.log(err)
            this.$message.error(err || this.$t('message.operateFail'))
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
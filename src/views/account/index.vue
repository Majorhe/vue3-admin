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
    <el-button type="primary" icon="plus" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>
  </div>

  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 106px)">
    <el-table-column prop="id" label="ID" align="center" width="120">
    </el-table-column>

    <el-table-column prop="name" :label="$t('account.name')">
    </el-table-column>

    <el-table-column prop="title" :label="$t('account.title')">
      <template #default="scope">
        <span v-if="scope.row.groupId || scope.row.title">{{ scope.row.title }}</span>
        <span v-else style="color: var(--el-color-error)">未分组</span>
      </template>
    </el-table-column>

    <el-table-column prop="createdAt" :label="$t('account.createdAt')" width="200">
    </el-table-column>

    <el-table-column prop="lastLoginTime" :label="$t('account.lastLoginAt')" width="200">
    </el-table-column>

    <el-table-column :label="$t('button.operate')" width="240">
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
      let params = {page_num: this.size, page: this.current}
      if (this.form.keyword !== '') {
        params.keyword = this.form.keyword
      }
      AccountRequest.list(params).then(res => {
        this.loading = false
        this.tableData = res.data
        this.pagination = res.pagination
        this.pagination.pageNum = this.size
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleEdit(data) {
      this.formData = {
        id: data.id,
        name: data.name,
        auth_group_id: data.groupId
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
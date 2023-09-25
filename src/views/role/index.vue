<template>
  <div class="d-flex flex-justify-end" style="margin-bottom: 20px">
    <el-button type="primary" icon="refresh" @click="loadListData">刷新</el-button>
    <el-button type="primary" icon="plus" @click="addDialogVisible = true">添加</el-button>
  </div>
  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 54px)">
    <el-table-column prop="id" label="ID" align="center" width="120">
    </el-table-column>

    <el-table-column prop="name" label="角色名称">
    </el-table-column>

    <el-table-column prop="status" label="状态" width="200">
      <template #default="scope">
        <span v-if="scope.row.status == -1" style="color: var(--el-color-danger)">已删除</span>
        <span v-if="scope.row.status == 1" style="color: var(--el-color-success)">正常</span>
        <span v-if="scope.row.status == 2" style="color: var(--el-color-warning)">已冻结</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('button.operate')" width="300" fixed="right">
      <template #default="scope">
        <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
        <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="primary" icon="Menu" @click="handleAuthorize(scope.row)">设置菜单</el-button>
      </template>
    </el-table-column>
  </el-table>
  <role-add :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @success="loadListData"></role-add>
  <role-edit :form="formData" :dialog-visible="editDialogVisible" @close="editDialogVisible = false" @success="loadListData"></role-edit>
  <role-authorize ref="roleAuthorize"></role-authorize>
</template>

<script>
import list from '@/mixins/list'
import RoleRequest from '@/api/role'
import RoleAdd from './add'
import RoleEdit from './edit'
import RoleAuthorize from './authorize'

export default {
  name: 'role-list',
  mixins: [list],
  components: { RoleAdd, RoleEdit, RoleAuthorize },
  data() {
    return {
      superAdministratorId: process.env.VUE_APP_SUPER_ADMINISTRATOR_ID,
    }
  },
  created () {
    this.loadListData()
  },
  methods: {
    loadListData() {
      this.loading = true
      RoleRequest.list().then(res => {
        this.loading = false
        this.tableData = res
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },

    handleDelete(role, index) {
      this.$messageBox.confirm('你确定要删除该管理员组吗？').then((action) => {
        if (action === 'confirm') {
          RoleRequest.del(role.id).then(() => {
            this.$message.success('删除成功')
            this.tableData.splice(index, 1)
          }).catch(err => {
            // console.log(err)
            this.$message.error(err || '删除失败')
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(role) {
      this.formData = Object.assign({}, role)
      this.editDialogVisible = true
    },
    handleAuthorize(role) {
      this.$refs.roleAuthorize.open(role)
    },

  }
}
</script>

<style scoped>

</style>
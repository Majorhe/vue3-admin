<template>
  <div class="d-flex flex-justify-end" style="margin-bottom: 20px">
    <el-button type="primary" icon="plus" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>
  </div>
  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 54px)">
    <el-table-column prop="id" label="ID" align="center" width="120">
    </el-table-column>

    <el-table-column prop="title" :label="$t('role.title')" width="200">
    </el-table-column>

    <el-table-column prop="description" :label="$t('role.description')">
    </el-table-column>

    <el-table-column :label="$t('button.authorize')" width="120">
      <template #default="scope">
        <div v-if="scope.row.id != superAdministratorId">
          <el-button size="small" type="primary" icon="Permissions" @click="handleAuthorize(scope.row.id)">{{ $t('button.authorize') }}</el-button>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('button.operate')" width="200">
      <template #default="scope">
        <div v-if="scope.row.id != superAdministratorId">
          <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDelete(scope.row, scope.$index)">{{ $t('button.delete') }}</el-button>
          <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">{{ $t('button.edit') }}</el-button>
        </div>
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
        this.tableData = res.data
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },

    handleDelete(role, index) {
      this.$messageBox.confirm(this.$t('role.deleteTips')).then((action) => {
        if (action === 'confirm') {
          RoleRequest.del(role.id).then(() => {
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
    },
    handleEdit(role) {
      this.formData = Object.assign({}, role)
      this.editDialogVisible = true
    },
    handleAuthorize(id) {
      this.$refs.roleAuthorize.open(id)
    },

  }
}
</script>

<style scoped>

</style>
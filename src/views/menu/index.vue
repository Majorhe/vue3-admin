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
  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 54px)">
    <el-table-column prop="id" label="ID" align="center" width="120">
    </el-table-column>

    <el-table-column :label="$t('menu.title')">
      <template #default="scope">
        <div v-html="scope.row.title"></div>
      </template>
    </el-table-column>

    <el-table-column prop="name" :label="$t('menu.path')" width="240">
    </el-table-column>

    <el-table-column :label="$t('menu.type')" align="center" width="100">
      <template #default="scope">
        <span v-if="scope.row.type == 2" style="color: var(--el-color-primary)">{{ $t('menu.type2menu') }}</span>
        <span v-if="scope.row.type == 1" style="color: var(--el-color-success)">{{ $t('menu.type2action') }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('menu.status')" align="center" width="120">
      <template #default="scope">
        <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            inactive-color="#ff4949"
            :before-change="handleBeforeChange"
            @change="handleSwitch($event, scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>

    <el-table-column :label="$t('button.operate')" width="320px">
      <template #default="scope">
        <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDelete(scope.row, scope.$index)">{{ $t('button.delete') }}</el-button>
        <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">{{ $t('button.edit') }}</el-button>
        <el-button size="small" type="primary" icon="Plus" @click="handleAddSubmenu(scope.row.id)">{{ $t('menu.addSubmenu') }}</el-button>
      </template>
    </el-table-column>
  </el-table>

  <menu-add :pid="pid" :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @success="loadListData"></menu-add>
  <menu-edit :form="formData" :dialog-visible="editDialogVisible" @close="editDialogVisible = false" @success="loadListData"></menu-edit>
</template>

<script>
import { provide, reactive } from 'vue'
import list from '@/mixins/list'
import MenuRequest from '@/api/menu'
import MenuAdd from './add'
import MenuEdit from './edit'

export default {
  name: 'menu-list',
  mixins: [list],
  components: { MenuAdd, MenuEdit },
  setup () {
    const menuList = reactive([])
    provide('menuList', menuList)
    return { menuList }
  },
  created () {
    this.loadListData()
  },
  data () {
    return {
      pid: 0,
      form: {
        keyword: ''
      }
    }
  },
  methods: {
    loadListData() {
      this.loading = true
      let params = {page: this.current, page_num: this.size}
      if (this.form.keyword !== '') {
        params.keyword = this.form.keyword
      }
      MenuRequest.list(params).then(res => {
        this.tableData = res.data
        if (this.menuList.length == 0) {
          this.menuList.value = res.data
        }
        this.loading = false
      }).catch(err => {
        // console.log(err)
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleBeforeChange() {
      return new Promise((resolve, reject) => {
        return this.$messageBox.confirm(this.$t('menu.switchTips')).then((action) => {
          if (action === 'confirm') {
            return resolve(true)
          }
          return reject(new Error('cancel'))
        }).catch(() => {
          return reject(new Error('cancel'))
        })
      })
    },
    handleSwitch(val, menu) {
      MenuRequest.switch(menu.id, parseInt(val)).then(() => {
        this.$message.success(this.$t('message.operateSuccess'))
      }).catch(err => {
        this.$message.error(err || this.$t('message.operateFail'))
      })
    },
    handleDelete(menu, index) {
      this.$messageBox.confirm(this.$t('menu.deleteTips')).then((action) => {
        if (action === 'confirm') {
          MenuRequest.del(menu.id).then(() => {
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
    handleEdit(menu) {
      this.formData = {}
      this.formData = Object.assign({}, menu)
      this.formData.title = this.formData.title.replace(menu.spacer, '')
      this.editDialogVisible = true
    },
    handleAddSubmenu(pid) {
      this.pid = pid
      this.addDialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
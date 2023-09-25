<template>
  <div class="d-flex flex-justify-between">
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-input v-model="form.keyword" placeholder="请输入搜索关键字" clearable style="width: 300px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">搜索</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" icon="refresh" @click="reloadListData">刷新</el-button>
      <el-button type="primary" icon="plus" @click="pid = 0; addDialogVisible = true">添加</el-button>
    </div>
  </div>
  <el-table v-loading="loading" :data="tableData" row-key="id" border style="width: 100%" height="calc(100% - 54px)">
    <el-table-column prop="id" label="ID" align="center" width="120">
    </el-table-column>

    <el-table-column prop="name" label="菜单名称" width="240"></el-table-column>
    <el-table-column prop="route" label="路由名称" width="240"></el-table-column>

    <el-table-column label="菜单类型" align="center" width="100">
      <template #default="scope">
        <span v-if="scope.row.type == 1" style="color: var(--el-color-success)">视图</span>
        <span v-if="scope.row.type == 2" style="color: var(--el-color-danger)">操作</span>
      </template>
    </el-table-column>

    <el-table-column label="状态" align="center" width="120">
      <template #default="scope">
        <el-switch v-model="scope.row.status" disabled :active-value="1" :inactive-value="0" inactive-color="#ff4949" />
      </template>
    </el-table-column>

    <el-table-column :label="$t('button.operate')" min-width="320px">
      <template #default="scope">
        <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
        <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="primary" icon="Plus" @click="handleAddSubmenu(scope.row.id)">添加子菜单</el-button>
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
        // console.log(res)
        this.tableData = this.formatMenuList(res)
        if (this.menuList.length == 0) {
          this.menuList.value = res
        }
        this.loading = false
      }).catch(err => {
        // console.log(err)
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleDelete(menu, index) {
      this.$messageBox.confirm('删除该菜单后所有子级菜单会一同删除，您确定要删除该菜单吗？').then((action) => {
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
      this.editDialogVisible = true
    },
    handleAddSubmenu(pid) {
      this.pid = pid
      this.addDialogVisible = true
    },
    formatMenuList(list) {
      const buildTree = function (nodeList, pid) {
        let newArr = []
        nodeList.forEach(function (item) {
          if (pid == item.pid) {
            let node = item
            node['children'] = buildTree(nodeList, item.id)
            newArr.push(node)
          }
        })
        return newArr
      }
      // console.log(buildTree(list, 0))
      return buildTree(list, 0)
    }
  }
}
</script>

<style scoped>

</style>
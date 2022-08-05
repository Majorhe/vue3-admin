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

    <el-table-column :label="$t('category.name')" >
      <template #default="scope">
        <div v-html="scope.row.name"></div>
      </template>
    </el-table-column>

    <el-table-column prop="createdAt" :label="$t('category.createdAt')" align="center" width="240">
    </el-table-column>

    <el-table-column :label="$t('button.operate')" width="300">
      <template #default="scope">
        <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDelete(scope.row, scope.$index)">{{ $t('button.delete') }}</el-button>
        <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">{{ $t('button.edit') }}</el-button>
        <el-button v-if="scope.row.pid == 0" size="small" type="primary" icon="Plus" @click="handleAddSubcategory(scope.row.id)">{{ $t('category.addSubCate') }}</el-button>
      </template>
    </el-table-column>
  </el-table>

  <category-add :pid="pid" :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @success="loadListData"></category-add>
  <category-edit :form="formData" :dialog-visible="editDialogVisible" @close="editDialogVisible = false" @success="loadListData"></category-edit>
</template>

<script>
import { provide, reactive } from 'vue'
import list from '@/mixins/list'
import CategoryRequest from "@/api/category";
import CategoryAdd from "./add";
import CategoryEdit from "./edit";

export default {
  name: "category-list",
  mixins: [list],
  components: {CategoryAdd, CategoryEdit},
  setup () {
    const cateList = reactive([])
    provide('cateList', cateList)
    return { cateList }
  },
  created() {
    this.loadListData()
  },
  data() {
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
      let params = {}
      if (this.form.keyword !== '') {
        params.keyword = this.form.keyword
      }
      CategoryRequest.list(params).then(res => {
        this.loading = false
        this.tableData = res
        if (this.cateList.length == 0) {
          this.cateList.value = res
        }
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleDelete(cate, index) {
      this.$messageBox.confirm(this.$t('category.deleteTips')).then((action) => {
        if (action === 'confirm') {
          CategoryRequest.del(cate.id).then(() => {
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
    handleEdit(cate) {
      this.formData = {
        id: cate.id,
        pid: cate.pid,
        name: (cate.name).replace(cate.spacer, '')
      }
      this.editDialogVisible = true
    },
    handleAddSubcategory(pid) {
      this.pid = pid
      this.addDialogVisible = true
    },
  }
}
</script>

<style scoped>

</style>
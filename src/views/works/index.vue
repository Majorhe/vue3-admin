<template>
  <div class="d-flex flex-justify-between">
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-select v-model="form.status" placeholder="作品状态" style="margin-right: 10px">
          <el-option value="-1" label="已删除"></el-option>
          <el-option value="0" label="待发布"></el-option>
          <el-option value="1" label="待审核"></el-option>
          <el-option value="2" label="审核成功"></el-option>
          <el-option value="3" label="审核失败"></el-option>
          <el-option value="4" label="已举报"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.author" placeholder="作者" clearable style="width: 200px; margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.keyword" placeholder="关键字" clearable style="width: 280px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">搜索</el-button>
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
    <el-table-column prop="id" label="ID" align="center" width="100" fixed="left"></el-table-column>

    <el-table-column prop="title" label="标题" min-width="240" fixed="left">
    </el-table-column>

    <el-table-column label="作者" width="200">
      <template #default="scope">
        <el-tooltip :content="`ID: ${scope.row.user.id}`" placement="top">
          <span>{{ scope.row.user.nickname }}</span>
        </el-tooltip>
      </template>
    </el-table-column>

    <el-table-column :label="$t('works.category')" width="200">
      <template #default="scope">
        <span v-if="scope.row.category">{{ scope.row.category.name }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="type_text" :label="$t('works.type')" align="center" width="100"></el-table-column>

    <el-table-column :label="$t('works.issued')" width="180">
      <template #default="scope">
        <span>{{ $filter.thousandFormat(scope.row.cnt, 0) }} / {{ $filter.thousandFormat(scope.row.stock, 0) }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('works.status')" align="center" width="100">
      <template #default="scope">
        <span v-if="scope.row.onsale == 1" style="color: var(--el-color-primary)">{{ scope.row.onsale_text }}</span>
        <span v-else-if="scope.row.onsale == 2" style="color: var(--el-color-success)">{{ scope.row.onsale_text }}</span>
        <span v-else style="color: var(--el-color-warning)">{{ scope.row.onsale_text }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="recommend" :label="$t('works.recommend')" align="center" width="100" ></el-table-column>

    <el-table-column prop="created_at" :label="$t('works.createdAt')" align="center" width="180"></el-table-column>

    <el-table-column :label="$t('button.operate')" width="240" fixed="right">
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

  <work-add :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @success="loadListData"></work-add>
  <work-edit :form="formData" :dialog-visible="editDialogVisible" @close="editDialogVisible = false" @success="loadListData"></work-edit>
  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import list from '@/mixins/list'
import WorksRequest from "@/api/works";
import CustomPagination from '@/components/pagination'
import WorkAdd from "@/views/works/add";
import WorkEdit from "@/views/works/edit";
import RoleRequest from "@/api/role";

export default {
  name: "works-list",
  mixins: [list],
  components: {WorkAdd, WorkEdit, CustomPagination },
  data () {
    return {
      form: {
        status: '',
        author: '',
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
      if (this.form.author !== '') {
        params.user_id = this.form.author
      }
      WorksRequest.list(params).then(res => {
        this.loading = false
        this.tableData = res.data
        this.pagination = res.pagination
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleDelete(work, index) {
      this.$messageBox.confirm('').then((action) => {
        if (action === 'confirm') {
          RoleRequest.delete(work.id).then(() => {
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
    handleEdit(work) {
      this.formData = Object.assign({}, work)
      this.editDialogVisible = true
    },
  }
}
</script>

<style scoped>
  .images-slot {
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
  }
</style>
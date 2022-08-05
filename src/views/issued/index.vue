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
    <el-table-column prop="title" :label="$t('issued.work')">
      <template #default="scope">
        <div class="d-flex flex-align-center">
          <el-image :src="cover(scope.row.relate.cover, 'xs')" fit="cover" style="width: 48px; height: 48px; margin-right: 10px;">
            <template #error>
              <div class="images-slot d-flex flex-justify-center flex-align-center">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div class="font-bold">{{ scope.row.relate.name }}</div>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('issued.issuedTime')" align="center" width="160">
      <template #default="scope">
        <span>{{ $filter.dateFormat(scope.row.start_time) }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('issued.priorityTime')" align="center" width="160">
      <template #default="scope">
        <span v-if="scope.row.first_time">{{ $filter.dateFormat(scope.row.first_time) }}</span>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('issued.createdAt')" align="center" width="160">
      <template #default="scope">
        <span>{{ $filter.dateFormat(scope.row.created_at) }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('issued.status')" align="center" width="100">
      <template #default="scope">
        <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            :before-change="handleBeforeChange"
            @change="handleSwitch($event, scope.row)"
        >
        </el-switch>
      </template>
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

  <issued-add :dialog-visible="addDialogVisible" @close="handleClose" @success="loadListData"></issued-add>
  <issued-edit :form="formData" :dialog-visible="editDialogVisible" @close="handleClose" @success="loadListData"></issued-edit>
  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import list from '@/mixins/list'
import CustomPagination from "@/components/pagination";
import tools from "@/utils/tools";
import IssuedRequest from "@/api/issued";
import IssuedAdd from "@/views/issued/add";
import IssuedEdit from "@/views/issued/edit";

export default {
  name: "issued-page",
  components: {IssuedEdit, IssuedAdd, CustomPagination},
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
      let params = {page_num: this.size, page: this.current, keyword: this.form.keyword}
      IssuedRequest.list(params).then(res => {
        this.loading = false
        this.tableData = res.data
        this.pagination = res.pagination
        this.pagination.pageNum = this.size
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleBeforeChange() {
      return new Promise((resolve, reject) => {
        return this.$messageBox.confirm(this.$t('issued.switchTips')).then((action) => {
          if (action === 'confirm') {
            return resolve(true)
          }
          return reject(new Error('cancel'))
        }).catch(() => {
          return reject(new Error('cancel'))
        })
      })
    },
    handleSwitch(val, work) {
      IssuedRequest.switch(work.id, parseInt(val)).then(() => {
        this.$message.success(this.$t('message.operateSuccess'))
      }).catch(err => {
        this.$message.error(err || this.$t('message.operateFail'))
      })
    },
    handleDelete(work, index) {
      return this.$messageBox.confirm(this.$t('issued.deleteTips')).then((action) => {
        if (action === 'confirm') {
          IssuedRequest.del(work.id).then(() => {
            this.$message.success(this.$t('message.operateSuccess'))
            this.tableData.splice(index, 1)
          }).catch(err => {
            this.$message.error(err || this.$t('message.operateFail'))
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(work) {
      this.formData = {
        id: work.id,
        type: work.type,
        relate_id: work.relate_id,
        status: work.status
      }
      this.editDialogVisible = true
    },
    handleClose() {
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.formData = {}
    },
    cover(file, mode) {
      return tools.cdn(file, mode)
    }
  }
}
</script>

<style scoped>

</style>
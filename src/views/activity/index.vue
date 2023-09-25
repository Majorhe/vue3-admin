<template>
  <div class="d-flex flex-justify-between">
    <el-form label-width="auto" class="d-flex">
      <el-form-item>
        <el-input v-model="keyword" :placeholder="$t('message.searchbarPlaceholder')" clearable style="width: 300px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">{{ $t('button.search') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="plus" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>
  </div>

  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 106px)">
    <el-table-column prop="id" label="ID" align="center" fixed="left" width="120">
    </el-table-column>

    <el-table-column prop="title" :label="$t('activity.title')" fixed="left" width="150">
    </el-table-column>

    <el-table-column prop="link" :label="$t('activity.link')" width="200">
    </el-table-column>

    <el-table-column :label="$t('activity.desc')" width="320">
      <template #default="scope">
        <div class="activity-desc">{{ scope.row.description }}</div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('activity.status')" align="center" width="120">
      <template #default="scope">
        <span v-if="scope.row.status == 1" style="color: var(--el-color-primary)">{{ $t('activity.statusText.1') }}</span>
        <span v-else-if="scope.row.status == 2" style="color: var(--el-color-warning)">{{ $t('activity.statusText.2') }}</span>
        <span v-else style="color: var(--el-color-error)">{{ $t('activity.statusText.0') }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('activity.startTime')" align="center" width="180">
      <template #default="scope">
        <span v-if="scope.row.startTime">{{ $filter.dateFormat(scope.row.start_time) }}</span>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('activity.endTime')" align="center" width="180">
      <template #default="scope">
        <span v-if="scope.row.endTime">{{ $filter.dateFormat(scope.row.end_time) }}</span>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column prop="template" :label="$t('activity.template')" align="center" width="100">
    </el-table-column>

    <el-table-column prop="bgColor" :label="$t('activity.bgColor')" align="center" width="100">
      <template #default="scope">
        <span :style="{color: scope.row.bgColor}">{{ scope.row.bgColor }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="bgImage" :label="$t('activity.bgImage')" align="center" width="100">
      <template #default="scope">
        <el-image v-if="scope.row.bgImage" :src="cover(scope.row.bgImage)" fit="cover" style="width: 48px; height: 48px;"></el-image>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('button.operate')" fixed="right" width="240">
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

  <activity-add :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @success="loadListData"></activity-add>
  <activity-edit :form="formData" :dialog-visible="editDialogVisible" @close="editDialogVisible = false" @success="loadListData"></activity-edit>
  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import ActivityRequest from "@/api/activity";
import tools from "@/utils/tools";
import list from '@/mixins/list'
import ActivityAdd from "./add";
import ActivityEdit from "./edit";
import CustomPagination from "@/components/pagination";


export default {
  name: "activity-page",
  components: {ActivityEdit, ActivityAdd, CustomPagination},
  mixins: [list],
  data() {
    return {
      keyword: ''
    }
  },
  created() {
    this.loadListData()
  },
  methods: {
    loadListData() {
      this.loading = true
      let params = {page: this.current, page_num: this.size}
      if (this.keyword !== '') {
        params.keyword = this.keyword
      }
      ActivityRequest.list(params).then(res => {
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
    handleBeforeChange() {
      return new Promise((resolve, reject) => {
        return this.$messageBox.confirm(this.$t('activity.switchTips')).then((action) => {
          if (action === 'confirm') {
            return resolve(true)
          }
          return reject(new Error('cancel'))
        }).catch(() => {
          return reject(new Error('cancel'))
        })
      })
    },
    handleSwitch(val, activity) {
      ActivityRequest.switch(activity.id, parseInt(val)).then(() => {
        this.$message.success(this.$t('message.operateSuccess'))
      }).catch(err => {
        this.$message.error(err || this.$t('message.operateFail'))
      })
    },
    handleDelete(activity, index) {
      this.$messageBox.confirm(this.$t('activity.deleteTips')).then((action) => {
        if (action === 'confirm') {
          ActivityRequest.del(activity.id).then(() => {
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
    handleEdit(activity) {
      this.formData = {}
      this.formData = Object.assign({}, activity)
      this.editDialogVisible = true
    },
    cover(file) {
      return tools.cdn(file)
    }
  }
}

</script>

<style lang="scss" scoped>
  .activity-desc {
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
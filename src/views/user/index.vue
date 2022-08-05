<template>
  <div class="d-flex flex-justify-between">
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-input v-model="form.keyword" :placeholder="$t('user.placeholder.0')" clearable style="width: 200px; margin-right: 20px;"></el-input>
        <el-input v-model="form.recommenderId" :placeholder="$t('user.placeholder.1')" clearable style="width: 300px">
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

    <el-table-column :label="$t('user.avatar')" align="center" width="100">
      <template #default="scope">
        <el-avatar :src="cover(scope.row.headimg)" size="48px"></el-avatar>
      </template>
    </el-table-column>

    <el-table-column :label="$t('user.nickname')" width="200">
      <template #default="scope">
        <div class="line-clamp">{{ scope.row.nickname }}</div>
        <div class="line-clamp">{{ $filter.replace(scope.row.wallet, 6, 4, '...') }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="mobile" :label="$t('user.phone')" width="180">
    </el-table-column>

    <el-table-column :label="$t('user.balance')" width="120">
      <template #default="scope">
        <span style="color: var(--el-color-primary)">{{ $filter.thousandFormat(scope.row.money) }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('user.tokenValue')" width="120">
      <template #default="scope">
        <span>{{ $filter.thousandFormat(scope.row.devour) }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="recommender_id" :label="$t('user.recommender')" width="120">
    </el-table-column>

    <el-table-column :label="$t('user.status')" align="center" width="120">
      <template #default="scope">
        <span v-if="scope.row.status == 1" style="color: var(--el-color-primary)">{{ $t('user.statusText.1') }}</span>
        <span v-else-if="scope.row.status == 2" style="color: var(--el-color-warning)">{{ $t('user.statusText.2') }}</span>
        <span v-else style="color: var(--el-color-error)">{{ $t('user.statusText.0') }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('user.startTime')" align="center" width="180">
      <template #default="scope">
        <span v-if="scope.row.startTime">{{ $filter.dateFormat(scope.row.start_time) }}</span>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('user.endTime')" align="center" width="180">
      <template #default="scope">
        <span v-if="scope.row.endTime">{{ $filter.dateFormat(scope.row.end_time) }}</span>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column prop="template" :label="$t('user.template')" align="center" width="100">
    </el-table-column>

    <el-table-column prop="bgColor" :label="$t('user.bgColor')" align="center" width="100">
      <template #default="scope">
        <span :style="{color: scope.row.bgColor}">{{ scope.row.bgColor }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="bgImage" :label="$t('user.bgImage')" align="center" width="100">
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

  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import tools from "@/utils/tools";
import list from '@/mixins/list'
import UserRequest from '@/api/user'
import CustomPagination from "@/components/pagination";

export default {
  name: "user-list",
  components: {CustomPagination},
  mixins: [list],
  data() {
    return {
      form: {
        keyword: '',
        recommenderId: ''
      }
    }
  },
  created() {
    this.loadListData()
  },
  methods: {
    loadListData() {
      this.loading = true
      let params = {page: this.current, page_num: this.size}
      if (this.form.keyword !== '') {
        params.keyword = this.form.keyword
      }
      if (this.form.recommenderId !== '') {
        params.recommender_id = this.form.recommenderId
      }
      UserRequest.list(params).then(res => {
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
    cover(file) {
      return tools.avatar(file)
    }
  }
}
</script>

<style scoped>
  .line-clamp {
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
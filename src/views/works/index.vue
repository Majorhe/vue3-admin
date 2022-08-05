<template>
  <div class="d-flex flex-justify-between">
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-select v-model="form.onsale" :placeholder="$t('works.selector.title')" style="margin-right: 10px">
          <el-option value="-1" :label="$t('works.selector.options.0')"></el-option>
          <el-option value="1" :label="$t('works.selector.options.1')"></el-option>
          <el-option value="0" :label="$t('works.selector.options.2')"></el-option>
          <el-option value="2" :label="$t('works.selector.options.3')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.author" :placeholder="$t('works.placeholder.0')" clearable style="width: 200px; margin-right: 10px;">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.keyword" :placeholder="$t('works.placeholder.1')" clearable style="width: 280px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">{{ $t('button.search') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="plus" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>
  </div>

  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 106px)">
    <el-table-column prop="id" label="ID" align="center" width="100" fixed="left"></el-table-column>

    <el-table-column :label="$t('works.name')" min-width="240" fixed="left">
      <template #default="scope">
        <div class="d-flex flex-align-center">
          <el-image
              :src="cover(scope.row.cover, 'xs')"
              style="width: 48px; height: 48px; margin-right: 10px;"
          >
            <template #error>
              <div class="images-slot d-flex flex-justify-center flex-align-center">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('works.author')" width="200">
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

  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import tools from '@/utils/tools'
import list from '@/mixins/list'
import WorksRequest from "@/api/works";
import CustomPagination from '@/components/pagination'

export default {
  name: "works-list",
  mixins: [list],
  components: { CustomPagination },
  data () {
    return {
      form: {
        onsale: '-1',
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
        this.pagination.pageNum = this.size
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleDelete() {},
    handleEdit() {},
    cover(file, mode) {
      return tools.cdn(file, mode)
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
<template>
  <div>
    <el-form :model="form" label-width="auto" class="d-flex">
      <el-form-item>
        <el-select v-model="form.onsale" :placeholder="$t('token.selector.title')" style="margin-right: 10px">
          <el-option value="-1" :label="$t('token.selector.options.0')"></el-option>
          <el-option value="1" :label="$t('token.selector.options.1')"></el-option>
          <el-option value="0" :label="$t('token.selector.options.2')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.work_id" :placeholder="$t('token.placeholder.0')" clearable style="width: 200px; margin-right: 10px;">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.author_id" :placeholder="$t('token.placeholder.1')" clearable style="width: 200px; margin-right: 10px;">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.user_id" :placeholder="$t('token.placeholder.2')" clearable style="width: 280px">
          <template #append>
            <el-button type="primary" icon="Search" @click="search" class="search-btn no-border">{{ $t('button.search') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>

  <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="calc(100% - 106px)">
    <el-table-column prop="id" :label="$t('token.chain')" width="140" fixed="left">
      <template #default="scope">
        <div>ID: {{ scope.row.id }}</div>
        <div># {{ scope.row.no }} / {{ scope.row.work.cnt }}</div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('token.name')" min-width="240" fixed="left">
      <template #default="scope">
        <div class="d-flex flex-align-center">
          <el-image :src="cover(scope.row.work.file, 'xs')" fit="cover" style="width: 48px; height: 48px; margin-right: 10px;">
            <template #error>
              <div class="images-slot d-flex flex-justify-center flex-align-center">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div>
            <div class="font-bold">{{ scope.row.work.name }}</div>
            <div>{{ scope.row.name }}</div>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="$t('token.author')" min-width="200">
      <template #default="scope">
        <el-tooltip :content="`ID: ${scope.row.user.id}`" placement="left">
          <div style="color: var(--el-color-primary)">拥有者：{{ scope.row.user ? scope.row.user.nickname : '-' }}</div>
        </el-tooltip>
        <el-tooltip :content="`ID: ${scope.row.author.id}`" placement="left">
          <div style="color: var(--el-color-success)">创造者：{{ scope.row.author ? scope.row.author.nickname : '-' }}</div>
        </el-tooltip>
      </template>
    </el-table-column>

    <el-table-column :label="$t('token.status')" align="center" width="100">
      <template #default="scope">
        <span v-if="scope.row.user && scope.row.user.id == 1" style="color: var(--el-color-error)">已销毁</span>
        <span v-else-if="scope.row.onsale == 1" style="color: var(--el-color-primary)">{{ scope.row.onsale_text }}</span>
        <span v-else style="color: var(--el-color-primary)">{{ scope.row.onsale_text }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('token.transactionId')" align="center" width="180">
      <template #default="scope">
        <span v-if="scope.row.mint_hash" class="font-bold">
          {{ $filter.replace(scope.row.mint_hash, 6, 4, '...') }}
          <el-icon @click="handleCopy(scope.row.mint_hash)"><DocumentCopy /></el-icon>
        </span>
        <span v-else>-</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('token.createdAt')" align="center" width="180">
      <template #default="scope">
        <span>{{ $filter.dateFormat(scope.row.created_at) }}</span>
      </template>
    </el-table-column>

    <el-table-column :label="$t('button.operate')" width="240" fixed="right">
      <template #default="scope">
        <el-button size="small" type="danger" icon="DeleteFilled" @click="handleDestroy(scope.row)">
          {{ $t('button.destroy') }}
        </el-button>
        <el-button size="small" type="primary" icon="Edit" @click="handleEdit(scope.row)">
          {{ $t('button.edit') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <token-edit :data="formData" :dialog-visible="editDialogVisible" @close="handleClose" @success="loadListData"></token-edit>
  <custom-pagination :page="pagination" @sizeChange="sizeChange" @currentChange="currentChange"></custom-pagination>
</template>

<script>
import tools from '@/utils/tools'
import list from '@/mixins/list'
import TokenRequest from "@/api/token";
import CustomPagination from '@/components/pagination'
import TokenEdit from "./edit";

export default {
  name: "token-list",
  mixins: [list],
  components: {TokenEdit, CustomPagination },
  data () {
    return {
      form: {
        user_id: '',
        author_id:'',
        work_id: '',
        onsale: ''
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
      params = Object.assign(params, this.form)
      if (params.onsale == '-1') {
        params.onsale = ''
      }
      TokenRequest.list(params).then(res => {
        this.loading = false
        this.tableData = res.data
        this.pagination = res.pagination
        this.pagination.pageNum = this.size
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleDestroy(token) {
      this.$messageBox.confirm(this.$t('token.deleteTips')).then((action) => {
        if (action === 'confirm') {
          TokenRequest.destroy(token.id).then(() => {
            this.$message.success(this.$t('message.operateSuccess'))
            this.loadListData()
          }).catch(err => {
            // console.log(err)
            this.$message.error(err || this.$t('message.operateFail'))
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(token) {
      // console.log(token)
      this.formData = {
        id: token.id,
        name: token.name,
        work_id: token.work_id,
        file: token.work.file
      }
      this.editDialogVisible = true
    },
    handleCopy(str) {
      try {
        tools.copy(str)
        this.$message.success(this.$t('message.copySuccess'))
      } catch (e) {
        this.$message.error(this.$t('message.copyFail'))
      }
    },
    handleClose() {
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
.images-slot {
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
}
</style>
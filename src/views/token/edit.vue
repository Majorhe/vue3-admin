<template>
  <el-dialog :title="$t('token.editFormTitle')" v-model="visible" @close="handleClose" center destroy-on-close width="600px">
    <el-form :model="form" :rules="rules" label-width="100px" ref="tokenForm" size="large">
      <el-form-item :label="$t('token.chain')">
        <el-input :value="form.id" autocomplete="off" disabled></el-input>
      </el-form-item>

      <el-form-item :label="$t('token.belongWork')" prop="work_id">
        <el-select
            v-model="form.work_id"
            :filterable="true"
            :remote="true"
            :remote-method="handleWorkSearch"
            :loading="loading"
            style="width: 100%"
        >
          <el-option v-for="(opt, index) in workList" :key="index" :label="opt.label" :value="opt.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('token.name')" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('token.file')" prop="name">
        <el-image :src="cover(form.file, 'xs')" fit="contain" style="width: 100px; height: 100px;" @click="handleChooseImage">
          <template #error>
            <div class="image-choose d-flex flex-justify-center flex-align-center" @click="handleChooseImage">
              <el-icon size="50px"><CirclePlusFilled /></el-icon>
            </div>
          </template>
        </el-image>
      </el-form-item>

      <div style="text-align: right">
        <el-form-item>
          <el-button :loading="loading" :disabled="loading" type="primary" @click="handleConfirm">{{ $t('button.confirm') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
  <file-select ref="pictureSelect" @confirm="handleFileChoose"></file-select>
</template>

<script>
import tools from '@/utils/tools'
import TokenRequest from '@/api/token'
import WorkRequest from "@/api/works";
import FileSelect from "@/components/file-select";

export default {
  name: 'token-edit',
  components: {FileSelect},
  emits: ['success', 'close'],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          work_id: '',
          file: ''
        }
      }
    }
  },
  computed: {
    visible: {
      get: function () {
        return this.dialogVisible
      },
      set: function () {
        this.$emit('close')
      }
    }
  },
  watch: {
    data(val) {
      this.form = val
      this.$nextTick(() => {
        if (this.form.work_id) {
          this.handleWorkSearch(this.form.work_id)
        }
      })
    }
  },
  data () {
    return {
      loading: false,
      workList: [],
      form: this.data,
      rules: {
        name: [{ required: true, message: this.$t('token.validate.name'), trigger: 'blur' }],
        work_id: [{ required: true, message: this.$t('token.validate.workId'), trigger: 'blur' }],
      }
    }
  },
  methods: {
    handleConfirm (form) {
      TokenRequest.update(form).then(() => {
        this.visible = false
        this.$message.success(this.$t('message.operateSuccess'))
        this.$emit('success')
      }).catch(err => {
        this.$message.error(err || this.$t('message.operateFail'))
      })
    },
    handleWorkSearch(keyword) {
      this.loading = true
      WorkRequest.search({keyword: keyword}).then(res => {
        this.workList = res.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleChooseImage() {
      this.$refs.pictureSelect.open()
    },
    handleFileChoose(data) {
      this.form.file = data
      this.$refs.pictureSelect.close()
    },
    handleCancel () {
      this.visible = false
    },
    handleClose () {
      this.$refs['tokenForm'].resetFields()
    },
    cover(file, mode) {
      return tools.cdn(file, mode)
    }
  }
}
</script>

<style scoped>
  .image-choose { width: 98px; height: 98px; background: var(--el-color-info-light-8);}
</style>

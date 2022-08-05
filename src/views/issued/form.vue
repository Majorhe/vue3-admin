<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="100px" ref="issuedForm" size="large">
      <el-form-item :label="$t('issued.type')" prop="type">
        <el-select v-model="form.type" style="width: 100%" @change="handleTypeChange">
          <el-option value="App\Models\Work" :label="$t('issued.options.0')"></el-option>
          <el-option value="App\Models\Mbox" :label="$t('issued.options.1')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('issued.belongWork')" prop="relate_id" v-if="form.type == 'App\\Models\\Work'">
        <el-select
            v-model="form.relate_id"
            :filterable="true"
            :remote="true"
            :remote-method="handleWorkSearch"
            :loading="selectLoading"
            style="width: 100%"
        >
          <el-option v-for="(opt, index) in workList" :key="index" :label="opt.label" :value="opt.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('issued.belongWork')" prop="relate_id" v-if="form.type == 'App\\Models\\Mbox'">
        <el-select v-model="form.relate_id" style="width: 100%">
          <el-option v-for="(mbox, index) in mboxList" :key="index" :label="mbox.name" :value="mbox.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('issued.status')">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <div style="text-align: right">
        <el-form-item>
          <el-button :loading="loading" :disabled="loading" type="primary" @click="confirm">{{ $t('button.confirm') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MboxRequest from '@/api/mbox'
import WorkRequest from "@/api/works";

export default {
  name: 'issued-form',
  emits: ['cancel', 'confirm'],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          type: '',
          relate_id: ''
        }
      },
    }
  },
  watch: {
    data(val) {
      this.form = val
      if (this.form.relate_id) {
        this.handleWorkSearch(this.form.relate_id)
      }
    }
  },
  data () {
    return {
      mboxList: [],
      workList: [],
      selectLoading: false,
      form: this.data,
      rules: {
        type: [{ required: true, message: this.$t('issued.validate.type'), trigger: 'blur' }],
        relate_id: [{ required: true, message: this.$t('issued.validate.work'), trigger: 'blur' }],
      }
    }
  },
  mounted() {
    this.getAllMboxList()
    this.$nextTick(() => {
      if (this.form.relate_id) {
        this.handleWorkSearch(this.form.relate_id)
      }
    })
  },
  methods: {
    getAllMboxList() {
      MboxRequest.all().then(res => {
        this.mboxList = res.data
      }).catch(err => {
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleWorkSearch(keyword) {
      this.selectLoading = true
      WorkRequest.search({keyword: keyword}).then(res => {
        this.workList = res.data
        this.selectLoading = false
      }).catch(err => {
        this.selectLoading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleTypeChange() {
      this.form.relate_id = ''
    },
    cancel () {
      this.resetFormFields()
      this.$emit('cancel')
    },
    confirm () {
      this.$refs['issuedForm'].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form)
          this.$emit('confirm', data)
        } else {
          return false
        }
      })
    },
    resetFormFields () {
      this.$refs['issuedForm'].resetFields()
    }
  }
}
</script>

<style lang="scss">
  .select-dropdown {
    position: absolute;
    right: 8px;
    z-index: 999;
    padding: 0 8px;
    color: #8492a6;
    font-size: 13px
  }
</style>

<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="140px" ref="accountForm" size="large">
      <el-form-item :label="$t('account.name')" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('account.password')" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('account.rePassword')" prop="password_confirmation">
        <el-input v-model="form.password_confirmation" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('account.title')" prop="auth_group_id">
        <el-select v-model="form.auth_group_id" style="width: 60%">
          <el-option v-for="(item, index) in groupList" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
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
import RoleRequest from '@/api/role'

export default {
  name: 'account-form',
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
          name: '',
          password: '',
          password_confirmation: '',
          auth_group_id: '',
        }
      },
    }
  },
  watch: {
    data(val) {
      this.form = val
    }
  },
  created() {
    this.getAuthGroup()
  },
  data () {
    return {
      groupList: [],
      form: this.data,
      rules: {
        name: [{ required: true, message: this.$t('account.validate.name'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('account.validate.password'), trigger: 'blur' }],
        password_confirmation: [{ required: true, validator: this.checkPassword, trigger: 'blur' }],
        auth_group_id: [{ required: true, message: this.$t('account.validate.groupId'), trigger: 'blur' }],
      }
    }
  },
  methods: {
    cancel () {
      this.resetFormFields()
      this.$emit('cancel')
    },
    confirm () {
      this.$refs['accountForm'].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form)
          this.$emit('confirm', data)
        } else {
          return false
        }
      })
    },
    checkPassword(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('account.validate.rePassword')))
      } else if (value !== this.form.password) {
        callback(new Error(this.$t('account.validate.passwordNotMatch')))
      } else {
        callback()
      }
    },
    getAuthGroup() {
      RoleRequest.all().then(res => {
        this.groupList = res.data
      }).catch(err => {
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    resetFormFields () {
      this.$refs['accountForm'].resetFields()
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

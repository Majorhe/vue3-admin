<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="140px" ref="accountForm" size="large">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="form.position" autocomplete="off"></el-input>
      </el-form-item>
      <template v-if="form.id == undefined">
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="password_confirmation">
          <el-input v-model="form.password_confirmation" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="所属角色" prop="role">
        <el-select multiple v-model="form.role" style="width: 100%">
          <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div style="text-align: right">
        <el-form-item>
          <el-button :loading="loading" :disabled="loading" type="primary" @click="confirm">确认</el-button>
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
          phone: '',
          email: '',
          position: '',
          password: '',
          password_confirmation: '',
          role: '',
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
      roleList: [],
      form: this.data,
      rules: {
        name: [{ required: true, message: '管理员名称不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号码不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        password_confirmation: [{ required: true, validator: this.checkPassword, trigger: 'blur' }],
        role: [{ required: true, message: '管理员所属角色不能为空', trigger: 'blur' }],
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
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.form.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    getAuthGroup() {
      RoleRequest.list().then(res => {
        this.roleList = res
      }).catch(err => {
        this.$message.error(err || '获取角色数据失败')
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

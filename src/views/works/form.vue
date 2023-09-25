<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="100px" ref="workForm" size="large">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属用户" prop="author">
        <user-select v-model="form.author" style="width: 50%"></user-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input  v-model="form.content" type="textarea" :autosize="{minRows: 10}" placeholder="作品内容" show-word-limit/>
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
import UserSelect from "@/components/user-select";

export default {
  name: 'work-form',
  components: {UserSelect},
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
          title: '',
          content: '',
          author: '',
        }
      },
    }
  },
  watch: {
    data(val) {
      this.form = val
    }
  },
  data () {
    return {
      userList: [],
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
      this.$refs['workForm'].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form)
          this.$emit('confirm', data)
        } else {
          return false
        }
      })
    },
    resetFormFields () {
      this.$refs['workForm'].resetFields()
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

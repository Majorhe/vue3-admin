<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="100px" ref="roleForm" size="large">
      <el-form-item :label="$t('role.title')" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('role.description')" prop="description">
        <el-input v-model="form.description" type="textarea" autocomplete="off"></el-input>
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

export default {
  name: 'role-form',
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
          description: ''
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
      form: this.data,
      rules: {
        title: [{ required: true, message: this.$t('role.validate.title'), trigger: 'blur' }],
        description: [{ required: true, message: this.$t('role.validate.description'), trigger: 'blur' }],
      }
    }
  },
  methods: {
    cancel () {
      this.resetFormFields()
      this.$emit('cancel')
    },
    confirm () {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form)
          this.$emit('confirm', data)
        } else {
          return false
        }
      })
    },
    resetFormFields () {
      this.$refs['roleForm'].resetFields()
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

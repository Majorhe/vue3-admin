<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="menuForm" size="large">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="路由名称" prop="route">
        <el-input v-model="form.route" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单">
        <el-select v-model="form.pid" filterable style="width: 100%">
          <el-option label="一级菜单" :value="0"></el-option>
          <el-option v-for="(menu, index) in menuList.value" :key="index" :value="menu.id" :label="menu.name">
            <span v-html="menu.name"></span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-tooltip :content="form.status == 1 ? $t('button.disabled') : $t('button.enabled')">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" inactive-color="#ff4949"></el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">视图</el-radio>
          <el-radio :label="2">操作</el-radio>
        </el-radio-group>
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
import { inject } from 'vue'

export default {
  name: 'menu-form',
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
          route: '',
          pid: 0,
          status: 1,
          type: 1,
        }
      },
    }
  },
  watch: {
    data(val) {
      this.form = val
    }
  },
  setup() {
    const menuList = inject('menuList')
    return { menuList }
  },
  data () {
    return {
      form: this.data,
      rules: {
        name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        route: [{ required: true, message: '菜单路由不能为空', trigger: 'blur' }],
      }
    }
  },
  methods: {
    cancel () {
      this.resetFormFields()
      this.$emit('cancel')
    },
    confirm () {
      this.$refs['menuForm'].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form)
          // console.log(data)
          this.$emit('confirm', data)
        } else {
          return false
        }
      })
    },
    resetFormFields () {
      this.$refs['menuForm'].resetFields()
    },
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

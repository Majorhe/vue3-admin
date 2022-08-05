<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="menuForm" size="large">
      <el-form-item :label="$t('menu.title')" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.path')" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.perMenu')">
        <el-select v-model="form.parentid" filterable style="width: 100%">
          <el-option :label="$t('menu.firstLevel')" :value="0"></el-option>
          <el-option v-for="(menu, index) in menuList.value" :key="index" :value="menu.id" :label="htmlDecode(menu)">
            <span v-html="menu.title"></span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.sort')">
        <el-input v-model="form.listorder" type="number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.status')">
        <el-tooltip :content="form.status == 1 ? $t('button.disabled') : $t('button.enabled')">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" inactive-color="#ff4949"></el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="$t('menu.type')">
        <el-radio-group v-model="form.type">
          <el-radio :label="2">{{ $t('menu.type2menu') }}</el-radio>
          <el-radio :label="1" >{{ $t('menu.type2action') }}</el-radio>
        </el-radio-group>
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
          title: '',
          parentid: 0,
          status: 1,
          type: 2,
          listorder: 100
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
        name: [{ required: true, message: this.$t('menu.validate.path'), trigger: 'blur' }],
        title: [{ required: true, message: this.$t('menu.validate.title'), trigger: 'blur' }],
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
    htmlDecode(menu){
      return (menu.title).replace(menu.spacer, '')
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

<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="120px" ref="categoryForm" size="large">
      <el-form-item :label="$t('category.name')" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('category.perCategory')">
        <el-select v-model="form.pid" filterable style="width: 100%">
          <el-option :label="$t('category.firstLevel')" :value="0"></el-option>
          <el-option v-for="(cate, index) in categoryList" :key="index" :value="cate.id" :label="htmlDecode(cate)">
            <span v-html="cate.name"></span>
          </el-option>
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
import { inject } from 'vue'

export default {
  name: 'category-form',
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
          pid: 0,
        }
      },
    }
  },
  computed: {
    categoryList() {
      return this.cateList.value.filter(cate => { return cate.pid == 0 })
    }
  },
  watch: {
    data(val) {
      this.form = val
    }
  },
  setup() {
    const cateList = inject('cateList')
    return { cateList }
  },
  data () {
    return {
      form: this.data,
      rules: {
        name: [{ required: true, message: this.$t('category.validate.path'), trigger: 'blur' }],
      }
    }
  },
  methods: {
    cancel () {
      this.resetFormFields()
      this.$emit('cancel')
    },
    confirm () {
      this.$refs['categoryForm'].validate(valid => {
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
      this.$refs['categoryForm'].resetFields()
    },
    htmlDecode(cate){
      return (cate.name).replace(cate.spacer, '')
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

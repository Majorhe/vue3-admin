<template>
  <el-select
      v-model="val"
      :filterable="true"
      :remote="true"
      :remote-method="handleSearch"
      :placeholder="placeholder"
      :loading="loading"
      @change="handleChange"
      style="width: 100%"
  >
    <el-option v-for="(opt, index) in options" :key="index" :label="`[${opt.id}]${opt.name}`" :value="opt.id"></el-option>
  </el-select>
</template>

<script>
import UserRequest from '@/api/user'

export default {
  name: "user-select",
  emits: ['change', 'input'],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '用户名/手机'
    }
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  data() {
    return {
      loading: false,
      options: []
    }
  },
  methods: {
    refresh(keyword) {
      this.handleSearch(keyword)
    },
    handleSearch(keyword) {
      this.loading = true
      UserRequest.search({keyword: keyword}).then(res => {
        this.options = res.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err || this.$t('message.getFail'))
      })
    },
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>

</style>
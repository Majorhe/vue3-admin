<template>
  <el-dialog :title="$t('category.addFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <category-form ref="categoryForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></category-form>
  </el-dialog>
</template>

<script>
import CategoryRequest from '@/api/category'
import CategoryForm from './form'

export default {
  name: 'category-add',
  components: {CategoryForm},
  emits: ['success', 'close'],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    pid: {
      type: Number,
      default: 0
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
    },
    form() {
      return {
        name: '',
        pid: this.pid,
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleConfirm (form) {
      this.loading = true
      CategoryRequest.add(form).then(() => {
        this.visible = false
        this.$message.success(this.$t('message.operateSuccess'))
        this.loading = false
        this.$emit('success')
      }).catch(err => {
        // console.log(err)
        this.loading = false
        this.$message.error(err)
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleClose () {
      this.$refs['categoryForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-dialog :title="$t('category.editFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <category-form ref="categoryForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></category-form>
  </el-dialog>
</template>

<script>
import CategoryRequest from '@/api/category'
import CategoryForm from './form'

export default {
  name: 'category-edit',
  components: {CategoryForm},
  emits: ['success', 'close'],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      required: true
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
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleConfirm (form) {
      CategoryRequest.update(form).then(() => {
        this.visible = false
        this.$message.success(this.$t('message.operateSuccess'))
        this.$emit('success')
      }).catch(err => {
        this.$message.error(err || this.$t('message.operateFail'))
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

<template>
  <el-dialog :title="$t('role.editFormTitle')" v-model="visible" @close="handleClose" center width="70vw">
    <work-form ref="workForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></work-form>
  </el-dialog>
</template>

<script>
import WorkRequest from '@/api/works'
import WorkForm from './form'

export default {
  name: 'work-edit',
  components: {WorkForm},
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
      WorkRequest.update(form).then(() => {
        this.visible = false
        this.$message.success('编辑成功')
        this.$emit('success')
      }).catch(err => {
        this.$message.error(err || '操作失败')
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleClose () {
      this.$refs['workForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

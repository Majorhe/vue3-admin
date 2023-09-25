<template>
  <el-dialog title="作品添加" v-model="visible" @close="handleClose" center width="70vw">
    <work-form ref="workForm" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></work-form>
  </el-dialog>
</template>

<script>
import WorkRequest from '@/api/works'
import WorkForm from './form'

export default {
  name: 'work-add',
  components: {WorkForm},
  emits: ['success', 'close'],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
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
      this.loading = true
      WorkRequest.add(form).then(() => {
        this.visible = false
        this.$message.success('添加成功')
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
      this.$refs['workForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

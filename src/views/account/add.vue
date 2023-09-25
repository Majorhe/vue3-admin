<template>
  <el-dialog title="添加管理员" v-model="visible" @close="handleClose" center width="640px">
    <account-form ref="accountForm" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></account-form>
  </el-dialog>
</template>

<script>
import AccountRequest from '@/api/account'
import AccountForm from './form'

export default {
  name: 'account-add',
  components: {AccountForm},
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
      AccountRequest.add(form).then(() => {
        this.visible = false
        this.loading = false
        this.$message.success(this.$t('message.operateSuccess'))
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
      this.$refs['accountForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

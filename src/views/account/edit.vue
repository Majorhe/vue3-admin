<template>
  <el-dialog :title="$t('account.editFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <account-form ref="accountForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></account-form>
  </el-dialog>
</template>

<script>
import AccountRequest from '@/api/account'
import AccountForm from './form'

export default {
  name: 'account-edit',
  components: {AccountForm},
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
      AccountRequest.update(form).then(() => {
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
      this.$refs['accountForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

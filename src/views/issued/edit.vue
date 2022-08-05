<template>
  <el-dialog :title="$t('issued.editFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <issued-form ref="issuedForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></issued-form>
  </el-dialog>
</template>

<script>
import IssuedRequest from '@/api/issued'
import IssuedForm from './form'

export default {
  name: 'issued-edit',
  components: {IssuedForm},
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
      IssuedRequest.update(form).then(() => {
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
      this.$refs['issuedForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

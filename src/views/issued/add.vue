<template>
  <el-dialog :title="$t('issued.addFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <issued-form ref="issuedForm" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></issued-form>
  </el-dialog>
</template>

<script>
import IssuedRequest from '@/api/issued'
import IssuedForm from './form'

export default {
  name: 'issued-add',
  components: {IssuedForm},
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
      IssuedRequest.add(form).then(() => {
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
      this.$refs['issuedForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

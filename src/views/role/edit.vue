<template>
  <el-dialog :title="$t('role.editFormTitle')" v-model="visible" @close="handleClose" center width="500px">
    <role-form ref="roleForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></role-form>
  </el-dialog>
</template>

<script>
import RoleRequest from '@/api/role'
import RoleForm from './form'

export default {
  name: 'role-edit',
  components: {RoleForm},
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
      RoleRequest.update(form).then(() => {
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
      this.$refs['roleForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

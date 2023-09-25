<template>
  <el-dialog :title="$t('role.addFormTitle')" v-model="visible" @close="handleClose" center width="500px">
    <role-form ref="roleForm" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></role-form>
  </el-dialog>
</template>

<script>
import RoleRequest from '@/api/role'
import RoleForm from './form'

export default {
  name: 'role-add',
  components: {RoleForm},
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
      RoleRequest.add(form).then(() => {
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
      this.$refs['roleForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

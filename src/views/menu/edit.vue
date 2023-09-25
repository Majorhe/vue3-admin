<template>
  <el-dialog :title="$t('menu.editFormTitle')" v-model="visible" @close="handleClose" center width="800px">
    <menu-form ref="menuForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></menu-form>
  </el-dialog>
</template>

<script>
import MenuRequest from '@/api/menu'
import MenuForm from './form'

export default {
  name: 'menu-edit',
  components: {MenuForm},
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
      MenuRequest.update(form).then(() => {
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
      this.$refs['menuForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

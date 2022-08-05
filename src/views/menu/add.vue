<template>
  <el-dialog :title="$t('menu.addFormTitle')" v-model="visible" @close="handleClose" center width="800px">
    <menu-form ref="menuForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></menu-form>
  </el-dialog>
</template>

<script>
import MenuRequest from '@/api/menu'
import MenuForm from './form'

export default {
  name: 'menu-add',
  components: {MenuForm},
  emits: ['success', 'close'],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    pid: {
      type: Number,
      default: 0
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
    },
    form() {
      return {
        name: '',
        title: '',
        parentid: this.pid,
        icon: '',
        status: 1,
        type: 2,
        listorder: 100
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
      MenuRequest.add(form).then(() => {
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
      this.$refs['menuForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

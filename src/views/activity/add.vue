<template>
  <el-dialog :title="$t('activity.addFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <activity-form ref="activityForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></activity-form>
  </el-dialog>
</template>

<script>
import ActivityRequest from '@/api/activity'
import ActivityForm from './form'

export default {
  name: 'activity-add',
  components: {ActivityForm},
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
      return {}
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
      ActivityRequest.add(form).then(() => {
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
      this.$refs['activityForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

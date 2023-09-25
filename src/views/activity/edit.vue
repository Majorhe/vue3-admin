<template>
  <el-dialog :title="$t('activity.editFormTitle')" v-model="visible" @close="handleClose" center width="640px">
    <activity-form ref="activityForm" :data="form" :loading="loading" @cancel="handleCancel" @confirm="handleConfirm"></activity-form>
  </el-dialog>
</template>

<script>
import ActivityRequest from '@/api/activity'
import ActivityForm from './form'

export default {
  name: 'activity-edit',
  components: {ActivityForm},
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
      ActivityRequest.update(form).then(() => {
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
      this.$refs['activityForm'].resetFormFields()
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-scrollbar height="500px">
    <el-form :model="form" :rules="rules" label-width="120px" ref="activityForm" size="large">
      <el-form-item :label="$t('activity.title')" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('activity.desc')" prop="description">
        <el-input v-model="form.description" type="textarea" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('activity.link')" prop="link">
        <el-input v-model="form.link" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('activity.sort')">
        <el-input v-model="form.sort" type="number" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item :label="$t('activity.startTime')">
        <el-date-picker v-model="form.start_time" type="datetime" style="width: 100%"/>
      </el-form-item>

      <el-form-item :label="$t('activity.endTime')">
        <el-date-picker v-model="form.end_time" type="datetime" style="width: 100%"/>
      </el-form-item>

      <el-form-item :label="$t('activity.status')">
        <el-select v-model="form.status">
          <el-option :label="$t('activity.statusText.0')" :value="0"></el-option>
          <el-option :label="$t('activity.statusText.1')" :value="1"></el-option>
          <el-option :label="$t('activity.statusText.2')" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('activity.template')">
        <div class="d-flex">
          <div :class="{'template-large': true, 'active': form.template == 'large'}" @click="form.template = 'large'">
            <el-icon class="checked-icon" v-if="form.template == 'large'"><Check /></el-icon>
          </div>
          <div :class="{'template-mini': true, 'active': form.template == 'mini'}" @click="form.template = 'mini'">
            <el-icon class="checked-icon" v-if="form.template == 'mini'"><Check /></el-icon>
          </div>
        </div>
      </el-form-item>

      <el-form-item :label="$t('activity.bgColor')">
        <el-color-picker v-model="form.bgColor" />
      </el-form-item>

      <el-form-item :label="$t('activity.bgImage')">
        <el-image :src="cover(form.bgImage, 'xs')" fit="contain" style="width: 100px; height: 100px;" @click="handleChooseImage">
          <template #error>
            <div class="image-choose d-flex flex-justify-center flex-align-center" @click="handleChooseImage">
              <el-icon size="50px"><CirclePlusFilled /></el-icon>
            </div>
          </template>
        </el-image>
        <file-select ref="pictureSelect" @confirm="handleFileChoose"></file-select>
      </el-form-item>

      <el-form-item :label="$t('activity.position')">
        <el-tooltip :content="form.open_atlas == 1 ? $t('button.hide') : $t('button.show')">
          <el-switch v-model="form.open_atlas" :active-value="1" :inactive-value="0" inactive-color="#ff4949"></el-switch>
        </el-tooltip>
      </el-form-item>

      <div style="text-align: right">
        <el-form-item>
          <el-button :loading="loading" :disabled="loading" type="primary" @click="confirm">{{ $t('button.confirm') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-scrollbar>
</template>

<script>
import FileSelect from "@/components/file-select";
import tools from "@/utils/tools";

export default {
  name: 'activity-form',
  components: {FileSelect},
  emits: ['cancel', 'confirm'],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          title: '',
          link: '',
          description: '',
          sort: '',
          start_time: '',
          end_time: '',
          template: '',
          bgColor: '',
          bgImage: '',
          open_atlas: 0,
          status: 0,
        }
      },
    }
  },
  watch: {
    data(val) {
      this.form = val
    }
  },
  data () {
    return {
      form: this.data,
      rules: {
        title: [{ required: true, message: this.$t('activity.validate.title'), trigger: 'blur' }],
        link: [{ required: true, message: this.$t('activity.validate.link'), trigger: 'blur' }],
        description: [{ required: true, message: this.$t('activity.validate.desc'), trigger: 'blur' }],
      }
    }
  },
  methods: {
    cancel () {
      this.resetFormFields()
      this.$emit('cancel')
    },
    confirm () {
      this.$refs['activityForm'].validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form)
          // console.log(data)
          this.$emit('confirm', data)
        } else {
          return false
        }
      })
    },
    handleChooseImage() {
      this.$refs.pictureSelect.open()
    },
    handleFileChoose(data) {
      this.form.bgImage = data
      this.$refs.pictureSelect.close()
    },
    cover(file, mode) {
      return tools.cdn(file, mode)
    },
    resetFormFields () {
      this.$refs['activityForm'].resetFields()
    }
  }
}
</script>

<style lang="scss">
  .image-choose { width: 98px; height: 98px; background: var(--el-color-info-light-8);}
  .template-mini {
    position: relative;
    width: 168px;
    height: 80px;
    border-radius: 8px;
    margin-left: 20px;
    background-color: var(--el-color-primary-light-8);

    &:before {
      content: ' ';
      position: absolute;
      top: 10px;
      left: 10px;
      width: calc(100% - 50px);
      height: 20px;
      border-radius: 4px;
      background-color: var(--el-color-primary);
    }
    &:after {
      content: ' ';
      position: absolute;
      top: 40px;
      left: 10px;
      width: calc(100% - 20px);
      height: 30px;
      border-radius: 4px;
      background-color: var(--el-color-primary);
    }
    .checked-icon {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .template-large {
    position: relative;
    width: 168px;
    height: 158px;
    border-radius: 8px;
    background-color: var(--el-color-primary-light-8);

    &:before {
      content: ' ';
      position: absolute;
      top: 10px;
      left: 10px;
      width: calc(100% - 50px);
      height: 20px;
      border-radius: 4px;
      background-color: var(--el-color-primary);
    }
    &:after {
      content: ' ';
      position: absolute;
      top: 40px;
      left: 10px;
      width: calc(100% - 20px);
      height: 110px;
      border-radius: 4px;
      background-color: var(--el-color-primary);
    }
    .checked-icon {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .active {
    box-shadow: 0 0 5px 1px var(--el-color-primary);
  }
</style>

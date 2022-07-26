<template>
  <el-drawer v-model="show" title="布局配置" direction="rtl" :size="400" @close="close">
    <!--  dark mode switch  -->
    <div class="el-drawer-item">
      <span class="label">{{ $t('config.theme') }}</span>
      <el-switch :model-value="theme === 'dark'" @change="handleSwitchTheme"/>
    </div>
    <!--  language selector  -->
    <div class="el-drawer-item">
      <span class="label">{{ $t('config.lang') }}</span>
      <el-select v-model="lang" @change="handleLanguageChange">
        <el-option label="中文简体" value="zh-CN"/>
        <el-option label="English" value="en-US"/>
      </el-select>
    </div>
    <el-divider />
    <!--  menu layout  -->
    <div class="el-drawer-item d-flex flex-align-center">
      <span class="label">{{ $t('config.menu') }}</span>
      <div class="menu-mode d-flex">
        <!-- multiple column -->
        <div class="mode mode-multiple-column" :class="{active: layout === 'multiple-column'}" @click="handleLayoutChange('multiple-column')">
          <div class="mode-wrapper"></div>
          <el-icon class="checked-icon"><Check /></el-icon>
        </div>
        <!-- classic -->
        <div class="mode mode-classic" :class="{active: layout === 'classic'}" @click="handleLayoutChange('classic')">
          <div class="mode-wrapper"></div>
          <el-icon class="checked-icon"><Check /></el-icon>
        </div>
      </div>
    </div>
    <!--  tabs switch  -->
    <div class="el-drawer-item">
      <span class="label">{{ $t('config.tabs') }}</span>
      <el-switch :model-value="tabs === 'show'" @change="handleSwitchTabs"/>
    </div>
    <el-divider />

  </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'config-section',
  computed: {
    ...mapState({
      config: state => { return state.config.config }
    }),
    theme() {
      return this.config && this.config.theme ? this.config.theme : 'light'
    },
    layout() {
      return this.config && this.config.layout ? this.config.layout : 'multiple-column'
    },
    tabs() {
      return this.config && this.config.tabs ? this.config.tabs : 'show'
    },
  },
  data() {
    return {
      show: false,
      menuValues: ['multiple-column', 'classic'],
      lang: localStorage.getItem('lang') || 'zh-CN',
    }
  },
  methods: {
    handleLanguageChange(val) {
      localStorage.setItem('lang', val)
    },
    handleLayoutChange(val) {
      if (this.layout === val) {
        return
      }
      this.layout = val
      this.config.layout = val
      this.$store.commit('config/set', this.config)
    },
    handleSwitchTheme(status) {
      this.config.theme = status ? 'dark' : 'light'
      this.$store.commit('config/set', this.config)
      if (status) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    },
    handleSwitchTabs(status) {
      this.config.tabs = status ? 'show' : 'hide'
      this.$store.commit('config/set', this.config)
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-drawer-item {
    line-height: 32px;
    padding-bottom: 18px;

    .label {
      display: inline-block;
      width: 120px;
      padding-right: 16px;
    }
  }
  .menu-mode {
    .active {
      box-shadow: 0 0 0 2px var(--el-color-primary) !important;
      .checked-icon {
        display: block !important;
        color: var(--el-color-primary);
      }
    }
    .mode {
      position: relative;
      width: 80px;
      height: 55px;
      margin: 10px 20px 10px 0;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      background-color: var(--g-app-bg);
      box-shadow: 0 0 5px 1px var(--el-color-primary);
      transition: .2s;

      .checked-icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: none;
      }
    }

    .mode-multiple-column {
      &:before {
        content: "";
        top: 5px;
        left: 5px;
        bottom: 5px;
        width: 10px;
        background-color: var(--el-color-primary);
      }
      &:after {
        content: "";
        top: 5px;
        left: 20px;
        bottom: 5px;
        width: 15px;
        background-color: var(--el-color-primary);
        opacity: .5;
      }
      .mode-wrapper {
        top: 5px;
        left: 40px;
        right: 5px;
        bottom: 5px;
        border: 1px dashed var(--el-color-primary);
      }
      &:before, &:after, .mode-wrapper {
        pointer-events: none;
        position: absolute;
        border-radius: 3px;
      }
    }

    .mode-classic {
      &:before {
        content: "";
        top: 5px;
        left: 5px;
        right: 5px;
        height: 10px;
        background-color: var(--el-color-primary);
      }
      &:after {
        content: "";
        top: 20px;
        left: 5px;
        bottom: 5px;
        width: 15px;
        background-color: var(--el-color-primary);
        opacity: .5;
      }
      .mode-wrapper {
        top: 20px;
        left: 25px;
        right: 5px;
        bottom: 5px;
        border: 1px dashed var(--el-color-primary);
      }
      &:before, &:after, .mode-wrapper {
        pointer-events: none;
        position: absolute;
        border-radius: 3px;
      }
    }

    .mode-wrapper:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--el-color-primary);
      opacity: .2;
    }
  }
</style>
<template>
  <div class="layout-menu-component">
    <el-container class="layout-container">
      <el-header class="no-padding">
        <div class="logo-wrapper d-flex flex-align-center">
          <el-image :src="require('@/assets/logo.png')" style="width: 30px; height: 30px"></el-image>
          <h3 style="margin-left: 10px">{{ title }}</h3>
        </div>
        <div class="header-section-wrapper d-flex flex-justify-between flex-align-center">
          <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index"> {{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <header-section></header-section>
        </div>
      </el-header>
      <el-container style="height: calc(100vh - 60px)">
        <el-aside width="210px">
          <el-menu
              :default-active="activeMenu"
              :collapse="isCollapse"
              @select="handleMenuSelect"
              class="menu"
          >
            <el-sub-menu v-for="menu in menuList" :key="menu.id" :index="menu.name">
              <template #title>
                <el-icon>
                  <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <template v-for="subMenu in menu.children" :key="subMenu.id">
                <el-menu-item v-if="subMenu.leaf" :index="subMenu.name">
                  <template #title>
                    <el-icon>
                      <component :is="subMenu.icon" />
                    </el-icon>
                    <span>{{ subMenu.title }}</span>
                  </template>
                </el-menu-item>
                <el-sub-menu v-else :index="subMenu.name">
                  <template #title>
                    <el-icon>
                      <component :is="subMenu.icon" />
                    </el-icon>
                    <span>{{ subMenu.title }}</span>
                  </template>
                  <el-menu-item v-for="thirdMenu in subMenu.children" :key="thirdMenu.id" :index="thirdMenu.name">
                    <template #title>
                      <el-icon>
                        <component :is="thirdMenu.icon" />
                      </el-icon>
                      <span>{{ thirdMenu.title }}</span>
                    </template>
                  </el-menu-item>
                </el-sub-menu>
              </template>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderSection from "@/components/section/header";
import menu from '@/mixins/menu'

export default {
  name: 'layout-menu',
  mixins: [menu],
  components: {HeaderSection},
  data() {
    return {
      breadcrumb: [],
      title: process.env.VUE_APP_NAME
    }
  },
  mounted() {
    this.breadcrumb = this.$route.matched
  },
  methods: {
    handleRouteChange(e) {
      this.activeMenu = e.name
      this.breadcrumb = this.$route.matched
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}
.logo-wrapper {
  width: 210px;
  height: 100%;
  padding: 0 20px;
  border-right: 1px solid var(--el-menu-border-color);
}
.header-section-wrapper {
  width: calc(100% - 211px);
  padding-left: 20px;
  height: 100%;
}
.menu {
  height: 100%;
}
</style>
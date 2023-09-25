<template>
  <div class="layout-menu-component">
    <el-container class="layout-container">
      <el-aside width="270px" class="d-flex">
        <div class="first-menu-wrapper">
          <div style="width: 100%; height: 44px">
            <el-image :src="require('@/assets/logo.png')" fit="contain" style="width: 100%; height: 30px"></el-image>
          </div>
          <div style="height: calc(100vh - 95px)">
            <el-scrollbar>
              <div
                  v-for="(menu, index) in menuList"
                  :key="index"
                  :class="{'first-menu-item': true, 'active': activeIndex == index}"
                  @click="activeIndex = index"
              >
                <el-icon class="first-menu-icon">
                  <component :is="menu.icon" />
                </el-icon>
                <span class="first-menu-title">{{ menu.title }}</span>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div>
          <div class="menu-header">
            <h3 class="text-align-center">{{ title }}</h3>
            <el-divider class="menu-header-divider">
              {{ menuList[activeIndex].title }}
            </el-divider>
          </div>
          <div style="height: calc(100vh - 95px)">
            <el-scrollbar>
              <el-menu :default-active="activeMenu" :collapse="isCollapse" @select="handleMenuSelect" class="menu">
                <template v-for="subMenu in showMenu" :key="subMenu.id">
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
              </el-menu>
            </el-scrollbar>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header class="no-padding-right">
          <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index"> {{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <header-section></header-section>
          </div>
        </el-header>
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
  name: 'layout-default',
  mixins: [ menu ],
  components: { HeaderSection },
  computed: {
    showMenu() {
      if (!this.menuList[this.activeIndex].leaf) {
        return this.menuList[this.activeIndex].children
      }
      return [this.menuList[this.activeIndex]]
    },

  },
  data() {
    return {
      activeIndex: 0,
      breadcrumb: [],
      title: process.env.VUE_APP_NAME
    }
  },
  mounted() {
    this.breadcrumb = this.$route.matched
    this.mapActiveIndexByRouteName()
  },
  methods: {
    handleRouteChange(e) {
      this.activeMenu = e.name
      this.breadcrumb = this.$route.matched
      this.mapActiveIndexByRouteName()
    },
    mapActiveIndexByRouteName() {
      let firstMenuName = this.$route.matched[0].name
      for (let i = 0; i < this.menuList.length; i++) {
        if (firstMenuName == this.menuList[i].name) {
          this.activeIndex = i
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  overflow-y: hidden;
  background-color: var(--el-menu-bg-color);
}
.first-menu-wrapper {
  padding: 15px 0 20px 0;
  border-right: 1px solid var(--el-menu-border-color);

  .first-menu-item {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 10px 15px;
    width: 64px;
    cursor: pointer;
  }
  .first-menu-item:hover {
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
    opacify: 0.8;
  }
  .active {
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
  }
  .first-menu-icon {
    font-size: 18px;
    margin-bottom: 6px;
  }
  .first-menu-title {
    text-align: center;
  }
}
.menu-header {
  background: var(--el-menu-bg-color);
  h3 {
    height: 35px;
    font-size: 18px;
    margin-top: 15px;
  }
  .menu-header-divider {
    margin-top: 9px;
  }
}
.menu {
  width: 204px;
  height: calc(100% - 90px);
}
</style>
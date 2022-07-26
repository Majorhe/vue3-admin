<template>
  <div class="layout-menu-component">
    <el-container class="layout-container">
      <el-aside width="270px" class="d-flex">
        <div class="first-menu-wrapper">
          <el-image :src="require('@/assets/logo.png')" fit="contain" style="width: 100%; height: 44px"></el-image>
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
        </div>
        <div>
          <div class="menu-header">
            <h3 class="text-align-center">Vue3 Admin</h3>
            <el-divider class="menu-header-divider">
              {{ menuList[activeIndex].title }}
            </el-divider>
          </div>
          <el-menu :default-active="activeMenu" :collapse="isCollapse" @select="handleMenuSelect" class="menu">
              <template v-for="(subMenu, index) in showMenu" :key="index">
                <el-menu-item v-if="subMenu.leaf" :index="subMenu.name">
                  <template #title>
                    <el-icon>
                      <component :is="subMenu.icon" />
                    </el-icon>
                    <span>{{ subMenu.title }}</span>
                  </template>
                </el-menu-item>
                <el-sub-menu v-else>
                  <template #title>
                    <el-icon>
                      <component :is="subMenu.icon" />
                    </el-icon>
                    <span>{{ subMenu.title }}</span>
                  </template>
                  <el-menu-item v-for="(thirdMenu, j) in subMenu.children" :key="index + '-' + k + '-' + j" :index="thirdMenu.name">
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
      breadcrumb: []
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
  padding: 10px 0 20px 0;
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
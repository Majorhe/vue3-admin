<template>
  <div class="header-section d-flex flex-justify-end flex-align-center">
    <el-badge :value="count" style="margin-right: 30px">
      <el-icon :size="20">
        <Bell />
      </el-icon>
    </el-badge>
    <div class="d-flex flex-align-center" style="margin-right: 30px">
      <el-icon :size="20" @click="handleOpenConfig">
        <Setting />
      </el-icon>
    </div>
    <div>
      <el-dropdown style="margin-left: 8px" @command="handleClick">
        <div class="d-flex flex-align-center">
          <el-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" :size="30"></el-avatar>
          <span style="margin-left: 10px">{{ userinfo.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userinfo">
              <el-icon>
                <UserFilled/>
              </el-icon>
              <span style="margin-left: 4px">{{ $t('header.userinfo') }}</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <el-icon>
                <SwitchButton/>
              </el-icon>
              <span style="margin-left: 4px">{{ $t('header.logout') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: 'header-section',
  computed: {
    ...mapState({
      userinfo: state => state.user.userinfo
    })
  },
  data() {
    return {
      count: 2,
      showConfig: false
    }
  },
  methods: {
    handleOpenConfig() {
      this.$bus.emit('open-config-popup')
    },
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.$store.commit('user/logout');
          this.$router.push({name: 'login'})
          return;
        case 'userinfo':
          this.$router.push({name: 'usercenter'})
          return;
        default:
          return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-section {
  //width: 100%;
  height: 100%;
  padding: 0 20px;
}
</style>
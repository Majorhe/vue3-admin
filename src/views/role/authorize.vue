<template>
  <el-dialog title="菜单设置" v-model="visible" @close="close" center width="640px" :destroy-on-close="true">
    <el-scrollbar height="50vh">
      <el-tree
          ref="authorizeTree"
          v-loading="loading"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="defaultExpandedKeys"
      />
    </el-scrollbar>
    <div style="padding-top: 20px">
      <el-button type="primary" :loading="loading" :disabled="loading" @click="authorize">{{ $t('button.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import RoleRequest from '@/api/role'
export default {
  name: "role-authorize",
  data() {
    return {
      loading: false,
      visible: false,
      role: {},
      treeData: [],
      defaultExpandedKeys: []
    }
  },
  methods: {
    getAuthorizeList(id) {
      this.loading = true
      RoleRequest.authorizeList(id).then(res => {
        if (this.treeData.length == 0) {
          this.toTreeData(res.menu)
        }
        this.defaultExpandedKeys = res.roleMenu.map(item => { return item.menu_id })
        this.$refs.authorizeTree.setCheckedKeys(this.defaultExpandedKeys)
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message.error('获取数据失败')
      })
    },
    authorize() {
      this.loading = true
      let menu = [
        ...this.$refs.authorizeTree.getCheckedKeys(),
        ...this.$refs.authorizeTree.getHalfCheckedKeys()
      ]
      RoleRequest.authorize(this.role.id, {'menu': menu}).then(() => {
        this.visible = false
        this.loading = false
        this.$message.success('设置成功')
      }).catch(err => {
        this.loading = false
        this.$message.error(err)
      })
    },
    toTreeData(data) {
      const func = function formatMenuList(lists, pid) {
        let treeData = []
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].pid === pid) {
            lists[i].children = func(lists, lists[i].id)
            lists[i].leaf = lists[i].children.length === 0
            let obj = {
              id: lists[i].id,
              label: lists[i].name,
              children: func(lists, lists[i].id)
            }
            treeData.push(obj)
          }
        }
        return treeData
      }
      this.treeData = func(data, 0)
    },
    open(role) {
      this.visible = true
      this.role = role
      this.getAuthorizeList(role.id)
    },
    close() {
      this.visible = false
    },
  }
}
</script>

<style scoped>

</style>
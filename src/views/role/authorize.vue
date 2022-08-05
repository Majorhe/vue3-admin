<template>
  <el-dialog :title="$t('button.authorize')" v-model="visible" @close="close" center width="640px" :destroy-on-close="true">
    <el-scrollbar height="500px">
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
      roleId: null,
      treeData: [],
      defaultExpandedKeys: []
    }
  },
  methods: {
    getAuthorizeList(id) {
      this.loading = true
      RoleRequest.authorizeList(id).then(res => {
        if (this.treeData.length == 0) {
          this.toTreeData(res.data)
        }
        this.defaultExpandedKeys = res.rule
        this.$refs.authorizeTree.setCheckedKeys(res.rule)
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message.error(this.$t('message.getFail'))
      })
    },
    authorize() {
      this.loading = true
      RoleRequest.authorize(this.roleId, { rules: this.$refs.authorizeTree.getCheckedKeys(),
            halfrules: this.$refs.authorizeTree.getHalfCheckedKeys()
      }).then(() => {
        this.visible = false
        this.loading = false
        this.$message.success(this.$t('message.operateSuccess'))
      }).catch(err => {
        this.loading = false
        this.$message.error(err)
      })
    },
    toTreeData(data) {
      const func = function formatMenuList(lists, pid) {
        let treeData = []
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].parentid === pid) {
            lists[i].children = func(lists, lists[i].id)
            lists[i].leaf = lists[i].children.length === 0
            let obj = {
              id: lists[i].id,
              label: lists[i].title,
              children: func(lists, lists[i].id)
            }
            treeData.push(obj)
          }
        }
        return treeData
      }
      this.treeData = func(data, 0)
    },
    open(id) {
      this.visible = true
      this.roleId = id
      this.getAuthorizeList(id)
    },
    close() {
      this.visible = false
    },
  }
}
</script>

<style scoped>

</style>
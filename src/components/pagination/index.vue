<template>
  <div class="custom-pagination">
    <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page.currentPage"
            :page-sizes="pageSizes"
            :page-size="page.pageNum"
            :total="page.total"
            @size-change="sizeChange"
            @current-change="currentChange"
            @prev-click="pervClick"
            @next-click="nextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'custom-pagination',
  props: {
    page: {
      type: Object,
      default: () => {
        return {
          total: 0,
          page_num: 30,
          current_page: 1,
          last_page: 1
        }
      }
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [30, 50, 80, 100]
      }
    }
  },
  methods: {
    sizeChange (data) {
      this.$emit('sizeChange', data)
    },
    currentChange (data) {
      this.$emit('currentChange', data)
    },
    pervClick (data) {
      this.$emit('pervClick', data)
    },
    nextClick (data) {
      this.$emit('nextClick', data)
    }
  }
}
</script>

<style lang="scss">
  .custom-pagination {
    padding-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
</style>

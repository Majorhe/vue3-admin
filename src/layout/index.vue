<template>
  <classic-menu v-if="layout === 'classic'"></classic-menu>
  <multiple-column-menu v-else></multiple-column-menu>
  <config-section ref="configSection"></config-section>
</template>

<script>
import ConfigSection from '@/components/section/config'
import ClassicMenu from './components/classic-menu'
import MultipleColumnMenu from './components/multiple-column-menu'

export default {
  name: 'layout-container',
  components: {ConfigSection, ClassicMenu, MultipleColumnMenu},
  computed: {
    layout() {
      let config = this.$store.getters['config/config']
      return config.layout ? config.layout : ''
    }
  },
  mounted() {
    this.$bus.on('open-config-popup', this.handleOpenConfig)
  },
  data() {
    return {

    }
  },
  methods: {
    handleOpenConfig() {
      this.$refs.configSection.open()
    }
  }
}
</script>

<style scoped>

</style>
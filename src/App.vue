<template>
  <div id="app" class="app-component">
    <nav-menu></nav-menu>
    <router-view></router-view>
    <foot-menu></foot-menu>
  </div>
</template>

<script>
  import NavMenu from './components/common/navMenu';
  import FootMenu from './components/common/footMenu';
  import './styles/common.css';
  import {getSEO} from '@/api/index';

  export default {
    name: 'App',
    components: {NavMenu, FootMenu},
    data() {
      return {
        seo: null
      }
    },
    created() {
      this.getSEO();
    },
    methods: {
      getSEO() {
        getSEO().then(response => {
          this.seo = response.data;
        })
      },
    }
  }
</script>

<style>
  .app-component {
    height: 100%;
  }
</style>

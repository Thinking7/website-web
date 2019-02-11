<template>
  <div class="head" id="head">
    <div class="head_nr" id="head_nr">
      <div class="head_logo" id="head_logo"><a href="/">
        <img alt="钵鼎展览展示工程（上海）有限公司"
                                                                      src="../../assets/index_logo.jpg">
      </a></div>
      <div class="head_dh" id="head_dh">
        <el-menu active-text-color="#ed3900" class="nav" mode="horizontal" style="border-bottom:solid 1px #ffffff">
          <el-menu-item index="0" class="nav_sub">
            <a href="/">首页</a>
          </el-menu-item>
          <el-submenu :index="nav.index" class="nav_sub" v-for="nav in list" :key="nav.id">
            <template slot="title">
              <router-link :to="nav.url">
                {{ nav.title }}
              </router-link>
            </template>
            <el-menu-item :index="child.index" v-for="child in nav.childs" :key="child.id" @click="toLink(child.url)">
              {{ child.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>

</template>
<script>
  import {fetchList} from '../../api/nav'

  export default {
    name: "navMenu",
    data() {
      return {
        list: null,
      }
    },
    created() {
      fetchList().then(response => {
        this.list = response.data;
      })
    },
    methods:{
      toLink(url){
        if(url.indexOf('http') !== -1){
          window.location.href = url;
        }else{
          this.$router.push({path: url})
        }
      }
    },
    watch: {
      '$route'(to, from) {
        if(to.path === from.path && to.name !== 'index'){
          this.$router.go(0);
        }
      }
    }
  }
</script>


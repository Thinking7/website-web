<template>
  <div>
    <div class="banner" id="banner">
      <img style="max-width:100%;max-height: 250px;" class="img-fill" alt="钵鼎展览展示工程（上海）有限公司" :src="banner.cover">
    </div>
    <!--banner结束-->
    <!--内容区域开始-->
    <div class="main" id="main">
      <div class="main_nr" id="main_nr">
        <!--内容区域左开始-->
        <div class="main_zuo" id="main_zuo">
          <div class="main_zuo_title"><img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/about_title.jpg"></div>
          <div class="main_zuo_lb">
            <div class="liebiao">
              <el-menu
                :default-active="item.id"
                class="el-menu-vertical-demo"
                background-color="#e8e8e8"
                text-color="#494949"
                active-text-color="#ed3900">
                <el-menu-item :index="values.id" v-for="(values,index) in list" @click="changeItem(index)"
                              :key="values.id">
                  <i class="el-icon-news"></i>
                  <span slot="title">{{values.sub_title}}</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
        <!--内容区域左结束-->
        <div class="main_you" id="main_you">
          <div class="main_mbx" id="main_mbx">
            您当前所在的位置：<a href="index.html">首页</a> > 关于钵鼎
          </div>
          <div class="main_nrqy" v-html="item.text">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {initList} from '@/api/company';
  import {fetchBanner} from '@/api/banner';

  export default {
    name: "company",
    data() {
      return {
        list: [],
        item: [],
        banner: [],
        id: 0,
        goods_count: 0,
      }
    },
    created() {
      const params = this.$route.query;
      if (params.id) {
        this.id = params.id;
      }
      this.init();
    },
    methods: {
      init() {
        initList({id: this.id}).then(response => {
          this.list = response.data.list;
          this.banner = response.data.banner;
          if (this.list && this.id > 0) {
            this.list.forEach((item, index) => {
              if (item.id === parseInt(this.id)) {
                this.item = item;
              }
            })
          }
          if(this.item.length <=0){
            this.item = this.list[0];
          }
        })
      },
      changeItem(index) {
        this.item = this.list[index];
      },
      initBanner() {
        fetchBanner({type: 'company'}).then(response => {
          this.banner = response.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>

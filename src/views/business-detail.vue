<template>
  <div>
    <!--头部结束-->
    <!--banner开始-->
    <div class="banner" id="banner">
      <img style="max-width:100%;max-height: 250px;" class="img-fill" alt="钵鼎展览展示工程（上海）有限公司" :src="banner.cover">
    </div>
    <!--banner结束-->
    <!--内容区域开始-->
    <div class="main" id="main">
      <div class="main_nr" id="main_nr">
        <!--内容区域左开始-->
        <div class="main_zuo" id="main_zuo">
          <div class="main_zuo_title">
            <img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/anlizhanshi.jpeg"></div>
          <div class="main_zuo_lb">
            <div class="liebiao">
              <el-menu
                :default-active="group_index"
                class="el-menu-vertical-demo"
                background-color="#e8e8e8"
                text-color="#494949"
                active-text-color="#ed3900">
                <el-menu-item :index="group.id" v-for="group in group_list" :key="group.id" @click="getGoodsList(group.id)">
                  <i class="el-icon-menu"></i>
                  <span >{{group.name}}</span>
                </el-menu-item>
                <!--<el-submenu :index="group.id" v-for="group in group_list" :key="group.id">-->
                  <!--<template slot="title">-->
                    <!--<i class="el-icon-menu"></i>-->
                    <!--<span @click="getGoodsList(group.id)">{{group.name}}</span>-->
                  <!--</template>-->
                  <!--<el-menu-item :index="child.index" v-for="child in group.childs" @click="getGoodsList(child.id)"-->
                                <!--:key="child.id">{{child.name}}-->
                  <!--</el-menu-item>-->
                <!--</el-submenu>-->
              </el-menu>
            </div>

        </div>
      </div>
      <!--内容区域左结束-->
      <!--内容区域右开始-->
      <div class="main_you">
        <div class="main_mbx">
          您当前所在的位置：<a href="/">首页</a> ><router-link to="/business">案例展示</router-link>   > {{goods.name}}

        </div>
        <div class="main_nrqy">
          <div class="product_detail01">
            <div class="product_content">
              <div class="pic-module">
                <div class="pic" style="padding-bottom: 5px;">
                  <pic-zoom
                    :url="goods.cover"
                    :scale="2">

                  </pic-zoom>
                </div>
                <div class="show" style="overflow: hidden">
                  <div class="clickL" @click="lastImgList()"></div>
                  <div class="picarea">
                    <li class="mutilimg" v-for="(img,index) in image_list" :key="index">
                      <img :src="img.url" @mouseover="mouseoverImg(index)" class="img-fill;" style="height: 70px">
                    </li>
                  </div>
                  <div class="clickR" @click="nextImgList()"></div>
                </div>
              </div>
              <div class="pro-module">
                <div class="name1" id="name1"><span>产品名称：</span>{{goods.name}}</div>
                <div class="code" id="code"><span>产品编号：</span>{{goods.code}}</div>
                <div class="skim" id="skim"><span>浏览次数：</span>{{goods.pv}}</div>
                <div class="summary" id="summary"><span>产品概要：</span>
                  {{goods.desc}}
                </div>
              </div>
            </div>
            <div class="product_detail" id="product_detail">
              <div class="current" id="current">产品详细介绍</div>
              <div class="showtabdiv" v-html="goods.text">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--内容区域右结束-->
    </div>
  </div>
  </div>
</template>

<script>
  import {findDetail, fetchCategoryList} from '@/api/business';
  import {fetchBanner} from '@/api/banner';
  import PicZoom from 'vue-piczoom'

  export default {
    name: "businessDetail",
    data() {
      return {
        group_list: [],
        banner: [],
        goods: {},
        id: 0,
        cover: "",
        group_index: 0,
        image_list: [],
        image_list_key: 0,
      }
    },
    components: {
      PicZoom
    },
    created() {
      const params = this.$route.query;
      if (!params.id) {
        this.$message.error('错误页面~');
        this.$router.push({path: '/'})
      }
      this.id = params.id;
      this.initBanner();
      this.getDetail();
      this.getCategory();
    },
    methods: {
      initBanner() {
        fetchBanner({type: 'business'}).then(response => {
          this.banner = response.data;
        })
      },
      getCategory() {
        fetchCategoryList().then(response => {
          this.group_list = response.data;
        })
      },
      getDetail() {
        findDetail({id: this.id}).then(response => {
          this.goods = response.data;
          this.group_index = this.goods.group_index;
          this.image_list = this.goods.image_list[0];
        })
      },
      nextImgList() {
        if (this.goods.image_list.length > this.image_list_key + 1) {
          this.image_list_key++;
          this.image_list = this.goods.image_list[this.image_list_key];
        }
      },
      lastImgList() {
        if (this.image_list_key > 0) {
          this.image_list_key--;

          this.image_list = this.goods.image_list[this.image_list_key];
        }
      },
      mouseoverImg(index) {
        this.goods.cover = this.image_list[index]['url']
      },
      getGoodsList(gid) {
        this.$router.push('/business?gid=' + gid);
      }
    }
  }
</script>

<style scoped>
</style>

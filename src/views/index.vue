<template>
  <!--banner开始-->
  <div class="body">
    <div class="banner" id="banner" style="padding-top: 80px;">
      <banner></banner>
    </div>
    <!--<div class="yewu" id="yewu">-->
    <!--<div class="yewu_nr" id="yewu_nr">-->
    <!--<div class="yewu_title" id="yewu_title">-->
    <!--<img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/index_ywtitle.png"></div>-->
    <!--<div class="yewu_fl" id="yewu_fl">-->
    <!--<li class="yewu_fllb" v-for="goods in data.goods_list" :key="goods.id">-->
    <!--<div class="yewu_tu">-->
    <!--<a>-->
    <!--<router-link :to="'/business/detail?id='+goods.id">-->
    <!--<img alt="钵鼎展览展示工程（上海）有限公司" class="img-fill" style="height: 180px" :src="goods.cover">-->
    <!--</router-link>-->
    <!--</a>-->
    <!--</div>-->
    <!--<div class="yewu_fltitle" id="yewu_fltitle">{{goods.name}}</div>-->
    <!--<div class="yewu_summary" id="yewu_summary">{{goods.desc}}</div>-->
    <!--</li>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div v-for="diy in data.diy_list" :key="diy.id" v-html="diy.options.text">
    </div>
    <!--新闻开始-->
    <div class="news" id="news">
      <div class="news_nr">
        <div class="news_title">
          <img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/index_newtitle.png"></div>
        <div class="news_zw">
          <a v-for="news in data.news_list" :key="news.id">
            <router-link :to="'/news/detail?id='+news.id">
              <div class="new_list">
                <div class="new_tu"><img alt="钵鼎展览展示工程（上海）有限公司" :src="news.cover"></div>
                <div class="new_info">
                  <div class="new_title">{{news.title}}</div>
                  <div class="new_sumary">{{news.desc}}</div>
                </div>
              </div>
            </router-link>
          </a>
        </div>
        <div class="more" id="more">
          <router-link to="/news">了解更多+</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from '../components/common/banner';
  import {getData} from '@/api/index';

  export default {
    name: 'index',
    data() {
      return {
        data: null
      }
    },
    components: {
      Banner,
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getData().then(response => {
          this.data = response.data;
        })
      },
    }

  }
</script>

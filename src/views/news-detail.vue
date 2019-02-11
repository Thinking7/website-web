<template>
  <div>
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
            <img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/xinwen.jpeg">
          </div>
          <div class="main_zuo_lb">
            <div class="liebiao">
              <el-menu
                :default-active="news.group_id"
                class="el-menu-vertical-demo"
                background-color="#e8e8e8"
                text-color="#494949"
                active-text-color="#ed3900">
                <el-menu-item :index="group.index" v-for="group in group_list" :key="group.id"
                              @click="getNewsList(group.id)"
                >
                  <i class="el-icon-news"></i>
                  <span slot="title">{{group.name}}</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
        <!--内容区域左结束-->
        <!--内容区域右开始-->
        <div class="main_you" id="main_you">
          <div class="main_mbx" id="main_mbx">
            您当前所在的位置：<a href="/">首页</a> ><router-link to="/news">新闻资讯</router-link>   > {{news.title}}
          </div>
          <div class="main_nrqy" id="main_nrqy">
            <div class="news_detail" id="news_detail">
              <div class="news_detail_title" id="news_detail_title">{{news.title}}</div>
              <div class="news_detail_time" id="news_detail_time">发布时间：{{news.create_time}}</div>
              <div class="news_detail_nr" id="news_detail_nr" v-html="news.text">
              </div>
            </div>
          </div>
        </div>
        <!--内容区域右结束-->
      </div>
    </div>
    <!--内容区域结束-->
  </div>
</template>

<script>
  import {findDetail, fetchGroupList} from '@/api/news';
  import {fetchBanner} from '@/api/banner';
  export default {
    name: "news-detail",
    data() {
      return {
        group_list: [],
        banner: [],
        news: {},
        id: 0,
      }
    },
    components: {},
    created() {
      const params = this.$route.query;
      if (!params.id) {
        this.$message.error('错误页面~');
        this.$router.push({path: '/'})
      }
      this.id = params.id;
      this.initBanner();
      this.getDetail();
      this.getGroup();
    },
    methods: {
      initBanner() {
        fetchBanner({type: 'news'}).then(response => {
          this.banner = response.data;
        })
      },
      getGroup() {
        fetchGroupList().then(response => {
          this.group_list = response.data;
        })
      },
      getDetail() {
        findDetail({id: this.id}).then(response => {
          this.news = response.data;
        })
      },
      getNewsList(gid){
        this.$router.push('/news?gid=' + gid);
      }
    }
  }
</script>

<style scoped>

</style>

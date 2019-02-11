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
          <div class="main_zuo_title"><img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/xinwen.jpeg"></div>
          <div class="main_zuo_lb">
            <div class="liebiao">
              <el-menu
                :default-active="gid"
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
            您当前所在的位置：<a href="/">首页</a> > 新闻资讯
          </div>
          <div class="main_nrqy" id="main_nrqy">
            <div class="news_list01">
              <div class="news_list">
                <div class="new_list" v-for="news in news_list" :key="news.id">
                  <div class="new_tu">
                    <router-link :to="'/news/detail?id='+news.id">
                      <img alt="钵鼎展览展示工程（上海）有限公司" :src="news.cover" class="img-fill">
                    </router-link>
                  </div>
                  <div class="new_info">
                    <div class="new_title">
                      <router-link :to="'/news/detail?id='+news.id">
                        {{news.title}}

                      </router-link>
                    </div>
                    <div class="new_time">
                      <span>发布时间：</span>{{news.create_time}}
                    </div>
                    <div class="new_sumary">
                      {{news.desc}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="fanye">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="listQuery.limit"
                  @current-change="handleCurrentChange"
                  :total="news_count" v-if="news_count > 0">
                </el-pagination>
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
  import {fetchList, fetchGroupList} from '@/api/news';
  import {fetchBanner} from '@/api/banner';

  export default {
    name: "news",
    data() {
      return {
        group_list: [],
        news_list: [],
        banner: [],
        gid: '0',
        news_count: 0,
        listQuery: {
          'limit': 10,
          'page': 1
        },
      }
    },
    created() {
      const params = this.$route.query;
      if (params.gid) {
        this.gid = params.gid;
      }
      this.initBanner();
      this.getNewsList(this.gid);
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
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getNewsList()
      },
      getNewsList(gid) {
        if (gid) {
          this.gid = gid;
          this.listQuery.page = 1;
        }
        fetchList({gid: this.gid, page: this.listQuery.page, limit: this.listQuery.limit}).then(response => {
          this.news_list = response.data.news_list;
          this.news_count = response.data.count;
          if(this.news_count <=0){
            this.$message({
              message: '当前分类下暂无资源哦',
              type: 'warning'
            });
          }
        })
      },
    }

  }
</script>

<style scoped>

</style>

<template>
  <div>
    <!--banner开始-->
    <div class="banner" style="max-height: 300px;padding-top: 80px">
      <img style="max-width:100%; max-height: 250px" alt="钵鼎展览展示工程（上海）有限公司" :src="banner.cover" class="img-fill">
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
                @close="handleClose"
                background-color="#e8e8e8"
                text-color="#494949"
                active-text-color="#ed3900">
                <el-menu-item :index="group.id" v-for="group in group_list" :key="group.id" @click="getGoodsList(group.id)">
                    <i class="el-icon-menu"></i>
                    <span >{{group.name}}</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
        <!--内容区域左结束-->
        <!--内容区域右开始-->
        <div class="main_you" id="main_you">
          <div class="main_mbx" id="main_mbx">
            您当前所在的位置：<a href="/">首页</a> > 案例展示
          </div>
          <div class="main_nrqy" id="main_nrqy">
            <div class="product" id="product">
              <div class="product_list">
                <div class="products" v-for="(goods,index) in goods_list" :key="index">
                  <div class="product_image">
                    <a :href="'#/business/detail?id='+goods.id">
                      <img :src="goods.cover" class="img-fill" style="height: 145px"></a>
                  </div>
                  <div class="product_title" id="product_title">
                    <a :href="'#/business/detail?id='+goods.id">{{goods.name}}</a>
                  </div>
                </div>
              </div>
              <div class="fanye" id="fanye">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="listQuery.limit"
                  @current-change="handleCurrentChange"
                  :total="goods_count" v-if="goods_count > 0">
                </el-pagination>
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
  import {fetchList, fetchCategoryList} from '@/api/business';
  import {fetchBanner} from '@/api/banner';

  export default {
    name: "business",
    data() {
      return {
        group_list: [],
        goods_list: [],
        banner: [],
        gid: 0,
        group_index: 0,
        goods_count: 0,
        listQuery: {
          'limit': 12,
          'page': 1
        },
      }
    },
    components: {},
    created() {
      const params = this.$route.query;
      if (params.gid) {
        this.gid = params.gid;
      }

      this.initBanner();
      this.getGoodsList(this.gid);
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
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getGoodsList()
      },
      getGoodsList(gid) {
        if (gid) {
          this.gid = gid;
          this.listQuery.page = 1;
        }
        fetchList({gid: this.gid, page: this.listQuery.page, limit: this.listQuery.limit}).then(response => {
          this.goods_list = response.data.goods_list;
          this.goods_count = response.data.count;
          this.group_index = response.data.group_index;
          if(this.goods_count <=0){
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

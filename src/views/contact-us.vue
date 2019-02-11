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
            <img alt="钵鼎展览展示工程（上海）有限公司" src="../assets/lianxiwomen.jpeg">
          </div>
          <div class="main_zuo_lb">
            <div class="liebiao">
              <el-menu
                :default-active="active_id"
                class="el-menu-vertical-demo"
                background-color="#e8e8e8"
                text-color="#494949"
                active-text-color="#ed3900">
                <el-menu-item index="1" @click="active_id = 1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">联系我们</span>
                </el-menu-item>
                <el-menu-item index="2" @click="active_id = 2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">在线留言</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
        <!--内容区域左结束-->
        <!--内容区域右开始-->
        <div class="main_you">
          <div class="main_mbx">
            您当前所在的位置：<a href="/">首页</a> >
            <router-link to="/contactUs">联系我们</router-link>
          </div>
          <div class="main_nrqy" v-show="active_id === 1">
            <div class="news_detail" v-html="text">
            </div>
          </div>
          <div class="main_nrqy" v-show="active_id ===2">
            <div class="message">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" style="max-width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="form.phone" style="max-width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" style="max-width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input type="textarea" v-model="form.text" style="max-width: 300px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容区域结束-->
  </div>
</template>

<script>
  import {init, contact} from '@/api/contact-us';
  import {fetchBanner} from '@/api/banner';

  export default {
    name: "contact-us",
    data() {
      return {
        banner: [],
        active_id: 1,
        text: '',
        form: this.initForm()
      }
    },
    created() {
      const params = this.$route.query;
      if (params.active_id) {
        this.active_id = parseInt(params.active_id);
      }
      this.initBanner();
      this.initContactUs();
    },
    methods: {
      initBanner() {
        fetchBanner({type: 'contact'}).then(response => {
          this.banner = response.data;
        })
      },
      onSubmit() {
        contact(this.form).then(response => {
          this.$notify({
            title: '成功',
            message: '添加留言成功',
            type: 'success'
          });
          this.form = this.initForm();
        })
      },
      initContactUs() {
        init().then(response => {
          this.text = response.data;
        })
      },
      initForm() {
        return {
          name: '',
          email: '',
          phone: '',
          text: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="footer" id="footer">
    <div class="footer_nr" id="footer_nr">
      <div class="footer_top" id="footer_top">
        <div class="foot_top_zuo" id="foot_top_zuo">
          <div class="foot_xdh" v-for="nav in list" :key="nav.id">
            <div class="foot_xdh_title">{{nav.title}}</div>
            <div class="foot_xdh_x"><img alt="钵鼎展览展示工程（上海）有限公司" src="../../assets/index_xdhx.png"></div>
            <div class="foot_xdh_nr">
              <span v-for="child in nav.childs" :key="child.id" @click="toLink(child.url)">
                <a href="javascript:;">{{child.title}}</a>
              <br/>
              </span>

            </div>
          </div>

        </div>
        <div class="foot_top_you" id="foot_top_you">
          <div class="foot_top_ewm" id="foot_top_ewm"><img alt="钵鼎展览展示工程（上海）有限公司" src="../../assets/index_ewm.jpg">
          </div>
          <div class="foot_top_wz" id="foot_top_wz">关注我们</div>
        </div>
      </div>
      <div class="footer_bottom" id="footer_bottom">
        <div class="foot_bottom_zuo" id="foot_bottom_zuo">Copyright © 钵鼎展览展示工程（上海）有限公司 版权所有 沪ICP备00000000号</div>
        <div class="foot_bottom_you" id="foot_bottom_you">技术支持：上海百聪</div>
      </div>
    </div>
  </div>
</template>
<style>
  .foot-menu {
    max-width: 1400px;
    margin: 0 auto;
    color: #fff;
    width: 100%;
    background-color: rgba(136, 136, 136, 0.48);
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
</style>
<script>
  import {fetchList} from '../../api/nav'

  export default {
    name: "footMenu",
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
    methods: {
      toLink(url) {
        if (url.indexOf('http') !== -1) {
          window.location.href = url;
        } else {
          this.$router.push(url);
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

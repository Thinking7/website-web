<template>
  <div class="scroll">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(img,index) in list" :key="index" >
        <a class="fd_slide" :href="img.url">
          <img :src="img.cover" style="max-width:100%; display:inline-block;height:100%;"></a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination " slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {fetchBanner} from '../../api/banner'

  export default {
    name: "banner",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        list: null,
        swiperOption: {
          effect: 'coverflow',

          notNextTick: true,
          //循环
          // loop: true,
          //设定初始化时slide的索引
          initialSlide: 0,
          //自动播放
          // autoplay: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          //滑动速度
          speed: 3000,
          //左右点击
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //分页器设置
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
      fetchBanner({type: "index"}).then(response => {
        this.list = response.data;
      })
    },
    mounted: {
      getList() {
        fetchBanner({type: "index"}).then(response => {
          this.list = response.data;
        })
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .swiper-slide {
    height: 650px;
    width: 1920px;
  }
</style>

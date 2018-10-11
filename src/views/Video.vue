<template>
  <div class="video" @scroll.native="scrollHandler">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in horizontalScrollCard" :key="index" class="swiperSlide">
                <img :src="item.data.image" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <h2 class="categoryH">热门分类</h2>
        <ul class="category">
            <li v-for="(categoryItem, index) in category" :key="index">
              <span># {{categoryItem.data.header.title}}</span> 
              <p>{{categoryItem.data.header.subTitle}}</p>
            </li>
        </ul>
          <div class="videoContainer" v-for="(video,index) in allvideo" :key="index" @click="showVideo(index)">
              <div class="videoBox" v-if="curIndex==index">
                 <video :src="video.data.playUrl" :poster="video.data.cover.detail" controls="controls" preload='none' ></video>
              </div>     
              <div class="videoImgBox" v-else>
                    <i class="iconfont icon-bofang"></i>
                    <img :src="video.data.cover.detail" alt="">
              </div>          
              <div class="title">
                  <span v-html="video.data.title"></span>
              </div>
          </div>
          <div class="tip" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
              加载中
            <!-- loading -->
            <div class="loading">
                <div class="ball-pulse" >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
          </div>

  </div>
</template>

<script>
import Title from '../components/Title'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return {
        addDate: 1,
        allvideo: [],
        alltextHeader:[],
        videoCollectionWithCover:[],
        videoCollectionOfFollow:[],
        busy: false,
        todayDate:0,
        curIndex:-1,
        horizontalScrollCard:[],
        category:[],
        swiperOption: {
          direction : 'horizontal',
          slidesPerView : 1.07,
          spaceBetween : 10,
        }
    }
  },
   components:{
     Title,
     swiper,
     swiperSlide
   },
   computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
   methods:{
       showVideo: function(index){
           this.curIndex = index
       },
       //上滑加载
       loadMore: function() {
            this.busy = true;
            setTimeout(() => {
                this.addDate++;
                this.getVideo()
                this.busy = false;
                }, 1000);
        },
        getVideo(){
            let curDate  = new Date()
            let preDate  = new Date(curDate.getTime() - 24*60*60*1000*(this.addDate)).getTime();
            this.$axios({
                method: "GET",
                url: "/videoapi/api/v4/tabs/selected?date="+preDate+"&num=2&page=2"
            }).then((res=>{
                let video = res.data.itemList.filter(function(element){
                    return element.type == "video"
                })
                for(let i=0;i<video.length;i++){
                    this.allvideo.push(video[i])
                }
            }))
        },
        //初始化数据
        getInitData(){
            //轮播图数据
            this.$axios({
                methods:"GET",
                url:"/videoapi/api/v4/discovery/hot"
            })
            .then((res)=>{
                let filterIteam = res.data.itemList.filter(function(element){
                    return element.type == "horizontalScrollCard"
                })
                this.horizontalScrollCard = filterIteam[0].data.itemList
            })    
            this.$axios({
                methods: "GET",
                url:"/videoapi/api/v4/discovery/category"
            })  
            .then((res)=>{
                this.category = res.data.itemList
            })
            //视频数据      
            this.$axios({
                method:"get",
                url:"/videoapi/api/v4/tabs/selected?date="+this.todayDate+"&num=2&page=1"
            }).then((res)=>{
                // console.log(res.data)
                this.allvideo = res.data.itemList.filter(function(element){
                    return element.type == "video"
                })
                this.alltextHeader =  res.data.itemList.filter(function(element){
                    return element.type=='textHeader'
                })
                this.videoCollectionWithCover =  res.data.itemList.filter(function(element){
                    return element.type=='videoCollectionWithCover'
                })
                this.videoCollectionOfFollow =  res.data.itemList.filter(function(element){
                    return element.type=='videoCollectionOfFollow'
                })
            })

        }
    },
    created(){
        this.getInitData()
        let date = new Date()
        let todayDate = date.getTime()
        this.todayDate = todayDate
    },
}
</script>

<style scoped>
.video{
    margin-bottom: 90px;
    padding-left: 10px;
    padding-right: 10px;
}
.videoContainer{
  padding:10px 2px 2px 2px;
  border: 1px solid #eee;
  padding-top: 20px;
  position: relative;
  width: 100%;
}
.videoContainer img{
  width: 100%;
  height: 188px;
}
.videoContainer video{
    width: 100%;
    height: 188px
}
.title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.videoBox {
    width: 100%;
    height: 186px;
}
.videoImgBox img{
    border-radius: 10px;
}
.video-img-Box video{
    width: 100%;
    height: 188px
}
.videoImgBox{
    width: 100%;
    height: 186px;    
}
.icon-bofang{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 30px;
    font-weight: 100
}
/*loading*/
.tip{
    text-align: center
}
.ball-pulse {
  transform: scale(1);
  /* margin: 0 auto;
  width: 65px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%) */
}

.ball-pulse > div:nth-child(1) {
  -webkit-animation: ball-pulse-scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: ball-pulse-scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.ball-pulse > div:nth-child(2) {
  -webkit-animation: ball-pulse-scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: ball-pulse-scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.ball-pulse > div:nth-child(3) {
  -webkit-animation: ball-pulse-scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: ball-pulse-scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.ball-pulse > div {
  background-color: #B1AFAE;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}

@keyframes ball-pulse-scale {
  0% {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
.swiperSlide img{
    width: 100%;
}
.categoryH{
    font-size: 21px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
}
.category li{
    width: 100%;
    height: 50px;
    border-bottom: .5px solid #eee;
    margin-bottom: 10px
}
.category li span{
    color: #333;
    font-size: 16px;
    font-weight: bold
}
.category li p{
    color: rgb(188, 179, 179);
    font-size: 12px;
}
</style>



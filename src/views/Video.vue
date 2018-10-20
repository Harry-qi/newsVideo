<template>
  <div class="video" @scroll.native="scrollHandler">
        <!-- 轮播图 -->
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in horizontalScrollCard" :key="index" class="swiperSlide">
                <img :src="item.data.image" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- 热门分类 -->
        <h2 class="categoryH">热门分类</h2>
        <ul class="category">
            <li v-for="(categoryItem, index) in category" :key="index">
                <router-link :to="{name:'categoryIndex',params:{id:categoryItem.id}}">
                    <div class="category-img-container">
                        <img :src="categoryItem.bgPicture" alt="">
                    </div>
                    <div class="category-info-container">
                        <span># {{categoryItem.name}}</span> 
                        <p>{{categoryItem.description}}</p>
                    </div>
                </router-link>

            </li>
        </ul>
        <div class="category-more-link-box">
            <router-link to="AllCategory" class="category-more-link">
                <span>查看全部分类</span>
                <span>&gt;</span>
            </router-link>
        </div>

        <!-- 视频 -->
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
        categoryId:0,
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
        //Fisher–Yates shuffle 洗牌算法
        shuffle(arrs) {
            for (let i = arrs.length - 1; i > 0; i -= 1) {
                const random = Math.floor(Math.random() * (i + 1));
                [arrs[random], arrs[i]] = [arrs[i], arrs[random]];
            }
            return arrs
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
            //分类    
            this.$axios({
                methods: "GET",
                url:"/videoapi/api/v4/categories/"
            })  
            .then((res)=>{
                //随机选取三个分类
                console.log(res.data)
                this.shuffle(res.data)
                let sliceCategory = res.data.slice(1,4)
                this.category = sliceCategory
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
    margin: 10px 0 90px 10px;
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
.category li a{
    width: 100%;
    height: 75px;
    border-bottom: .5px solid #eee;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.category-img-container{
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.category-img-container img{
    width: 100%;
    border-radius: 5px;
}
.category li span{
    color: #333;
    font-size: 16px;
    font-weight: bold;
    height: 25px;
    display: block;
}
.category li p{
    color: rgb(188, 179, 179);
    font-size: 12px;
}
.category-more-link-box{
    width: 100%;
    height: 30px;
    text-align: right;
    margin: 20px 0;
}
.category-more-link{
    color: #333;
    font-weight: bold;
    font-size: 16px;
}
.category-more-link span:first-child{
    margin-right: 10px;
}
.category-more-link span:last-child{
    color: #eee
}
</style>



<template>
  <div class="video" @scroll.native="scrollHandler">
          <div class="videoBox" v-for="video in allvideo" :key>
              <div class="video-img-Box" >
                 <video :src="video.data.playUrl"  controls="controls" preload='none' ></video>
                 <!-- <i class="iconfont icon-bofang" v-show="show"></i> -->
              </div>               
              <div class="title">
                  <span v-html="video.data.title"></span>
              </div>
          </div>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            上划显示更多
          </div>
  </div>
</template>

<script>
import Title from '../components/Title'
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
    }
  },
   components:{
     Title
   },
   methods:{
       loadMore: function() {
           var count = 0;
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
                console.log(this.allvideo)
            }))
        },
        getInitData(){
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
    }
}
</script>

<style>
.video{
    margin-bottom: 90px;
}
.videoBox{
  padding:10px 2px 2px 2px;
  border: 1px solid #eee;
  padding-top: 20px
}
.videoBox img{
  width: 100%;
  height: 188px;
}
.title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.video-img-Box {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
}
.video-img-Box img{
    border-radius: 10px;
}
.video-img-Box video{
    width: 100%;
    height: 188px
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
</style>



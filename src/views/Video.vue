<template>
  <div class="video">
          <div class="videoBox" v-for="video in allvideo" >
              <div class="video-img-Box" >
                 <video :src="video.data.playUrl" controls="controls" preload='none' :poster='video.data.cover.detail'></video>
                 <!-- <i class="iconfont icon-bofang" v-show="show"></i> -->
              </div>               
              <div class="title">
                  <span v-html="video.data.title"></span>
              </div>
              <!-- <video :src=".playUrl" style="width:100%;height:200px"></video> -->
          </div>
  </div>
</template>

<script>
import Title from '../components/Title'
export default {
  data(){
    return {
        allvideo:[],
        // show:true
    }
  },
   components:{
     Title
   },
   methods:{
    //    seevideo: function(){
    //        this.show = !this.show

    //    }
    },
    created(){
        this.$axios({
            method:"get",
            url:"/videoapi/api/v4/tabs/selected"
        }).then((res)=>{
            console.log(res.data.itemList)
            this.allvideo = res.data.itemList
            // 返回数据部分有问题
            this.allvideo.splice(0,1)
            this.allvideo.splice(5,1)
            this.allvideo.splice(5,1)
            this.allvideo.splice(5,1)
            this.allvideo.splice(5,1)
            this.allvideo.splice(10,1)

        })
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



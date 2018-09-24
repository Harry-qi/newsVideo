<template>
    <div class="productCase">        
        <div class="search">
          <i class="iconfont icon-sousuo"></i>
          <span>搜索精彩短片</span>
        </div>
        <div class="videoItem">
            <div class="videoBox">
                <img src="../assets/vedio.jpg" alt="">
                <i class="iconfont icon-bofang"></i>
                <span class="time">{{time}}</span>
            </div>
            <Title></Title>
        </div>
        <div class="videoItem">
            <div class="videoBox">
                <img src="../assets/vedio.jpg" alt="">
                <i class="iconfont icon-bofang"></i>
                <span class="time">{{time}}</span>
            </div>
            <Title></Title>
        </div>
    </div>
</template>

<script>
import Title from '../components/Title.vue';
export default {
    name:"ProductCase",
    data(){
        return {
            time:2
        }
    },
    components:{
      Title
    }
}
</script>
<style>
.productCase{
    width: 98%;
    margin: 0 auto;
    padding-top: 20px
}
.search{
  width: 90%;
  height: 40px;
  background: #f4f4f4;
  border-radius: 5px;
  display:flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  margin-bottom: 15px;
}
.search span{
 color: #999;
 font-size: 18px;
}
.videoItem{
  box-shadow: 0px 0px 6px 4px #f6f6f6;
  margin-bottom: 30px;
}
.videoBox{
  position: relative;
  width: 100%;
  height: 188px;
  padding: 2px;
}
.videoBox img{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.icon-bofang{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 50px;
  color: #e9e1e1
}
.time{
  padding: 0 6px;
  line-height: 18px;
  background: rgba(255, 255, 255, .2);
  color: #fff;
  position:absolute;
  right: 10px;
  bottom: 10px;
}
.icon-sousuo{
  font-size: 21px;
  padding-left: 10px;
  padding-right: 5px;
  color: #999
}
.headline{
  text-align: center;
  font-size: 21px;
  line-height: 50px;
}
</style>



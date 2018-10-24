<template>
    <div class="everyday">
        <div class="loading" v-show="loading">
            <!-- loading图 -->
            <div class="roataqx-loader">
                <div class="one"></div>
                <div class="two"></div>
                <div class="three"></div>
            </div>
        </div>
        <div class="imgBox" v-show="!loading">
            <img :src="redomImgSrc" alt="" id="img">
            <span>随机图片</span>
        </div>
        <h1>{{title}}</h1>
        <span class="author">{{author}}</span>
        <p class="digest">{{digest}}</p>
            <router-link :to="{name:'articledetail',params:{date:fullDate}}">   
                <span class="more">more...</span>
            </router-link>
        <router-link :to="{name:'articledetail',params:{date:prefulldate}}">
            <span class="pre">昨日佳文</span>
        </router-link>
    </div>
</template>
<script>
import redomImg from "../../public/redomImg"
export default {
    name:'everyday',
    data(){
        return {
            title:'', //标题 
            author:'',//作者
            digest:'',//摘要
            // content:"",
            redomImgSrc:"",
            loading: true,
            fullDate:'', //日期
            prefulldate:''
        }
    },
    beforecreate(){
        this.loading = true
    },
    mounted(){
        // 生成随机图片
        let redomNum = Math.floor(Math.random()*20)
        let newImg = new Image()
        newImg.src = redomImg.links[redomNum].url
        // 图片加载完成后 结束loading
        newImg.onload=()=>{
            this.loading = false
            this.redomImgSrc = newImg.src
        }
        //获得今天的日期
        let date = new Date()
        let year = date.getFullYear() +''
        let mouth = date.getMonth()<10? "0"+date.getMonth():date.getMonth() +''
        let day = date.getDate()<10? "0"+date.getDate() :date.getDate() + ''
        let fullDate = year+mouth+day
        this.fullDate = fullDate

        //前一天的时期
        let preday = date.getDate()-1
        let predaytrans = preday<10? "0"+preday :preday + ''
        let prefulldate = year+mouth+predaytrans
        this.prefulldate = prefulldate
        // 获取每日一文
        this.$axios({
            method:"get",
            url:"/readapi/article/day?dev=1&date="+this.fullDate
        }).then((res)=>{
            // console.log(res.data.data)
            this.title = res.data.data.title
            this.author = res.data.data.author
            this.digest = res.data.data.digest
            // this.content = res.data.data.content
        })
          

    }
}
</script>

<style scoped>
.everyday{
    padding-top: 20px;
}
.imgBox{
    width: 100%;
    padding: 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-sizing: border-box;
    text-align: center
}
.imgBox span{
    margin-top: 10px;
    color: #444;
    font-size: 16px;
}
.everyday img{
    width: 100%;
}
.loading{
    width: 64px;
    height: 264px;
    margin:0 auto;
    position: relative;
}
.everyday h1 {
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    line-height: 35px;
    margin:10px 0
}
.author{
    display: block;
    text-align: right;
    margin-right: 15px;
}
.digest{
    line-height: 40px;
    font-size: 16px;
    padding: 10px;
    color: #3d464d;
    text-indent: 2rem;
    /* 多行文本溢出显示省略号 */
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.digest:after{
    content: "...";
    position: relative;
    right: 0px;
    bottom: 0px;
    font-weight: bolder
}
.more{
    display: block;
    text-align: right;
    padding-right: 20px;
    color: #333
}
.pre{
    display: block;
    text-align: center;
    width: 100px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #1a1a1a;
    border-radius: 25px;
    margin: 20px auto 70px;
    color: #1a1a1a;
    font-size: 14px;
}
/* loading图*/

.roataqx-loader {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
  position: absolute;
  top: 50%;
  margin-top: -32px;
}

.roataqx-loader > div {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;  
}

.roataqx-loader .one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #000;
}

.roataqx-loader .two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #000;
}

.roataqx-loader .three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #000;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
  
</style>



<template>
    <div class="everyday">
        <div class="loading" v-show="loading">加载中...</div>
        <div class="imgBox" v-show="!loading">
            <img :src="redomImg" alt="" id="img">
            <span>随机图片</span>
        </div>
        <h1>{{title}}</h1>
        <span class="author">{{author}}</span>
        <p class="digest">{{digest}}</p>
        <router-link :to='"/articledetail/"+fullDate'>
            <span class="more" :fulldate="fullDate">more...</span>
        </router-link>
        <router-link :to='"/articledetail/"+prefulldate'>
            <span class="pre" :fulldate='prefulldate'>昨天文章</span>
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
            redomImg:"",
            loading: true,
            fullDate:'', //日期
            prefulldate:''
        }
    },
    beforecreate(){
        this.loading = true
    },
    created(){
        // 生成随机图片
        this.loading = false
        let redomNum = Math.floor(Math.random()*20)
        this.redomImg = redomImg.links[redomNum].url

        // 获取每日一文
        this.$axios({
            method:"get",
            baseURL:"/api",
            url:"https://interface.meiriyiwen.com/article/today?dev=1"
        }).then((res)=>{
            // console.log(res.data.data)
            this.title = res.data.data.title
            this.author = res.data.data.author
            this.digest = res.data.data.digest
            // this.content = res.data.data.content
        })
          
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
    }
}
</script>

<style>
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
    color: #444
}
.everyday img{
    width: 100%;
}
.loading{
    font-size: 16px;
    color: #333;
    text-align: center
}
.everyday h1 {
    font-size: 16px;
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
    color: #175199
}
.pre{
    display: block;
    text-align: center;
    width: 100px;
    height: 20px;
    border: 1px solid #eee;
    border-radius: 25px;
    margin: 20px auto 100px;
}
</style>



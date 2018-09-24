<template>
    <div class="my">
        <div class="loading" v-show="loading">加载中...</div>
        <div class="imgBox" v-show="!loading">
            <img :src="redomImg" alt="" id="img">
            <span>随机图片</span>
        </div>
        <h1>文章title</h1>
        <span>作者</span>
        <p>文章简介</p>
    </div>
</template>
<script>
import redomImg from "../../public/redomImg"
export default {
    name:'my',
    data(){
        return {
            headline:'',
            author:'',
            digest:'',
            redomImg:"",
            loading: true
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
        // console.log(redomImg)

        // 获取每日一文
        // fetch("https://www.easy-mock.com/mock/5ba886d083dbde41b0055cb8/demoVueData/")
        //   .then((res) =>{
        //       return res.json()
        //   })
        //   .then((res)=>{
        //       console.log(res)
        //   })
        this.axios.get('https://www.easy-mock.com/mock/5ba886d083dbde41b0055cb8/demoVueData/mock')
          .then((res)=>{
           console.log(res+"")
         })
          
    }
}
</script>

<style>
.my{
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
.my img{
    width: 100%;
}
.loading{
    font-size: 16px;
    color: #333;
    text-align: center
}
</style>



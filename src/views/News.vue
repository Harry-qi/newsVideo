<template>
    <div class="news">
        <div class="newsBox" v-for="(newsItem,index) in news" :key="index">
            <router-link :to="{name:'newsdetail',params:{id:newsItem.id}}">
                <h2>{{newsItem.title}}</h2>
                <img :src="imgSrc" alt="">
            </router-link>
            <!-- <img :src="newsItem.images" alt=""> -->
        </div>
    </div>
</template>

<script scoped>
import Title from "../components/Title"
export default {
    data(){
        return{
            news:[],
            imgSrc:''
        }
    },
    components:{
        Title
    },
    mounted(){
        this.$axios({
            method:'get',
            url:'/newsapi/api/v1/last-stories'
        })
        .then((res)=>{
            // console.log(res.data.STORIES.stories)
            this.news = res.data.STORIES.stories
        })
        this.imgSrc = 'https://placeimg.com/350/200/any'
    }
}
</script>


<style>
.news{
    overflow: hidden;
    margin-bottom: 90px;
    padding-top: 10px;
}
.newsBox{
    margin: 0px 10px 10px;
}
.newsBox h2{
    width: 100%;
    line-height: 25px;
    margin-bottom: 5px;
}
.newsBox a{
    color: #333
}
.newsBox img{
    display: block;
    margin: 0 auto
}
</style>


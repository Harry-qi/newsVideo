<template>
    <div class="categoryAuthor">
        <div class="authorContainer" v-for="(item,index) in authorData" :key="index">
            <div class="authorInfo">
                <img :src="item.data.header.icon" alt="">
                <div class="authorIntro">
                    <span>{{item.data.header.title}}</span>
                    <p>{{item.data.header.description}}</p>
                </div>
            </div>
            <div>
                <swiper :options="swiperOption" ref="mySwiper" class="swiper">
                    <swiper-slide v-for="(item,index) in item.data.itemList" :key="index" class="swiperSide">
                        <router-link :to="{name:'videoDetail',params:{id:item.data.id}}">
                            <img :src="item.data.cover.detail" alt="">
                            <div class="video-info">
                                <div>
                                    <h4>{{item.data.title}}</h4>
                                    <p>
                                        <span>#{{item.data.category}}</span>
                                    </p>
                                </div>
                            </div>
                        </router-link>
                    </swiper-slide>
                </swiper>                
            </div>
        </div>  
        <div class="theEnd">
        -The End-
        </div>   
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name:"categoryAuthor",
    data(){
        return{
            authorData:[],
            swiperOption: {
                direction : 'horizontal',
                slidesPerView : 1.08,
                spaceBetween : 10,
            },
        }
    },
    mounted(){
        this.$axios({
            methods:'get',
            url:'/videoapi/api/v4/categories/detail/pgcs?id=36'
        })
        .then((res)=>{
            this.authorData = res.data.itemList
            console.log(this.authorData)
        })
    }
}
</script>
<style scoped lang=scss>
.categoryAuthor{
    margin-bottom: 100px;
}
.authorContainer{
    padding: 10px;
}
.authorInfo{
    display:flex;
    flex-direction:row; 
    font-size: 14px;
    img{
        width:50px;
        height:50px;
        border-radius: 25px;
    }
    .authorIntro{
        display:flex;
        flex-direction:column;
        padding-left: 10px;
        line-height: 25px;
        span{
            font-weight: bolder;
            color: #333;
        }
        p{
            width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #c3c0c0
        }
    }
}
.swiperSide{
    width: 100%;
    height: 245px;
    margin: 10px 0px;
    img{
        width: 100%;
        height: 186px;
        position: relative;
        left: 0;
        top: 0;
        border-radius: 5px;
    }
}
.video-info {
    h4{
        width: 270px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
        font-size: 14px;
        color: #333;
        font-weight: bolder
    }
    p{
        font-size: 12px;
        color: #c3c0c0
    }
}
.theEnd{
    text-align: center;
    line-height: 30px;
    margin-top: 40px;
    font-family: 'Raleway', sans-serif;
    color: #333;
    font-size: 21px;
    font-weight: bold;
}
</style>



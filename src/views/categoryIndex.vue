<template>
    <div class="categoryIndex">
        <div class="error" v-show="error">接口报错</div>
        <div class="recently" v-show="!error">
            <h3>{{recently}}</h3>
            <swiper :options="swiperOption" ref="mySwiper" class="swiper">
                <swiper-slide v-for="(item,index) in recentlyVideo" :key="index" class="video-box">
                    <img :src="item.data.cover.detail" alt="" v-if="show">
                    <div class="recently-info">
                        <div>
                            <img :src="item.data.author.icon" alt="">
                        </div>
                        <div>
                            <h4>{{item.data.author.description}}</h4>
                            <p>
                                <span>{{item.data.author.name}} &nbsp;&nbsp;/&nbsp;&nbsp; </span>
                                <span>#{{item.data.category}}</span>
                            </p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>    
        <div class="popular" v-show="!error">
            <h3>{{popular}}</h3>
            <div class="popularBox" v-for="(item,index) in popularVideo" :key='index'>
                <div class="popular-imgbox" >
                    <img :src="item.data.cover.detail">
                </div>
                <div class="popular-info">
                    <div>
                        <img :src="item.data.author.icon" alt="">
                    </div>
                    <div>
                        <h4>{{item.data.author.description}}</h4>
                        <p>
                            <span>{{item.data.author.name}} &nbsp;&nbsp;/&nbsp;&nbsp; </span>
                            <span>#{{item.data.category}}</span>
                        </p>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name:"categoryIndex",
    data(){
        return{
            recently:'',
            popular:'',
            show:true,
            recentlyVideo:[],
            popularVideo:[],
            swiperOption: {
                direction : 'horizontal',
                slidesPerView : 1.08,
                spaceBetween : 10,
            },
            error:false
        }
    },
    created(){
        this.$axios({
            methods:'get',
            url:'/videoapi/api/v4/categories/detail/index?id=8'
        })
        .then((res)=>{
            let resData = res.data.itemList[0].data
            this.recently = resData.header.title
            this.recentlyVideo = resData.itemList
            this.popular = resData.text
            let popularVideo = res.data.itemList.filter(function(element){
                return element.type=="video"
            })
            this.popularVideo = popularVideo
            let someError = popularVideo.some=(item,index,arr)=>{
                return item.data.author.icon===null
            }
            if(someError){
               this.error = true 
               console.log(11111) 
            }else{
                console.log("else")
            }
        })
        .catch((error)=>{
           this.error = true  
           console.log(error)  
        });
    }
}
</script>
<style scoped lang="scss" type="text/css">
.recently {
    width: 100%;
    padding-left: 10px;
    h3{
        font-size: 21px;
        color: #333;
        font-weight: bold;
        position: relative;
        width: 110px;
        height: 20px;
        line-height: 20px;
        &:after{
            content: '>';
            color:#c9c4c4;
            font-size: 16px;
            position: absolute;
            right: 0%;
            top: 0;
        }
    }
}
.video-box{
    width: 100%;
    height: 245px;
    margin: 10px 0px;
    img{
        width: 100%;
        height: 186px;
        position: relative;
        left: 0;
        top: 0;
    }

}
.recently-info,.popular-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    div:first-child{
        width: 40px;
        height: 40px;
        img{
            width: 100%;
            height: auto;
            border-radius: 25px;
        }
    }
    div:last-child{
        width: 285px;
        margin-left: 10px;
        h4{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            line-height: 18px;
            font-size: 16px;
            font-weight: bold;
        }
        p{
            color: #989898;
            font-size: 14px;
        }

    }
}
.popular{
  padding:10px;
}
.popularBox{
  position: relative;
  width: 100%;
  padding:0 10px 0;
  margin-top: 10px;
    .popular-imgbox{
        width: 100%;
        img{
            width: 100%;
            height: 188px;
        }
    }
    .popular-info{
        height: 50px;
    }
}
.error{
    text-align: center;
    font-size: 14px;
}
</style>



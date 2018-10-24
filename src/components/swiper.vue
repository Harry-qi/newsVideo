<template>
    <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
            <swiper-slide v-for="(item,index) in swiperVideo" :key="index" class="video-box">
                <img :src="item.data.cover.detail" alt="">
            </swiper-slide>
        </swiper>        
    </div>
</template>
<script>
export default {
    name:"swiper",
    props:{
        swiperdata: Array
    },
    data(){
       return  {
          swiperVideo:this.swiperdata,
          swiperOption: {
                direction : 'horizontal',
                slidesPerView : 1.08,
                spaceBetween : 10,
          },
       }
    },
    created(){
        console.log(this.swiperVideo)
    }
}
</script>
<style scoped lang="scss">
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
</style>



<template>
    <div class="AllCategory">
        <!-- <div class="imgBox" v-for="(item,index) in AllCategory" :key="index" :style="{background:'url('+item.bgPicture+')'}">
           <span>{{item.name}}</span>
        </div> -->
        <div class="title">
           <span @click="goback">&lt;</span><h1>全部分类</h1>
        </div>

        <div class="clearfix">
            <div class="imgBox" v-for="(item,index) in AllCategory" :key="index">
                <router-link :to="{name:'categoryIndex',params:{id:item.id}}">
                    <img :src="item.bgPicture" alt="">
                    <span>#{{item.name}}</span>
                </router-link>
            </div>
        </div>
        <div class="theEnd">
            -The End-
        </div>
    </div>
</template>
<script>
export default {
    name:"AllCategory",
    data(){
        return{
            AllCategory:[]
        }
    },
    methods:{
        goback(){
            this.$router.back(-1)
        }
    },
    mounted(){
        this.$axios({
            methods: "GET",
            url:"/videoapi/api/v4/categories/"
        }).then((res)=>{
            this.AllCategory = res.data
            console.log(res.data)
        })
    }
}
</script>
<style scoped lang="scss">
.AllCategory {
    margin-bottom: 100px;
    width: 100%;
    .title{
        position: relative;
        height: 40px;
        span{
            font-size: 21px;
            font-weight: bold;
            height: 40px;
            line-height: 40px;
            margin-left: 10px;          
        }
        h1{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            font-size: 21px;
            font-weight: bold;
            height: 40px;
            line-height: 40px;
            display: inline-block;
        }
    }

    .imgBox{
        width: 49.8%;
        height: 150px;
        margin-top: 3px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
            border-radius: 5px;
        }
        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 18px;
            color: #fff;
            font-weight: bold;
        }
    }
    .imgBox:nth-child(odd){
        float: left;
    }
    .imgBox:nth-child(even){
        float: right;
    }
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
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



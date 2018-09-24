<template>
    <div class="title">
        <h2 v-for="item in title ">{{item}}</h2>
        <span class="type">宣传片 |</span>
        <span class="num"> {{num}}次播放</span>
        <i class="iconfont icon-fenxiang"></i>
    </div>
</template>
<script>
export default {
    props:{
        titleName:Array
    },
    data(){
       return  {
            num:12,
            title:this.titleName
       }
    }
}
</script>
<style scoped>
.title{
    width: 98%;
    margin: 0 auto;
    height: 80px;
}
.title h2{
    font-size:21px;
    line-height: 30px;
    height: 30px;
    padding: 10px 0;
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.title span{
    color: #999;
    font-size: 16px;
}
.icon-fenxiang{
    float: right;
    margin-right: 10px;
    font-weight: bolder;
}
</style>



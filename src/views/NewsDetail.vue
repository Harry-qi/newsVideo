<template>
    <div class="newsdetail" >
        <div class="detail" v-html="articleDetail"></div>

    </div>
</template>

<script>
export default {
    name:"newsdetail",
    data(){
        return{
            articleDetail:null
        }
    },
    created(){
        this.$axios({
            method:"get",
            url:"https://zhihu-daily.leanapp.cn/api/v1/contents/"+this.$route.params.id
        })
        .then((res)=>{
            // console.log(res.data.CONTENTS.body)
            this.articleDetail = res.data.CONTENTS.body
        })
        // console.log(document.querySelectorAll('.question img')) 
    }
}
</script>

<style scoped>
.newsdetail h1{
    font-size: 21px;
    text-align: center;
    line-height: 30px;
    margin: 10px 0 0;
}
.newsdetail span{
    display: block;
    text-align: right;
    margin-right: 20px;
    margin-bottom: 10px;
}
.detail {
    text-indent: 2rem;
    line-height: 30px;
    margin-bottom: 100px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>



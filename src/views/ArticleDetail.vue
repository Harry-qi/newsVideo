<template>
    <div class="articledetail" >
        <div>{{fulldateson}}</div>
        <h1>{{title}}</h1>
        <span>{{author}}</span>
        <div class="detail" v-html="articleDetail"></div>

        <!-- <div>{{$route.params.date}}</div> -->
    </div>
</template>

<script>
export default {
    name:"articledetail",
    props:{
      fulldate: String  
    },
    data(){
        return{
            title:'',
            author:'',
            articleDetail:null,
            fulldateson:this.fulldate
        }
    },
    mounted(){
        this.$axios({
            method:"get",
            baseURL:"/api",
            url:"https://interface.meiriyiwen.com/article/day?dev=1&date="+this.$route.params.date
        })
        .then((res)=>{
            this.title = res.data.data.title
            this.author = res.data.data.author
            this.articleDetail = res.data.data.content
            // console.log(res.data.data) 
            
        })
        // console.log(this.$route)
        console.log(this.fulldateson)
        
    }
}
</script>

<style>
.articledetail h1{
    font-size: 21px;
    text-align: center;
    line-height: 30px;
    margin: 10px 0 0;
}
.articledetail span{
    display: block;
    text-align: right;
    margin-right: 20px;
    margin-bottom: 10px;
}
.detail {
    text-indent: 2rem;
    line-height: 30px;
    margin-bottom: 100px;
}
</style>



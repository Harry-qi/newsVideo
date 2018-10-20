<template>
    <div class="categoryDetail">
       <div class="category-header">
           <img :src="headerImage" alt="">
           <div class="category-info-container">
              <h1>{{name}}</h1>
              <p>{{description}}</p>
           </div>
       </div>
       <nav class="category-nav">
           <ul>
               <li>
                    <router-link :to="{name:'categoryIndex'}" class="navLink">首页</router-link>
               </li>   
               <li>
                    <router-link :to="{name:'categoryAll'}" class="navLink">全部</router-link>               
               </li> 
               <li>
                    <router-link :to="{name:'categoryAuthor'}" class="navLink">作者</router-link>              
               </li>  
               <li>
                    <router-link :to="{name:'categoryAlbum'}" class="navLink">专辑</router-link>              
               </li>                                     
           </ul>
       </nav>
       <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'categoryDetail',
    data(){
        return{
            tabInfo:[],
            headerImage:'',
            description:'',
            name:'',
            curIndex: 0
        }
    },
    methods:{
    },
    mounted(){
        this.$axios({
            methods: 'GET',
            url: '/videoapi/api/v4/categories/detail/tab?id='+this.$route.params.id
        })
        .then((res)=>{
            console.log(res.data)
            this.headerImage = res.data.categoryInfo.headerImage
            this.tabInfo = res.data.tabInfo
            this.description = res.data.categoryInfo.description
            this.name = res.data.categoryInfo.name
        })
    }
}
</script>
<style scoped>
.category-header{
    position: relative;
    width: 100%;
    height: 240px;
}
.category-header img{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -111;
}
.category-info-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-70%);
    text-align: center;
    color: #fff;
    width: 100%;
}
.category-info-container h1{
    font-size: 30px;
}
.category-info-container p{
    font-size: 14px;
}
.category-nav{
    margin-top: 20px;
    margin-bottom: 20px;
}
.category-nav ul{
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-left: 0;
}
.category-nav li{
    position: relative;
}
.router-link-exact-active:after{
    /* border-bottom: 2px solid #333; */
    content: ' ';
    color: red;
    position: absolute;
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%);
    width: 15px;
    border-bottom: 3px solid #333;
}
.navLink{
    color: #333
}
</style>



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
               <li v-for="(item,index) in nav" :key="index" :class="[curIndex==index ? 'navActive' : '' ]" @click="clickLink(index)">
                      {{item.name}}
               </li>                                           
           </ul>
       </nav>
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
            nav:[],
            curIndex: 0
        }
    },
    methods:{
        clickLink: function(index){
            this.curIndex = index
        }
    },
    mounted(){
        this.$axios({
            methods: 'GET',
            url: '/videoapi/api/v4/categories/detail/tab?id='+this.$route.params.id
        })
        .then((res)=>{
            // console.log(res.data)
            this.headerImage = res.data.categoryInfo.headerImage
            this.tabInfo = res.data.tabInfo
            this.description = res.data.categoryInfo.description
            this.name = res.data.categoryInfo.name
            this.nav = res.data.tabInfo.tabList
            
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
.navActive:after{
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
</style>



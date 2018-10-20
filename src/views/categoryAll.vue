<template>
    <div class="categoryAll">
        接口连接失败...
    </div>
</template>
<script>
export default {
    name:"categoryAll",
    data(){
        return{
            recently:'',
            popular:''
        }
    },
    mounted(){
        // this.$axios({
        //     methods:'get',
        //     url:'/videoapi/api/v4/categories/videoList?id=36'
        // })
        // .then((res)=>{
        //     console.log(res.data)
        //     // this.recently = res.data.itemList[0].data.header.name
        // })
    }
}
</script>
<style scoped>

</style>



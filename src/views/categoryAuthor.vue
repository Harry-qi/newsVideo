<template>
    <div class="categoryAuthor">
        <div class="recently">
            <h3>{{recently}}</h3>
            <video src=""></video>
        </div>
        <div class="popular">
            <h3>{{popular}}</h3>
            <video src=""></video>
        </div>
    </div>
</template>
<script>
export default {
    name:"categoryAuthor",
    data(){
        return{
            recently:'',
            popular:''
        }
    },
    // mounted(){
    //     this.$axios({
    //         methods:'get',
    //         url:'/videoapi/api/v4/categories/detail/index?id=8'
    //     })
    //     .then((res)=>{
    //         console.log(res.data.itemList)
    //         // this.recently = res.data.itemList[0].data.header.name
    //     })
    // }
}
</script>
<style scoped>

</style>



<template>
    <div class="VideoDetail" >
        <!-- <video :src=""></video> -->
    </div>
</template>

<script>
export default {
    name:"VideoDetail",
    data(){
        return{
        }
    },
    mounted(){
        this.$axios({
            method:"get",
            baseURL:"/api",
            url:"/videoapi/api/v4/tabs/selected"+this.$route.params.date
        })
        .then((res)=>{
            
        })
        
    }
}
</script>

<style>

</style>



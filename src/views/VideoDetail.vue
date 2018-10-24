<template>
    <div class="VideoDetail" >
        <video :src="videoUrl" class="video" controls="controls" autoplay="autoplay"></video>
    </div>
</template>

<script>
export default {
    name:"VideoDetail",
    data(){
        return{
            videoUrl:"http://baobab.kaiyanapp.com/api/v1/playUrl?vid="+this.$route.params.id+"&resourceType=video&editionType=default&source=aliyun&f=iphone&u=&vc=0"
        }
    },
    mounted(){
        this.$axios({
            methods: "GET",
            url: "/videoapi/api/v4/video/related?id=45897"
        }).then((res)=>{
            console.log(res.data)
        })
    }
}
</script>

<style lang="scss">
.video{
    width:100%;
}
</style>



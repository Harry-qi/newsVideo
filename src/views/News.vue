<template>
  <div class="news">
      <div v-for="item in titleData">
          <div class="newsBox">
              <Title :titleName="item"></Title>
              <img :src="item.data.cover.detail" alt="" >
          </div>
      </div>
  </div>
</template>

<script>
import Title from '../components/Title'
import dataNew from "../../public/data"
import hot from "../../public/hot"
import img from "../../public/img"
export default {
  data(){
    return {
      titleData:[],
      imgData:[]
    }
  },
   components:{
     Title
   },
   mounted(){
      // console.log(dataNew.itemList)
      // this.newsData = dataNew.itemList
      //console.log(this.newsData)
      // this.titleData.push(dataNew.itemList[0].data.title)
      // this.titleData.push(dataNew.itemList[4].data.title)
      // this.titleData.push(dataNew.itemList[5].data.itemList[0].data.title)

      // this.imgData.push(dataNew.itemList[0].data.cover.detail)
      // this.imgData.push(dataNew.itemList[4].data.cover.detail)
      // this.imgData.push(dataNew.itemList[5].data.itemList[0].data.cover.detail)
      // console.log( this.titleData)
      this.titleData = img.hotEvents.title

      // console.log(img)
    }
}
</script>

<style>
.newsBox{
  padding:10px 2px 2px 2px;
  border: 1px solid #eee;
  padding-top: 20px
}
.newsBox img{
  width: 100%;
  height: 188px;
}
</style>



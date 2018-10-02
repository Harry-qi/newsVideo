<template>
<!-- import func from './vue-temp/vue-editor-bridge'; -->
  <div id="app">
    <router-view></router-view>
    <div class="navContainer">
        <div id="nav">
            <router-link to="/">
                <div class="navBox">
                  <img v-if="picked" @click="chnagesMuen" src="../src/assets/icon3.jpg" class="navImg">
                  <img v-else src="../src/assets/icon33.jpg" class="navImg">
                  <span class="navItem">read</span>
                </div>
            </router-link>
            <router-link to="/video">
                <div class="navBox">
                  <img v-if="picked" dateId="222" @click="chnagesMuen" src="../src/assets/icon1.jpg" class="navImg">
                  <img v-else src="../src/assets/icon11.jpg" class="navImg">
                  <span class="navItem">video</span>
                </div>
            </router-link>
            <router-link to="/news">
                <div class="navBox">
                  <img v-if="picked" @click="chnagesMuen" src="../src/assets/icon2.jpg" class="navImg">
                  <img v-else src="../src/assets/icon22.jpg" class="navImg">
                  <span class="navItem">news</span>
                </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      picked:true
    }
    
  },
  methods:{
  chnagesMuen: function (e){
        console.log(e.target.parentNode.firstChild)
      }
    }
  }
    
</script>


<style>
#app {
  font-family: PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.navContainer{
  width: 100%;
  height: 60px;
  position:fixed;
  bottom: 0;
  background: #fff;
  z-index: 99999
}
#nav {
  width: 100%;
  margin:0 auto;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.navBox{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.navImg{
  width: 1.5rem;
}
.navItem{
  font-size: 16px;
  line-height: 35px;
}
#nav a {
  font-weight: bold;
  color: rgb(195, 192, 192);
}
#nav a.router-link-exact-active {
  color: #333;
}
a{
  text-decoration: none
}
</style>


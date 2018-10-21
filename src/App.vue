<template>
  <div id="app">
    <transition name="fade">
          <router-view></router-view>
    </transition>  
    <div class="navContainer">
        <div id="nav">
            <!-- <router-link to="/">
                <div class="navBox" @click="chnagesMuen">
                  <img v-if="picked" @click="chnagesMuen" src="../src/assets/icon3.jpg" class="navImg">
                  <img v-else src="../src/assets/icon33.jpg" class="navImg">
                  <span class="navItem">read</span>
                </div>
            </router-link>
            <router-link to="/video">
                <div class="navBox">
                  <img v-if="picked"  @click="chnagesMuen" src="../src/assets/icon1.jpg" class="navImg">
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
            </router-link> -->
            <router-link :to="item.link" v-for="(item,index) in nav" :key="index">
                <div class="navBox" @click="chnagesMuen(index)">
                  <img v-if="current!==index" :src="item.src" class="navImg">
                  <img v-if='current ==index' :src="item.activeSrc" class="navImg">
                  <span class="navItem">{{item.name}}</span>
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
      current:0,
      nav:[
        {
          name:'read',
          src:require('./assets/icon1.jpg'),
          activeSrc:require('./assets/activeIcon1.jpg'),
          link:'/'
        },
        {
          name:'video',
          src:require('./assets/icon2.jpg'),
          activeSrc:require('./assets/activeIcon2.jpg'),
          link:'/video'
        }, 
        {
          name:'news',
          src:require('./assets/icon3.jpg'),
          activeSrc:require('./assets/activeIcon3.jpg'),
          link:'/news'
        },                
      ]
    }
    
  },
  methods:{
  chnagesMuen: function (index){
        this.current = index
      }
    }
  }
    
</script>


<style lang="scss">
@import './assets/reset.css';
@import './assets/iconfont.css';
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
  align-items: center;
  width: 42px;
  height: 60px;
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
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}

</style>


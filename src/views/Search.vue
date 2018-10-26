<template>
    <div class="search">
        <!-- 搜索框 -->
        <div class="searchBox">
            <div class="inputBox">
                <img src="../assets/search.png" alt="">
                <input type="text"  placeholder="搜索视频、作者、用户及标签" 
                autofocus="autofocus" @keyup.enter="getValue()" v-model="searchValue" value="searchValue">
                <span class="del" v-show="showDel" @click="del()">×</span>
            </div>
            <input type="hidden" value="searchValue">
            <router-link to="/video">
                <span >取消</span>
            </router-link>
        </div>
        <!-- 搜索历史 -->
        <div class="history" v-show="showHistory">
            <div class="title">
                <h2>搜索历史</h2>
                <span @click="delHistory()">删除</span>
            </div>
            <ul @click="gethistoryWord">
                <li v-for="(item,index) in historyWord" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <!-- 搜索结果 -->
        <div class="searchResult" v-show="showResult">
            <p>共找到{{searchNum}}条数据</p>
            <ul>
                <li v-for="(item,index) in searchList" :key="index">
                    <router-link :to="{name:'videoDetail',params:{id:item.data.id}}">
                        {{item.data.title}}
                    </router-link>
                   
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
    data(){
        return{
            searchValue:'',
            searchList:[],
            showHistory:true,
            showResult:false,
            showDel:false,
            historyWord:[],
            searchNum:0
        }
    },
    methods:{
        getValue(){
            this.$axios({
                methods:'GET',
                url:"/videoapi/api/v1/search?num=10&query="+this.searchValue +"&start=10"
            }).then((res)=>{
                this.showResult = true
                this.showDel = true
                this.showHistory = false
                this.searchList = res.data.itemList
                this.searchNum = res.data.count
                this.debounce(this.historyWord.push(this.searchValue))
                this.historyWord = [...new Set(this.historyWord)] //如果用户多次输入同一个词，这里进行去重处理
                localStorage.setItem('historyWord', this.historyWord);//将输入的词，存储到本地
            })
        },
        // 删除输入的内容
        del(){
            this.searchValue = ''
            this.showDel = false
            this.showResult = false
            this.showHistory = true
        },
        // 删除历史
        delHistory(){
            this.historyWord.length = 0
            this.showDel = false
            this.showHistory = false
            localStorage.removeItem('historyWord');
        },
        // 点击搜索历史里面的词，进行搜索
        gethistoryWord(e){
            if(e.target.tagName=='LI'){
                this.searchValue =  e.target.outerText
                this.getValue()
            }
        },
        debounce(fn, delay){
            // 持久化一个定时器
            let timer = null
            
            // 闭包函数可以访问timer
            return function(){
                // 通过 this 和 arguments 获得函数的作用域和参数
                let context = this
                let args = arguments
                // 如果事件被触发，清除timer并重新开始计时
                clearTimeout(timer)
                timer = setTimeout(function() {
                    fn.apply(context, args)
                }, delay)
            }
        }
    },
    mounted(){
        let localHistoryWord = localStorage.getItem("historyWord") //得到的是一个对象
        if(localHistoryWord==null||localHistoryWord==''){
            localHistoryWord = []
        }else{
            this.historyWord=localHistoryWord.split(",") 
        }

    },
    watch:{
        searchValue: function(val,oldVal){
            if(val==''){
                this.showResult = false
                this.showDel = false
                this.showHistory = true
            }
            // else{
            //     this.debounce(this.getValue(),50)
            // }
        },
    }
}
</script>
<style lang="scss" scoped>
.search{
    padding: 10px;
}
.searchBox{
    width: 100%;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    .inputBox{
      width: 300px;
      line-height: 30px;
      height: 30px;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      background: #eeeeee;
      padding-left: 10px;
      border-radius: 5px;
        img{
            width: 15px;
            height: 15px;
            margin-right: 5px;
        }
        input{
            border:none;
            height: 30px;
            line-height: 30px;
            width: 90%;
            background: #eeeeee;
            &:focus{
               outline:none
            }
        } 
        .del{
            font-size: 16px;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            display: inline-block;
            border:1px solid #333;
            border-radius: 25px;
            margin-right: 5px;
        }
      }
    a{
        color: #323232;
    }  
}
.history{
    margin-top: 20px;
    padding-left: 10px;
    align-content: center;
    .title{
        height: 30px;
        line-height: 30px;
        h2{
            font-size: 21px;
            font-weight: bolder;
            float: left;
        }
        span{
            float: right
        }
        &::after{
            content: '';
            display: block;
            clear: both;
        }
    }

    ul{
        margin-top: 10px;
    }
    li{
        color: #007aff;
        font-size: 14px;
        font-weight: bolder;
        line-height: 30px
    }
}
.searchResult {
    padding: 10px;
    p{
        text-align: left;
        margin-top: 10px;
    }
    ul{
        margin-top: 20px;
        li{
            height: 40px;
            line-height: 20px;
            font-size: 16px;
            a{
                color: #333;
                font-weight: bolder
            }
        }
    }
}
</style>



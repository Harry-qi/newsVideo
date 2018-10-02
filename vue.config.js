module.exports = {
  devServer:{
        // host:"http://192.168.137.1",
        // 跨域设置
        proxy: {
            '/readapi':{
              target:'https://interface.meiriyiwen.com',
              ws:true,
              changeOrigin:true,
              pathRewrite:{
                '^/readapi':''
              }
            },
            '/videoapi': {
              target: 'http://baobab.kaiyanapp.com',
              ws:true,
              changeOrigin: true,
              pathRewrite: { 
                '^/videoapi': '' 
              }
            },
            '/newsapi':{
              target: 'https://zhihu-daily.leanapp.cn',
              ws:true,
              changeOrigin: true,
              pathRewrite: {
                '^/newsapi': ''
              }
            }
          },
    },
  }
module.exports = {
  devServer:{
        // 手机端调试
        host:'192.168.137.1',
        port: 8080,
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
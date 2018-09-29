module.exports = {
  devServer:{
    // 跨域设置
        proxy: {
            '/api': {
              target: 'https://interface.meiriyiwen.com',
              // ws: true,
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          }  
    }
  }
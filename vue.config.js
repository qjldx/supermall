/*
* 配置文件的别名
* */
/*const path=require('path');
function resolve(dir){
    return path.join(__dirname,dir);
}*/
module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
   /*chainWebpack: (config)=> {
          config.resolve.alias
              .set('common',resolve('./src/common'))
              .set('components',resolve('./src/components'))
              .set('network',resolve('./src/network'))
              .set('view',resolve('./src/view'))
              .set('assets',resolve('./src/assets'))
   }*/
}

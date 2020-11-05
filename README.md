# supermall
#common文件夹为公共的文件夹,content是和当前业务相关的文件
 components
        common
        content
##上面的为文件的结构     
###veu.config.js
配置文件的目录别名
```

* 配置文件的别名

module.exports={
    configurewebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}
```
##.editorconfig
是一个项目配置要求包括缩进,换行等等的配置
```
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true 
```
###common的文件夹防止公共的js文件

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
```
normalize.css的样式,直接将源文件赋值下来,拷贝到相应的目录即可

```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


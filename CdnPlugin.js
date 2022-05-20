const fs = require('fs');

class CndPlugin {
  constructor() {}
  apply(compiler) {
    console.log('cdnPlugin 启动');
    // compiler => 包含了我们此次构建的所有配置信息
    compiler.hooks.afterEmit.tapAsync('done', (compilation, callback) => {
      fs.readdir('dist/static/img', (err, files) => {
        if (err) {
          console.error(err);
        } else {
          uploadImg(file)
        }
      })
    })
  }
}

async function uploadImg(files) {
  
}

module.exports = CndPlugin;
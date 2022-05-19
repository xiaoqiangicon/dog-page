// webpack插件必须是一个函数或者是一个包含apply方法的对象。
// 一般我们都会定义一个类型，在这个类中定义apply方法
// 然后通过创建一个实例对象去使用这个插件

class RemoveCommentsPlugin {
  constructor() {}
  apply(compiler) {
    console.log('removeCommentsPlugin 启动');
    // compiler => 包含了我们此次构建的所有配置信息
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name);  // 输出文件名称
        // console.log(compilation.assets[name].source())  // 输出文件内容
        if (name.endsWith('.html')) {
          const contents = compilation.assets[name].source();
          let firstScript = contents.indexOf('<script>');
          const addDataContents = contents.slice(0, firstScript) + '<script>window.globalData={nickName:"${.nickName}",id:"${.id}"}</script><script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></script><script>var vConsole = new VConsole();console.log("hello vconsole");</script>' + contents.slice(firstScript);
          compilation.assets[name] = {
            source: () => addDataContents,
            size: () => addDataContents.length
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin;
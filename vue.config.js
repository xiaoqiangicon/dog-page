module.exports = {
	//=>outputDir
	//=>自定义目录名称，把生成的JS/CSS/图片等静态资源放置到这个目录中
	assetsDir: 'static',
	//=>关闭生产环境下的资源映射（生产环境下不在创建xxx.js.map文件）
	productionSourceMap: false,
	//=>设置一些webpack配置项，用这些配置项和默认的配置项合并
	configureWebpack: {
		plugins: []
	},
	
}
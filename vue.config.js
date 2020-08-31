// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pxtorem = require("postcss-pxtorem")
module.exports = {

    lintOnSave: true,
    publicPath: "./",

    chainWebpack: config => {
        config.module
            .rule("ts")
            .use("ts-loader")
            .tap(options => {
                options = merge(options, {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: "vant",
                                libraryDirectory: "es",
                                style: true
                            })
                        ]
                    }),
                    compilerOptions: {
                        module: "es2015"
                    }
                });
                return options;
            });

    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://mobile.baosteel.com',  //正式环境   http://mobile.baosteel.com    测试环境：http://mobiletest.baosteel.com
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    productionSourceMap: false,

};

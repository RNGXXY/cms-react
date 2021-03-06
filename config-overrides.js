
// 需要使用react-app-rewired工具来做配置文件
const { injectBabelPlugin } = require('react-app-rewired');

const PATH = require('path')

function resolve(url) {
    return PATH.resolve(__dirname, 'src/', url)
}

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config);

    // 配置别名
    //  跟vue不一样的是，这里用的是键值对
     config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve(''),
        '@Page': resolve('page'),
        "@Store": resolve('store'),
        "@Assets": resolve('assets'),
        "@Common": resolve('common'),
        "@Util": resolve('util'),
    }

    return config;
};  
// Vue前后端分离配置

let proxyObj = {};

proxyObj["/"] = {
    ws: false,
    target: 'http://127.0.0.1:8090',
    changeOrigin: false,
    pathRewrite: {
        "^/": ''
    }
}

module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8070,
        proxy: proxyObj
    }
}

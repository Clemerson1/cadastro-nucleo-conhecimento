// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // O caminho que seu frontend vai usar para prefixar as requisições
        createProxyMiddleware({
            target: 'http://localhost:8081', // A URL do seu microserviço Java
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // Remove o prefixo '/api' antes de enviar para o backend
            },
        })
    );
};
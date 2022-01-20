const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(createProxyMiddleware(["/apod"], { target: `http://localhost:${process.env.BACKEND_SERVER_PORT || 5000}` }));
};

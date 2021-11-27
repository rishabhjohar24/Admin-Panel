const App = require('./app');
const http = require('http');
const port = process.env.PORT || 5000;
http.createServer(App).listen(port);
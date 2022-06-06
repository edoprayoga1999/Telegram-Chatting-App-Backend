/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const socketIo = require('socket.io');
const http = require('http');
const socketController = require('./src/socket');

const authRoute = require('./src/routers/auth.route');
const userRoute = require('./src/routers/user.route');

const app = express();
app.use(cors());
app.use(helmet({
	crossOriginResourcePolicy: false,
}));
app.use(xss());
app.use(bodyParser.json());

app.use(authRoute);
app.use(userRoute);

app.use(express.static('public'));

const APP_PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: '*'
	}
});
io.on('connection', (socket) => {
	console.log('new user connected');
	socketController(io, socket);
});
server.listen(APP_PORT, () => {
	console.log(`Service running on port ${APP_PORT}`);
});

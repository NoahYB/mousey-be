const express = require('express');
const WebSocket = require('ws');
const http = require('https');
var fs = require('fs');
const app = express();

//initialize a simple http server

const wss = new WebSocket.Server({ port:56112, clientTracking: true});
// const wss = new WebSocket.Server({ port:8080, clientTracking: true})
// const server = http.createServer({
//   cert: fs.readFileSync('/etc/letsencrypt/live/brintonliteraryagency.org/cert.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/brintonliteraryagency.org/privkey.pem')
// });
// server.listen(443);
// console.log(server);
// const wss = new WebSocket.Server({ server, autoAcceptConnections: true});
let connectedClients = [];
wss.on('request', function(request) {
        var connection = request.accept('echo-protocol', request.origin);
        console.log((new Date()) + ' Connection accepted.');
});
wss.on('connection', function connection(ws) {
        console.log('connected');
        console.log('New Connection', ws);
        connectedClients.push(ws);
        ws.on('message', function incoming(message) {   
                let m = JSON.parse(message);
                let data = m.data;
                console.log('received: %s');
                wss.clients.forEach(client => {
                        client.send(JSON.stringify(data))
                });
        });

        ws.on('error', function(e) {
                console.log('error', e);
        });

        ws.on('close', function(e) {
                console.log('close', e);
        });
        ws.send('something');
});
//start our server
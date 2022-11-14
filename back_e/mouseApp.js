const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:56112, clientTracking: true});
let connectedClients = {};

wss.on('request', function(request) {
        var connection = request.accept('echo-protocol', request.origin);
        console.log((new Date()) + ' Connection accepted.');
});

wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) { 

                let m = JSON.parse(message);
                let data = m.data;

                if (!connectedClients[data.id]) {
                        connectedClients[data.id] = {
                                id: data.id,
                                connected: true,
                        };
                }

                if (data.action === "selectTeam") {
                        connectedClients[data.id].team = data.teamSelection;
                }

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
        
        ws.send(JSON.stringify(connectedClients));
});
//start our server
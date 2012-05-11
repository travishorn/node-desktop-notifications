# node-desktop-notifications

## Description
Send webkit desktop notifications through Node using web sockets.

## Installation

1. Download the zip/tar file or clone the git repository
2. Extract and place contents of `lib/` into `node_modules/desktop-notifications/` directory.
3. `npm install` to install socket.io

## Dependencies
The only dependency is [socket.io][1]. You will also have to know the syntax for emitting custom events in socket.io.

## Usage
### Server (app.js)
    var app = require('http').createServer(handler)
      , io = require('socket.io').listen(app)
      , fs = require('fs')
      , notifications = require('../desktop-notifications');

    app.listen(3000);
    notifications.listen(app);

    function handler (req, res) {
      if (req.url == '/') {
        fs.readFile(__dirname + '/index.html', function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading page.');
          }

          res.writeHead(200);
          res.end(data);
        });
      }
    }

    io.sockets.on('connection', function (socket) {
      notifications.notify({
          socket: socket
        , icon : 'img/info.png'
        , title : 'Notification Title'
        , content : 'Notification content...'
        , timeout : 10000
        , onclick : function () { console.log('Clicked.'); }
      })
    });

### Client (index.html)
    <script src="/socket.io/socket.io.js"></script>
    <script src="/desktop-notifications.js"></script>

## Notes
The client will have had to previously allow notifications. You can request permission with `window.webkitNotifications.requestPermission()`. The `requestPermission()` function needs to be called from a user action such as clicking a button or link.

A simple demo that utilizes the code above can be found in the `demo/` directory.

## License (MIT)
Copyright (c) 2012 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: http://socket.io/

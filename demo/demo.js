var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , notifications = require('../lib/desktop-notifications');

app.listen(3000);
notifications.listen(app);

function handler (req, res) {
  if (req.url == '/') {
    fs.readFile(__dirname + '/demo.html', function (err, data) {
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

var fs = require('fs')

exports.listen = function (server) {
  server.addListener('request', function(req, res) {
    if (req.url == '/desktop-notifications.js') {
      fs.readFile(__dirname + '/desktop-notifications-client.js', function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading script.');
        }

        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      });
    }
  });
};

exports.notify = function (options) {
  options.socket.emit('notify', {
      icon: options.icon
    , title: options.title
    , content: options.content
    , timeout: options.timeout
    , onclick: options.onclick
  });
};

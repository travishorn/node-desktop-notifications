var notificationsEnabled = false;
if (window.webkitNotifications) {
  if (window.webkitNotifications.checkPermission() == 0){
    notificationsEnabled = true;
  } else if (window.webkitNotifications.checkPermission() == 1) {
    console.error('Notifications not allowed.');
  } else if (window.webkitNotifications.checkPermission() == 2) {
    console.error('Notifications denied.');
  }
} else {
  console.error('Notifications not supported');
}

var notification = {};

function notify (options) {
  if (notificationsEnabled) {
    var id = Math.random();

    notification[id] = window.webkitNotifications.createNotification(
        options.icon
      , options.title
      , options.content
    );

    notification[id].ondisplay = function () {
      setTimeout(function () {
        notification[id].cancel();
        delete notification[id];
      }, options.timeout);
    };

    notification[id].onclick = options.onclick;

    notification[id].show();
  } else {
    console.error('Notifications are not enabled.');
  }
};

var socket = io.connect('http://10.51.14.197:3000');
socket.on('notify', function (data) {
  notify(data);
});

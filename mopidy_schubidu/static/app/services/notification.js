(function () {
  'use strict';

  angular.module('schubidu.notify', [])
    .factory('notify', function ($window) {

      var notify = function (title, options) {
        // no support
        if (!("Notification" in window)) return;
        // request permission if not granted nor denied
        if (Notification.permission !== "granted" && Notification.permission !== 'denied') {
          Notification.requestPermission(function (permission) {
            notify(title, options);
          });
          return;
        }
        // if granted, notify!
        if (Notification.permission === "granted") {
          var notification = new Notification(title, options);
          notification.onclick = function () {
            $window.focus();
          };
          notification.onshow = function () {
            $window.setTimeout(function () {
              notification.close()
            }, 5000);
          };
        }
      };

      return {
        notifyNowPlaying: function (track) {
          if (document.hidden) {
            notify('Now Playing...', {
              body: track.name + ' (' + track.date + ')\n' + track.artists[0].name + ' - ' + track.album.name,
              icon: track.album.images[0]
            });
          }
        }
      }

    });

})();
(function () {
  'use strict';

  angular.module('schubidu.mopidy', [])

    .factory('mopidy', function ($q, $rootScope) {

      var mopidy = new Mopidy({callingConvention: 'by-position-or-by-name'});

      // event logging for debug
      mopidy.on(function(event, data) {
        console.log(event, data);
      })

      // track online state
      var isOnline = false;
      mopidy.on('state:online', function () {
        isOnline = true
      });
      mopidy.on('state:offline', function () {
        isOnline = false
      });

      // ready function for convenience
      mopidy.ready = function (fn) {
        if (isOnline) {
          fn();
        } else {
          mopidy.once('state:online', function () {
            fn();
          });
        }
      };

      // transparently wrap promises of mopidy (when.js) into the angular version ($q)
      mopidy._send = function (message) {
        return $q.when(
          Mopidy.prototype._send.apply(mopidy, [message])
        );
      };

      // wrap events into angular data-binding cycle
      mopidy._handleEvent = function (eventMessage) {
        $rootScope.$apply(function () {
          Mopidy.prototype._handleEvent.apply(mopidy, [eventMessage]);
        });
      };

      // hand out the patched api instance
      return mopidy;
    });

})();
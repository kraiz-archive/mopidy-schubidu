(function () {
  'use strict';

  angular.module('schubidu.playback', [])

    .factory('playback', function (mopidy) {

      function add2tracklist(item, position) {
        position = position || null;
        var tracks = [];

        console.log(item.__model__);

        if (item.__model__ == 'Track') {
          tracks.push(item)
        }


        mopidy.tracklist.add({
          "tracks": tracks,
          "at_position": position}).then(function (data) {
          console.log(data);
        });
      }

      // exported service api
      return {
        appendToTracklist: add2tracklist,
        playAsNext: function (item) {
          add2tracklist(item, 1)
        }
      };
    });

})();
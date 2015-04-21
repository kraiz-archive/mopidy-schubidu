(function () {
  'use strict';

  angular.module('schubidu.playback', [])

    .factory('playback', function (mopidy) {

      function add2tracklist(item, position) {
        position = position || null;
        var tracks = [];

        if (item.__model__ == 'Track') {
          tracks.push(item)
        }

        mopidy.tracklist.add({
          "tracks": tracks,
          "at_position": position
        });
      }

      // exported service api
      return {
        appendToTracklist: add2tracklist,
        playAsNext: function (item) {
          mopidy.playback.getCurrentTlTrack({}).then(function(data){
            console.log(data.tlid);
            add2tracklist(item, data.tlid);
          });
        }
      };
    });

})();
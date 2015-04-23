(function () {
  'use strict';

  angular.module('schubidu.playback', [])

    .factory('playback', function (mopidy) {

      var consoleError = console.error.bind(console);

      function add2tracklist(item, position) {
        position = position || null;
        var tracks = [];

        if (item.__model__ == 'Track') {
          tracks.push(item)
        }

        mopidy.tracklist.add({
          "tracks": tracks,
          "at_position": position
        })
      }

      function playAsNext(item) {
        // we need tracklist and current track to find correct target position
        mopidy.tracklist.getTlTracks({}).then(function (tlTracks) {
          mopidy.playback.getCurrentTlTrack({}).then(function (currentTlTrack) {
            if (currentTlTrack === null) {
              add2tracklist(item, 0);
            } else {
              // map tracklist tracks to their tracklist ids and find position of current track
              var position = tlTracks.map(function (tlTrack) {
                return tlTrack.tlid
              }).indexOf(currentTlTrack.tlid);
              // now we know position, so insert item behind
              add2tracklist(item, position + 1);
            }
          }, consoleError);
        }, consoleError);
      }

      function removeFromTracklist(tltrack) {
        alert('to be implemented soon!')
      }

      function playNow(tltrack) {
        alert('to be implemented soon!')
      }

      // exported service api
      return {
        appendToTracklist: add2tracklist,
        playAsNext: playAsNext,
        playNow: playNow,
        removeFromTracklist: removeFromTracklist
      };
    });

})();
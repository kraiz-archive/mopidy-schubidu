(function () {
  'use strict';

  angular.module('schubidu.playback', [])

    .factory('playback', function (mopidy) {

      var consoleError = console.error.bind(console);

      function add2tracklist(item, position) {
        position = position || null;

        switch (item.__model__) {
          case 'Track':
            mopidy.tracklist.add({tracks: [item], at_position: position});
            break;
          case 'Album':
            mopidy.library.lookup({uri: item.uri}).then(function (data) {
              mopidy.tracklist.add({tracks: data, at_position: position});
            });
            break;
        }
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
        mopidy.tracklist.remove({tlid: [tltrack.tlid]});
      }

      function playNow(tltrack) {
        mopidy.playback.play({tlid: tltrack.tlid});
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
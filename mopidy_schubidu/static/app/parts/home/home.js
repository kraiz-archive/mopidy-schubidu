(function () {
  'use strict';

  angular
    .module('schubidu.home', ['schubidu.mopidy'])
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, $log, mopidy) {

    mopidy.ready(function () {
      mopidy.playback.getCurrentTrack().then(function(track){
        if (track) {
          $scope.currentTrack = track;
        }
      });
    });

    mopidy.on('event:trackPlaybackStarted', function(data) {
      $scope.currentTrack = data.tl_track.track;
    });
  }

})();

(function () {
  'use strict';

  angular
    .module('schubidu.tracklist', ['schubidu.mopidy', 'ngMdIcons'])
    .directive('schubiduTracklist', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/parts/tracklist/tracklist.html',
        controller: TracklistCtrl
      };
    });

  function TracklistCtrl($scope, mopidy) {
    $scope.waitingForResults = true;
    $scope.tltracks = null;
    $scope.currentTlTrack = null;



    // get initial values
    mopidy.ready(function () {
      mopidy.tracklist.getTlTracks({}).then(function (data) {
        $scope.waitingForResults = false;
        $scope.tltracks = data;
      });
      mopidy.playback.getCurrentTlTrack({}).then(function(data){
        $scope.currentTlTrack = data;
      });
    });

    // update from server
    mopidy.on('event:trackPlaybackStarted', function (data) {
      $scope.currentTlTrack = data.tl_track;
    });
    mopidy.on('event:tracklist_changed', function (data) {
      console.log('tracklist_changed', data);
    });
  }

})();
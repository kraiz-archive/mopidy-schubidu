(function () {
  'use strict';

  angular
    .module('schubidu.controls', ['schubidu.mopidy'])
    .directive('schubiduControls', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/parts/controls/controls.html',
        controller: schubiduControlsController
      };
    });

  function schubiduControlsController($scope, mopidy) {
    $scope.playing = false;
    $scope.random = false;
    $scope.consume = false;
    $scope._volume = 100;
    $scope.volume = function (newVolume) {
      if (angular.isDefined(newVolume)) {
        mopidy.playback.setVolume({"volume": newVolume});
      }
      return $scope._volume;
    };

    // get initial values
    mopidy.ready(function () {
      mopidy.playback.getVolume().then(function (data) {
        $scope._volume = data;
      });
      mopidy.playback.getState().then(function (data) {
        $scope.playing = data === 'playing';
      });
      mopidy.tracklist.getRandom().then(function (data) {
        $scope.random = data;
      });
      mopidy.tracklist.getConsume().then(function (data) {
        $scope.consume = data;
      });
    });

    // update from server
    mopidy.on('event:playbackStateChanged', function (data) {
      $scope.playing = data.new_state === 'playing';
    });
    mopidy.on('event:volumeChanged', function (data) {
      $scope._volume = data.volume;
    });
    mopidy.on('event:optionsChanged', function () {
      // shitty api here...we don't really know what "option" changed
      // must be "random" or "consume", so refresh both
      mopidy.tracklist.getRandom().then(function (data) {
        $scope.random = data;
      });
      mopidy.tracklist.getConsume().then(function (data) {
        $scope.consume = data
      });
    });

    // button handler
    $scope.play = function () {
      if ($scope.playing) {
        mopidy.playback.pause()
      } else {
        mopidy.playback.play()
      }
    };
    $scope.previous = function () {
      mopidy.playback.previous()
    };
    $scope.next = function () {
      mopidy.playback.next()
    };
    $scope.toggleRandom = function () {
      mopidy.tracklist.setRandom({value: !$scope.random})
    };
    $scope.toggleConsume = function () {
      mopidy.tracklist.setConsume({value: !$scope.consume})
    };
  }
})();
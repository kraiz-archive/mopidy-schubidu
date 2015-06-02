(function () {
  'use strict';

  angular
    .module('schubidu.listing.track', ['schubidu.mopidy'])
    .controller('TrackListingItemCtrl', TrackListingItemCtrl)
    .directive('trackListing', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/listing/track-listing.html',
        scope: {
          tracks: '='
        }
      };
    });

  function TrackListingItemCtrl($scope, playback) {
    $scope.playAsNext = function () {
      playback.playAsNext($scope.track);
    };
    $scope.appendToTracklist = function () {
      playback.appendToTracklist($scope.track);
    };
  }

})();
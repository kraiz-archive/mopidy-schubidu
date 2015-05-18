(function () {
  'use strict';

  angular
    .module('schubidu.listing.album', ['schubidu.mopidy', 'ngMdIcons'])
    .controller('AlbumListingItemCtrl', AlbumListingItemCtrl)
    .directive('albumListing', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/listing/album-listing.html',
        scope: {
          albums: '='
        }
      };
    });

  function AlbumListingItemCtrl($scope, playback) {
    $scope.appendToTracklist = function () {
      playback.appendToTracklist($scope.album);
    };
  }

})();
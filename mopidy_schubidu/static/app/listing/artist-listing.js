(function () {
  'use strict';

  angular
    .module('schubidu.listing.artist', ['schubidu.mopidy', 'ngMdIcons'])
    .controller('ArtistListingItemCtrl', ArtistListingItemCtrl)
    .directive('artistListing', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/listing/artist-listing.html',
        scope: {
          artists: '='
        }
      };
    });

  function ArtistListingItemCtrl($scope) {
    // empty for now
  }

})();
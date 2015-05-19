(function () {
  'use strict';

  angular
    .module('schubidu', [
      'ngRoute',
      'ngMaterial',
      'angular.filter',
      'schubidu.mopidy',
      'schubidu.notify',
      'schubidu.listing.track',
      'schubidu.listing.album',
      'schubidu.listing.artist',
      'schubidu.home',
      'schubidu.browse',
      'schubidu.controls',
      'schubidu.tracklist',
      'schubidu.playback',
      'schubidu.search',
      'schubidu.utils'
    ])
    .controller('AppCtrl', AppCtrl)
    .config(function ($mdThemingProvider) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('green')
        .accentPalette('orange');
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/home', {
          controller: 'HomeCtrl',
          templateUrl: 'app/parts/home/home.html'
        })
        .when('/browse/:uri', {
          controller: 'BrowseCtrl',
          templateUrl: 'app/parts/browse/browse.html'
        })
        .when('/search', {
          controller: 'SearchResultCtrl',
          templateUrl: 'app/parts/search/search_results.html'
        })
        .otherwise({redirectTo: '/home'});
    });

  function AppCtrl($scope, $mdSidenav, playback) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    // put playback service into main controller, so every template
    // can call "playback.playAsNext(item)"
    $scope.playback = playback;
  }

})();
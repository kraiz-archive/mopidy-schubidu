(function () {
  'use strict';

  angular
    .module('schubidu', [
      'ngRoute',
      'ngMaterial',
      'angular.filter',
      'schubidu.mopidy',
      'schubidu.home',
      'schubidu.controls',
      'schubidu.tracklist',
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
        .when('/search', {
          controller: 'SearchResultCtrl',
          templateUrl: 'app/parts/search/search_results.html'
        })
        .otherwise({redirectTo: '/home'});
    });

  function AppCtrl($scope, $mdSidenav, mopidy) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.play = function(uri) {
        mopidy.playback.play({"tl_track": uri})
    };
  }

})();
(function () {
  'use strict';

  angular
    .module('schubidu.search', ['schubidu.mopidy'])
    .controller('SearchResultCtrl', SearchResultCtrl)
    .directive('schubiduSearchform', function () {
      return {
        restrict: 'E',
        templateUrl: 'app/parts/search/search_form.html',
        controller: SearchFormCtrl
      };
    });

  function SearchResultCtrl($scope, $routeParams, mopidy) {
    $scope.searchTerm = $routeParams.q;
    $scope.waitingForResults = true;
    $scope.result = null;

    mopidy.ready(function () {
      mopidy.library.search({any: $scope.searchTerm.split('/s')}).then(function (data) {
        // merge albums, artists and tracks from all backends
        var result = {albums: [], artists: [], tracks: []};
        angular.forEach(data, function (backend) {
          angular.forEach(result, function (list, name) {
            if (backend.hasOwnProperty(name)) {
              Array.prototype.push.apply(list, backend[name])
            }
          });
        });
        // copy into scope
        $scope.result = result;
        $scope.waitingForResults = false;
      });
    })
  }

  function SearchFormCtrl($scope, $location) {
    $scope.searchTerm = $location.search().q || '';
    $scope.submit = function () {
      if ($scope.searchTerm.length >= 3) {
        $location.path('/search').search({q: $scope.searchTerm});
      }
    }
  }
})();
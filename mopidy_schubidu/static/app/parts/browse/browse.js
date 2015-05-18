(function () {
  'use strict';

  angular
    .module('schubidu.browse', ['schubidu.mopidy', 'ngMdIcons'])
    .controller('BrowseCtrl', BrowseCtrl);

  function BrowseCtrl($scope, $routeParams, $q, mopidy) {
    $scope.uri = $routeParams.uri || null;
    $scope.waitingForResults = true;
    $scope.result = null;


    function mergeRootResults(result) {
      // request for each backend
      var backendRequests = result.map(function(item) {
        return mopidy.library.browse({uri: item.uri})
      })
      // when all backend requests are ready
      $q.all(backendRequests).then(function (data) {
        $scope.result = data.reduce(function(a, b) {
          return a.concat(b);
        });
        $scope.waitingForResults = false;
      });
    }



    mopidy.ready(function () {
      mopidy.library.browse({uri: $scope.uri}).then(function (data) {
        // do not display root browse step, step over merging initial results
        if ($scope.uri === null) {
          mergeRootResults(data);
        } else {
          $scope.result = data;
          $scope.waitingForResults = false;
        }
      });
    });

  }

})();
(function () {
  'use strict';

  angular
    .module('schubidu.browse', ['schubidu.mopidy', 'ngMdIcons'])
    .controller('BrowseCtrl', BrowseCtrl);

  function BrowseCtrl($scope, $routeParams, $location, $log, mopidy, playback) {
    $scope.result = null;
    $scope.waitingForResults = true;

    mopidy.ready(function () {
      mopidy.library.browse({uri: $routeParams.uri}).then(function (data) {
        $scope.result = data;
        $scope.waitingForResults = false;
      });
    });

    $scope.browse = function (item) {
      if (item.type == 'directory') {
        $location.path('/browse/' + item.uri);
      } else {
        $log.error('Cannot browse into to', item);
      }
    };
  }

})();
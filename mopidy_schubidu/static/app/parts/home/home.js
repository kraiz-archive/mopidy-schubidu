(function () {
  'use strict';

  angular
    .module('schubidu.home', ['schubidu.mopidy', 'ngMdIcons'])
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, $log, mopidy) {

    mopidy.ready(function () {
      $log.debug('home!')
    });

  }

})();
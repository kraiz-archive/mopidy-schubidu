(function () {
  'use strict';

  angular
    .module('schubidu.utils', ['schubidu.mopidy'])
    .directive('coverFrom', coverFrom)
    .filter('duration', duration);

  function coverFrom(mopidy) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var item = scope.$eval(attrs.coverFrom);
        var size = scope.$eval(attrs.coverSize || 300);
        var fallback = scope.$eval(attrs.coverFallback || 'folder')

        function setImage(url) {
          var completeUrl = url + '=s' + size;
          if (element[0].tagName == 'IMG') {
            attrs.$set('src', completeUrl);
          } else {
            element.css({
              'background-size': '100% 100%',
              'background-image': 'url(' + completeUrl + ')'
            });
          }
        }

        // some items already have images attached
        if (item) {
          if (item.hasOwnProperty('images') && item.images.length > 0) {
            setImage(item.images[0]);
          } else {
            // request images
            mopidy.ready(function () {
              mopidy.library.getImages({"uris": [item.uri]}).then(function (data) {
                if (data[item.uri].length > 0) {
                  setImage(data[item.uri][0].uri);
                }
              });
            });
          }
        }
      }
    };
  }

  function duration() {
    return function (input) {
      var seconds = parseInt(input / 1000);
      var hh = Math.floor(seconds / 3600);
      var mm = Math.floor((seconds - (hh * 3600)) / 60);
      var ss = seconds - (hh * 3600) - (mm * 60);

      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      if (ss < 10) {
        ss = '0' + ss
      }

      return hh + ':' + mm + ':' + ss;
    }
  }
})();

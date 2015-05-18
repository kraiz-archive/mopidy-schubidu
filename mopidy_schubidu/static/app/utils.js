(function () {
  'use strict';

  angular
    .module('schubidu.utils', ['schubidu.mopidy', 'ngMdIcons'])
    .directive('coverFrom', function (mopidy) {

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var item = scope.$eval(attrs.coverFrom);
          var size = scope.$eval(attrs.coverSize || 300);

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
    });
})();

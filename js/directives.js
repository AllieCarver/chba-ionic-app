angular.module('CHBAapp.directives', [])
.directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
          
          attrs.$observe('ngSrc', function(value) {
            if (!value && attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
    })
.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function(scope, element, attributes) {
          scope.$watch(attributes.hideTabs, function(value){
              $rootScope.hideTabs = value;
          });

          scope.$on('$ionicView.beforeLeave', function() {
              $rootScope.hideTabs = false;
          });
      }
  };
});
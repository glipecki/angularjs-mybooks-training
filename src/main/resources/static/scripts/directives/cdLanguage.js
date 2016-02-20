/**
 * Directive
 * Dostarcza zmianę języka
 */

app.directive('cdLanguage', function() {
  return {
    restrict: 'AE',
    replace: true,
    controller: 'CdLanguageController',
    controllerAs: 'vm',
    template: '<div><img src="img/{{vm.flag}}.png" class="flag navbar-right" ng-click = "vm.changeLanguage()"></div>'
  };
});

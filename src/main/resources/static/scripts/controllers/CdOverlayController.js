/**
 * Controller
 * Obsługuje wyświetlanie kręcioła
 */

app.controller('CdOverlayController', ['$rootScope', function($rootScope) {
  var ctrl = this;
  this.showSpinner = true;

  $rootScope.$on('$stateChangeStart', function() {
    ctrl.showSpinner = true;
  });
  $rootScope.$on('$stateChangeSuccess', function() {
    ctrl.showSpinner = false;
  });
  $rootScope.$on('$stateChangeError', function() {
    ctrl.showSpinner = false;
  });
}]);

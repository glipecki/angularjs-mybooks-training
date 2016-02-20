/**
 * Directive
 * Dostarcza kręcioła
 */

app.directive('cdOverlay', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'views/overlay.tpl.html',
    controller: 'CdOverlayController',
    controllerAs: 'vmt'
  };
});

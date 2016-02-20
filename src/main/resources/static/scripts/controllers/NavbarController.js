/**
 * Controller
 * Obsługuje interakcje z navbarem
 */

app.controller('NavbarController', ['CurrentNavigationState', function(currentNavigationState) {
  this.currentNavigationState = currentNavigationState;
}]);

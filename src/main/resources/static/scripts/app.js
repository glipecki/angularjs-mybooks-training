/**
* App module
*/
var app = angular.module('mybooks', ['ui.router', 'pascalprecht.translate']);

/**
* Controllers
*/
app.value('CurrentNavigationState', {});
app.run(['$rootScope', 'CurrentNavigationState', function($rootScope, currentNavigationState) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
		currentNavigationState.name = toState.name;
		currentNavigationState.params = toStateParams;
	});
}]);

app.controller('NavbarController', ['CurrentNavigationState', function(currentNavigationState) {
	this.currentNavigationState = currentNavigationState;
}]);

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

app.directive('cdOverlay', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '/views/overlay/overlay.tpl.html',
		controller: 'CdOverlayController',
		controllerAs: 'vm'
	};
});

/**
* Bootstrap app
*/ 
angular.element(document).ready(function() {
	angular.bootstrap(document, ['mybooks'], {
		strictDi: true
	});
});

var booksApp = angular.module('booksApp', ['ui.router', 'pascalprecht.translate', 'ngTagsInput', 'ngResource', 'ngAnimate', 'toastr', 'MassAutoComplete', 'ngSanitize']);

booksApp.run(['$rootScope', '$filter', 'toastr', function($rootScope, $filter, toastr){
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        toastr.error($filter('translate')('DATA_COLLECTING_ERROR'));
    });
}]);

booksApp.value('CurrentNavigationState', {});
booksApp.run(['$rootScope', 'CurrentNavigationState', function($rootScope, currentNavigationState) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
        currentNavigationState.name  = toState.name;
        currentNavigationState.params  = toStateParams;
    });
}]);
booksApp.controller('NavigationController',  ['CurrentNavigationState', function(currentNavigationState) {
    this.currentNavigationState = currentNavigationState;
}]);

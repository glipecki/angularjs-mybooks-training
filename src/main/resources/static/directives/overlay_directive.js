booksApp.directive('cdOverlay', function() {
    return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'views/overlay.tpl.html',
            controller: 'OverlayController',
            controllerAs: 'vm'
    };
});

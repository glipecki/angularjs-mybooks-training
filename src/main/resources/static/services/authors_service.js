booksApp.service('AuthorsService', ['$http',  '$q', function($http,  $q) {

    this.getAuthors = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/author'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);

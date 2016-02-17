booksApp.service('categoryService', ['$http',  '$q', function($http,  $q) {

    this.getCategories = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/category'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.addNewCategory  =  function(category) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/category',
            data: category
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.updateCategory  =  function(category) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/api/category/' + category.id,
            data: category
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);

booksApp.service('seriesService', ['$http',  '$q', function($http,  $q) {

    this.getSeries = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/series'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.addNewSeries = function(series) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/series',
            data: series
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.updateSeries  =  function(series) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/api/series/' + series.id,
            data: series
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);

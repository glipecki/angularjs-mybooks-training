/**
 * Service
 * Dostarcza informacji o seriach
 */

app.service('SeriesService', ['$http', '$q', function($http, $q) {
  this.getSeries = function() {
    var deferred = $q.defer();
    $http.get('/api/series').then(function(response) {
      deferred.resolve(response.data);
    }, function(errorResponse) {
      deferred.reject(errorResponse);
    });
    return deferred.promise;
  };
}]);

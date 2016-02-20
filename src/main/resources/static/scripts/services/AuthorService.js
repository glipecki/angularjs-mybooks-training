/**
 * Service
 * Dostarcza informacji o autorach
 */

app.service('AuthorService', ['$http', '$q', function($http, $q) {
  this.getAuthors = function() {
    var deferred = $q.defer();
    $http.get('/api/author').then(function(response) {
      deferred.resolve(response.data);
    }, function(errorResponse) {
      deferred.reject(errorResponse);
    });
    return deferred.promise;
  };
}]);

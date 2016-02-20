/**
 * Service
 * Dostarcza informacji o kategoriach
 */

app.service('CategoryService', ['$http', '$q', function($http, $q) {
  this.getCategories = function() {
    var deferred = $q.defer();
    $http.get('/api/category').then(function(response) {
      deferred.resolve(response.data);
    }, function(errorResponse) {
      deferred.reject(errorResponse);
    });
    return deferred.promise;
  };
  this.addCategory = function(category) {
    var deferred = $q.defer();
    $http.post('/api/category', {id: 0,name:category}).then(function(response) {
      deferred.resolve(response.data);
    }, function(errorResponse) {
      console.log(errorResponse);
      deferred.reject(errorResponse);
    });
    return deferred.promise;
  };
}]);

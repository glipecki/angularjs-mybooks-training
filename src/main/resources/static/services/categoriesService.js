app.service('CategoryService', [ '$http', '$q', function($http, $q) {
	this.getCategories = function() {
		var deferred = $q.defer();
		$http.get('/api/category/').then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};
	
	this.addCategory = function(category) {
		var deferred = $q.defer();
		$http.post('/api/category', category).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
	
	this.updateCategory = function(categoryId, category) {
		var deferred = $q.defer();
		$http.put('/api/category/' + categoryId, category).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
	
} ]);
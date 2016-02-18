app.service('AuthorService', [ '$http', '$q', function($http, $q) {
	this.getAuthors = function() {
		var deferred = $q.defer();
		$http.get('/api/author/').then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};
	
} ]);
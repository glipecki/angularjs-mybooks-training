app.service('SeriesService', [ '$http', '$q', function($http, $q) {
	this.getSeries = function() {
		var deferred = $q.defer();
		$http.get('/api/series/').then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};
	
	this.addSeria = function(seria) {
		var deferred = $q.defer();
		$http.post('/api/series', seria).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	this.updateSeria = function(seriaId, seria) {
		var deferred = $q.defer();
		$http.put('/api/series/' + seriaId, seria).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
	
} ]);
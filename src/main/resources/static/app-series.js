app = angular.module('mybooks');


app.service('SeriesService', ['$http', '$q', function($http, $q) {
	this.getSeries = function() {
		var deferred = $q.defer();
		$http.get('/api/series').then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	}
	this.getOneSeries = function(seriesId) {
		var deferred = $q.defer();
		$http.get('/api/series/' + seriesId).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.addSeries = function(series) {
		var deferred = $q.defer();
		$http.post('/api/series', series).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	};
	this.updateSeries = function(series) {
		var deferred = $q.defer();
		$http.put('/api/series/' + series.id, series).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	}
}]);

app.controller('SeriesListController', ['series', function(series) {
	this.series = series;
}]);

app.controller('AddSeriesController', ['SeriesService', '$state', function(seriesService, $state) {
	this.saveSeries = function() {
		seriesService.addSeries(this.series).then(function() {
			$state.go('series-list');
		}, function() {
			alert('Błąd dodawania serii :(');
		})
	};
	this.series = {};
}]);


app.controller('EditSeriesController', ['series', 'SeriesService', '$state', function(series, seriesService, $state) {
	this.saveSeries = function() {
		seriesService.updateSeries(this.series).then(function() {
			$state.go('series-list');
		}, function() {
			alert('Błąd edycji serii :(');
		})
	};
	this.series = series;
}]);
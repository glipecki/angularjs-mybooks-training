app.service('BookService', [ '$http', '$q', function($http, $q) {
	this.getBook = function(bookId) {
		var deferred = $q.defer();
		$http.get('/api/books/' + bookId).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	this.getBooks = function() {
		var deferred = $q.defer();
		$http.get('/api/books').then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};

	this.addBook = function(book) {
		var deferred = $q.defer();
		$http.post('/api/books', book).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};
	
	this.updateBook = function(bookId, book) {
		var deferred = $q.defer();
		$http.put('/api/books/' + bookId, book).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
} ]);

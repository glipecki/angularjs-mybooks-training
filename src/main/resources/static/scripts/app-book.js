var app = angular.module('mybooks');

app.service('BookService', ['$http', '$q', function($http, $q) {
	this.getBook = function(bookId) {
		var deferred = $q.defer();
		$http.get('/api/books/' + bookId).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.getBooks = function() {
		var deferred = $q.defer();
		$http.get('/api/books').then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.addBook = function(book) {
		var deferred = $q.defer();
		$http.post('/api/books', book).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	};
	this.updateBook = function(book) {
		var deferred = $q.defer();
		$http.put('/api/books/' + book.id, book).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	}
}]);

app.controller('BookDetailsController', ['book', function(book) {
	this.book = book;
}]);


app.controller('BookListController', ['books', function(books) {
	this.books = books;
}]);

app.controller('AddBookController', ['authors', 'series', 'categories', 'BookService', '$state', 'ngToast', function(authors, series, categories, bookService, $state, ngToast) {
	this.saveBook = function() {
		bookService.addBook(this.book).then(function() {
			$state.go('book-list');
			ngToast.success({
  				content: 'BOOK_ADDED_SUCCESS'
			});
		}, function() {
			alert('Błąd dodawania książki :(');
		})
	};
	this.resetAuthor = function() {
		this.book.author = {};
	}
	this.resetSeries = function() {
		this.book.series = {};
	}
	this.resetCategories = function() {
		this.book.categories = {};
	}
	this.authors = authors;
	this.series = series;
	this.categories = categories;
	this.book = {};
}]);

app.controller('EditBookController', ['authors', 'series', 'categories', 'book', 'BookService', '$state', function(authors, series, categories, book, bookService, $state) {
	this.saveBook = function() {
		bookService.updateBook(this.book).then(function() {
			$state.go('book-list');
		}, function() {
			alert('Błąd edycji książki :(');
		})
	};
	this.resetAuthor = function() {
		this.book.author = {};
	}
	this.resetSeries = function() {
		this.book.series = {};
	}
	this.resetCategories = function() {
		this.book.categories = {};
	}
	this.authors = authors;
	this.series = series;
	this.categories = categories;
	this.book = book;

	for (author of this.authors) {
		if (this.book.author.id === author.id) {
			this.book.author = author;
			break;
		}
	}

	for (series of this.series) {
		if (this.book.series && this.book.series.id === series.id) {
			this.book.series = series;
			break;
		}
	}
}]);

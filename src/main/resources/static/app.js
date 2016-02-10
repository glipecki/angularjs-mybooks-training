'use strict';

var app = angular.module('app', [ 'ui.router' ]);

app.service('authorService', [ '$http', '$q', function($http, $q) {
	this.getAuthors = function(bookId) {
		var deferred = $q.defer();
		$http.get('/api/author/').then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};
} ]);


app.service('bookService', [ '$http', '$q', function($http, $q) {
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
	}

	this.addBook = function(book) {
		var deferred = $q.defer();
		$http.post('/api/books', book).then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
} ]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/books");
	$stateProvider.state('book-list', {
		url : '/books',
		templateUrl : 'views/book.list.tpl.html',
		controller : 'BookListController',
		controllerAs : 'vm',
		resolve : {
			books : [ 'bookService', function(bookService) {
				return bookService.getBooks();
			} ]
		}
	});

	$stateProvider.state('book-details', {
		params : {
			id : ''
		},
		url : '/book/{id:[0-9]+}',
		templateUrl : 'views/book.details.tpl.html',
		controller : 'BookDetailsController',
		controllerAs : 'vm',
		resolve : {
			book : [ 'bookService', '$stateParams',
					function(bookService, $stateParams) {
						return bookService.getBook($stateParams.id);
					} ]
		}
	});

	$stateProvider.state('book-add', {
		url : '/add',
		templateUrl : 'views/book.edit.tpl.html',
		controller : 'BookAddController',
		controllerAs : 'vm',
		resolve : {
			authors : [ 'authorService', function(authorService) {
				console.log(authorService.getAuthors());
				return authorService.getAuthors();
			} ]
		}
	});
	
	$stateProvider.state('book-edit', {
		url : '/edit/{id:[0-9]+}',
		templateUrl : 'views/book.edit.tpl.html',
		controller : 'BookEditController',
		controllerAs : 'vm',
		resolve : {
			authors : [ 'authorService', function(authorService) {
				return authorService.getAuthors();
			} ],
			book : [ 'bookService', '$stateParams', function(bookService, $stateParams) {
				return bookService.getBook($stateParams.id);
			} ]
		}
	});

});

app.controller('BookListController', [ 'books', function(books) {
	this.books = books;
} ]);

app.controller('BookDetailsController', [ 'book', function(book) {
	this.book = book;
} ]);

app.controller('AuthorController', [ 'authors', function(authors) {
	this.authors = authors;
} ]);

app.controller('BookAddController', [ 'authors', 'bookService', '$state', '$scope', function(authors, bookService, $state, $scope) {
	this.authors = authors;
	this.book = book;
	$scope.addBook = function() {
		bookService.addBook($scope.vm.book).then(function() {
			$state.go('book-list');
		}, function() {
			alert("error");
		});
	};
} ]);

app.controller('BookEditController', [ 'authors', 'book', 'bookService', '$state', '$scope', function(authors, book, bookService, $state, $scope) {
	this.authors = authors;
	this.book = book;
} ]);
'use strict';

var app = angular.module('app', [ 'ui.router', 'ui.bootstrap' ]);

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
	
	
} ]);

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
	}
	
} ]);


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

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/books');
	$stateProvider.state('book-list', {
		url : '/books',
		templateUrl : 'views/book.list.tpl.html',
		controller : 'BookListController',
		controllerAs : 'vm',
		resolve : {
			books : [ 'BookService', function(bookService) {
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
			book : [ 'BookService', '$stateParams',
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
			authors : [ 'AuthorService', function(AuthorService) {
				return AuthorService.getAuthors();
			} ],
			categories : [ 'CategoryService', function(categoryService) {
				return categoryService.getCategories();
			} ],
			series : [ 'SeriesService', function(seriesService) {
				return seriesService.getSeries();
			} ]
		}
	});
	
	$stateProvider.state('book-edit', {
		url : '/edit/{id:[0-9]+}',
		templateUrl : 'views/book.edit.tpl.html',
		controller : 'BookEditController',
		controllerAs : 'vm',
		resolve : {
			authors : [ 'AuthorService', function(authorService) {
				return authorService.getAuthors();
			} ],
			book : [ 'BookService', '$stateParams', function(bookService, $stateParams) {
				return bookService.getBook($stateParams.id);
			} ]
		}
	});
	
	$stateProvider.state('series-list', {
		url : '/series',
		templateUrl : 'views/series.list.tpl.html',
		controller : function(series) {
			this.series = series;
		},
		controllerAs : 'vm',
		resolve : {
			series : [ 'SeriesService', function(seriesService) {
				return seriesService.getSeries();
			} ]
		}
	});
	
	$stateProvider.state('series-add', {
		url : '/seriesAdd',
		templateUrl : 'views/series.edit.tpl.html',
		controller : 'AddSeriaController',
		controllerAs : 'vm'
	});
	
	$stateProvider.state('category-list', {
		url : '/category',
		templateUrl : 'views/category.list.tpl.html',
		controller : function(categories) {
			this.categories = categories;
		},
		controllerAs : 'vm',
		resolve : {
			categories : [ 'CategoryService', function(categoryService) {
				return categoryService.getCategories();
			} ]
		}
	});
	
	$stateProvider.state('category-add', {
		url : '/categoryAdd',
		templateUrl : 'views/category.edit.tpl.html',
		controller : 'AddCategoryController',
		controllerAs : 'vm'
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

app.controller('BookAddController', [ 'authors', 'series', 'categories', 'BookService', '$state', '$scope', function(authors, series, categories, bookService, $state, $scope) {
	this.authors = authors;
	this.series = series;
	this.categories = categories;
	this.saveBook = function() {
		bookService.addBook(this.book).then(function() {
			$state.go('book-list');
		}, function() {
			alert("error");
		});
	};
	this.clearAuthor = function() {
		this.book.author = {};
	};
	this.book = {};
} ]);

app.controller('BookEditController', [ 'authors', 'book', 'BookService', '$state', '$scope', function(authors, book, bookService, $state, $scope) {
	this.authors = authors;
	this.book = book;
	
	this.clearAuthor = function() {
		this.book.author = {};
	};
	
	this.saveBook = function() {
		bookService.updateBook(this.book.id, this.book).then(function() {
			$state.go('book-list');
		}, function() {
			alert("error");
		});
	};

	for(var author of this.authors) {
		if(this.book.author.id === author.id) {
			this.book.author = author;
			break;
		}
	}
} ]);

app.controller('AddSeriaController', ['SeriesService', '$state', '$scope', function( seriesService, $state, $scope) {
	this.saveSeria = function() {
		seriesService.addSeria(this.seria).then(function() {
			$state.go('series-list');
		}, function() {
			alert("error");
		});
	};
	
	this.seria = {};
} ]);

app.controller('AddCategoryController', [ 'CategoryService', '$state', '$scope', function(categoryService, $state, $scope) {
	this.saveCategory = function() {
		categoryService.addCategory(this.category).then(function() {
			$state.go('category-list');
		}, function() {
			alert("error");
		});
	};
	
	//this.category = {};
} ]);


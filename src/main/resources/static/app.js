/**
* App module
*/
var app = angular.module('mybooks', ['ui.router']);

/**
* Services
*/

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

app.service('AuthorService', ['$http', '$q', function($http, $q) {
	this.getAuthors = function() {
		var deferred = $q.defer();
		$http.get('/api/author').then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;
	}
}]);

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
	this.getCategory = function(categoryId) {
		var deferred = $q.defer();
		$http.get('/api/category/' + categoryId).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.addCategory = function(category) {
		var deferred = $q.defer();
		$http.post('/api/category', category).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	};
	this.updateCategory = function(category) {
		var deferred = $q.defer();
		$http.put('/api/category/' + category.id, category).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	}
}]);

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


/**
* Controllers
*/
app.value('CurrentNavigationState', {});
app.run(['$rootScope', 'CurrentNavigationState', function($rootScope, currentNavigationState) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
		currentNavigationState.name = toState.name;
		currentNavigationState.params = toStateParams;
	});
}]);

app.controller('NavbarController', ['CurrentNavigationState', function(currentNavigationState) {
	this.currentNavigationState = currentNavigationState;
}]);

app.controller('BookDetailsController', ['book', function(book) {
	this.book = book;
}]);


app.controller('BookListController', ['books', function(books) {
	this.books = books;
}]);

app.controller('AddBookController', ['authors', 'BookService', '$state', function(authors, bookService, $state) {
	this.saveBook = function() {
		bookService.addBook(this.book).then(function() {
			$state.go('book-list');
		}, function() {
			alert('Błąd dodawania książki :(');
		})
	};
	this.resetAuthor = function() {
		this.book.author = {};
	}
	this.authors = authors;
	this.book = {};
}]);

app.controller('EditBookController', ['authors', 'book', 'BookService', '$state', function(authors, book, bookService, $state) {
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
	this.authors = authors;
	this.book = book;

	for (author of this.authors) {
		if (this.book.author.id === author.id) {
			this.book.author = author;
			break;
		}
	}
}]);

app.controller('CategoryDetailsController', ['category', function(category) {
	this.category = category;
}]);


app.controller('CategoryListController', ['categories', function(categories) {
	this.categories = categories;
}]);


app.controller('AddCategoryController', ['CategoryService', '$state', function(categoryService, $state) {
	this.saveCategory = function() {
		categoryService.addCategory(this.category).then(function() {
			$state.go('category-list');
		}, function() {
			alert('Błąd dodawania kategorii :(');
		})
	};
	this.category = {};
}]);


app.controller('EditCategoryController', ['category', 'CategoryService', '$state', function(category, categoryService, $state) {
	this.saveCategory = function() {
		categoryService.updateCategory(this.category).then(function() {
			$state.go('category-list');
		}, function() {
			alert('Błąd edycji kategorii :(');
		})
	};
	this.category = category;
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


app.controller('CdOverlayController', ['$rootScope', function($rootScope) {
	var ctrl = this;
	this.showSpinner = true;

	$rootScope.$on('$stateChangeStart', function() {
		ctrl.showSpinner = true;
	});
	$rootScope.$on('$stateChangeSuccess', function() {
		ctrl.showSpinner = false;
	});
	$rootScope.$on('$stateChangeError', function() {
		ctrl.showSpinner = false;
	});
}]);

app.directive('cdOverlay', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '/views/overlay.tpl.html',
		controller: 'CdOverlayController',
		controllerAs: 'vm'
	};
});

/**
* Routing
*/
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/books');
	$stateProvider.state('book-details', {
		url: '/books/{id:[0-9]+}',
		templateUrl: 'views/books/book.details.tpl.html',
		controller: 'BookDetailsController',
		controllerAs: 'vm',
		resolve: {
			book: ['BookService', '$stateParams', function(bookService, $stateParams) {
				return bookService.getBook($stateParams.id);
			}]
		}
	});
	$stateProvider.state('book-list', {
		url: '/books',
		templateUrl: 'views/books/book.list.tpl.html',
		controller: 'BookListController',
		controllerAs: 'vm',
		resolve: {
			books: ['BookService', function(bookService) {
				return bookService.getBooks();
			}]
		}
	});
	$stateProvider.state('book-add', {
		url: '/books/new',
		templateUrl: 'views/books/book.edit.tpl.html',
		controller: 'AddBookController',
		controllerAs: 'vm',
		resolve: {
			authors: ['AuthorService', function(authorService) {
				return authorService.getAuthors();
			}]
		}
	});
	$stateProvider.state('book-edit', {
		url: '/books/:id/edit',
		templateUrl: 'views/books/book.edit.tpl.html',
		controller: 'EditBookController',
		controllerAs: 'vm',
		resolve: {
			book: ['BookService', '$stateParams', function(bookService, $stateParams) {
				return bookService.getBook($stateParams.id);
			}],
			authors: ['AuthorService', function(authorService) {
				return authorService.getAuthors();
			}]
		}
	});
	$stateProvider.state('category-list', {
		url: '/categories',
		templateUrl: 'views/categories/category.list.tpl.html',
		controller: 'CategoryListController',
		controllerAs: 'vm',
		resolve: {
			categories: ['CategoryService', function(categoryService) {
				return categoryService.getCategories();
			}]
		}
	});
	$stateProvider.state('category-add', {
		url: '/category/new',
		templateUrl: 'views/categories/category.edit.tpl.html',
		controller: 'AddCategoryController',
		controllerAs: 'vm'
	});
	$stateProvider.state('category-edit', {
		url: '/categories/:id/edit',
		templateUrl: 'views/categories/category.edit.tpl.html',
		controller: 'EditCategoryController',
		controllerAs: 'vm',
		resolve: {
			category: ['CategoryService', '$stateParams', function(categoryService, $stateParams) {
				return categoryService.getCategory($stateParams.id);
			}]
		}
	});
		$stateProvider.state('series-list', {
		url: '/series',
		templateUrl: 'views/series/series.list.tpl.html',
		controller: 'SeriesListController',
		controllerAs: 'vm',
		resolve: {
			series: ['SeriesService', function(seriesService) {
				return seriesService.getSeries();
			}]
		}
	});
	$stateProvider.state('series-add', {
		url: '/series/new',
		templateUrl: 'views/series/series.edit.tpl.html',
		controller: 'AddSeriesController',
		controllerAs: 'vm'
	});
	$stateProvider.state('series-edit', {
		url: '/series/:id/edit',
		templateUrl: 'views/series/series.edit.tpl.html',
		controller: 'EditSeriesController',
		controllerAs: 'vm',
		resolve: {
			series: ['SeriesService', '$stateParams', function(seriesService, $stateParams) {
				return seriesService.getOneSeries($stateParams.id);
			}]
		}
	});
}]);

/**
* Bootstrap app
*/ 
angular.element(document).ready(function() {
	angular.bootstrap(document, ['mybooks'], {
		strictDi: true
	});
});

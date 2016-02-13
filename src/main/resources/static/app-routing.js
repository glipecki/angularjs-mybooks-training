app = angular.module('mybooks');

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

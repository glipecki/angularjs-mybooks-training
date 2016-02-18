'use strict';

var app = angular.module('app', [ 'ui.router', 'angular-growl','ngAnimate', 'pascalprecht.translate']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/books');
	$stateProvider.state('book-list', {
		url : '/books',
		templateUrl : 'views/book.list.tpl.html',
		controller : function(books) {
			this.books = books;
		},
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
		controller :  function(book) {
			this.book = book;
		},
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
		controller : 'AddBookController',
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
			} ],
			book: function() { return {}; } 
		}
	});
	
	$stateProvider.state('book-edit', {
		url : '/edit/{id:[0-9]+}',
		templateUrl : 'views/book.edit.tpl.html',
		controller : 'EditBookController',
		controllerAs : 'vm',
		resolve : {
			authors : [ 'AuthorService', function(authorService) {
				return authorService.getAuthors();
			} ],
			book : [ 'BookService', '$stateParams', function(bookService, $stateParams) {
				return bookService.getBook($stateParams.id);
			} ],
			categories : [ 'CategoryService', function(categoryService) {
				return categoryService.getCategories();
			} ],
			series : [ 'SeriesService', function(seriesService) {
				return seriesService.getSeries();
			} ]
		}
	});
	
	$stateProvider.state('series-list', {
		url : '/series',
		templateUrl : 'views/series.list.tpl.html',
		controller : 'SeriaController', 
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
		controller : 'CategoryController',
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

/**
 * Obsługa aktywności tabów
 */
app.value('CurrentNavigationState', {});
app.run(['$rootScope', 'CurrentNavigationState', function($rootScope, currentNavigationState) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
		currentNavigationState.name = toState.name;
		currentNavigationState.params = toStateParams;
	});
}]);

app.controller('NavbarController', [ 'CurrentNavigationState', function(currentNavigationState) {
	this.currentNavigationState = currentNavigationState;
} ]);

/**
 * Konfiguracja powiadomień
 */
app.config(['growlProvider', '$httpProvider', function(growlProvider, $httpProvider) {
	  growlProvider.globalInlineMessages(true);
	  growlProvider.globalTimeToLive(3000);
}]);


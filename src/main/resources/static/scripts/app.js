/**
 * App module
 */
var app = angular.module('mybooks', ['ui.router', 'pascalprecht.translate', 'ngAnimate']);

app.value('CurrentNavigationState', {});
app.run(['$rootScope', 'CurrentNavigationState', function($rootScope, currentNavigationState) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
    currentNavigationState.name = toState.name;
    currentNavigationState.params = toStateParams;
  });
}]);


/**
 * Routing
 */
app.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {
  $urlRouterProvider.otherwise('/books');
  $stateProvider.state('book-details', {
    url: '/books/{id:[0-9]+}',
    templateUrl: 'views/book.details.tpl.html',
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
    templateUrl: 'views/book.list.tpl.html',
    controller: 'BookListController',
    controllerAs: 'vm',
    resolve: {
      books: ['BookService', function(bookService) {
        return bookService.getBooks();
      }]
    }
  });
  $stateProvider.state('categories', {
    url: '/categories',
    templateUrl: 'views/categories.tpl.html',
    controller: 'CategoriesController',
    controllerAs: 'vm',
    resolve: {
      categories: ['CategoryService', function(categoryService) {
        return categoryService.getCategories();
      }]
    }
  });
  $stateProvider.state('series', {
    url: '/series',
    templateUrl: 'views/series.tpl.html',
    controller: 'SeriesController',
    controllerAs: 'vm',
    resolve: {
      series: ['SeriesService', function(seriesService) {
        return seriesService.getSeries();
      }]
    }
  });
  $stateProvider.state('book-add', {
    url: '/books/new',
    templateUrl: 'views/book.edit.tpl.html',
    controller: 'AddBookController',
    controllerAs: 'vm',
    resolve: {
      authors: ['AuthorService', function(authorService) {
        return authorService.getAuthors();
      }],
      categories: ['CategoryService', function(categoryService) {
        return categoryService.getCategories();
      }]
    }
  });
  $stateProvider.state('book-edit', {
    url: '/books/:id/edit',
    templateUrl: 'views/book.edit.tpl.html',
    controller: 'EditBookController',
    controllerAs: 'vm',
    resolve: {
      book: ['BookService', '$stateParams', function(bookService, $stateParams) {
        return bookService.getBook($stateParams.id);
      }],
      authors: ['AuthorService', function(authorService) {
        return authorService.getAuthors();
      }],
      categories: ['CategoryService', function(categoryService) {
        return categoryService.getCategories();
      }]
    }
  });
  $translateProvider.translations('pl', {
    'BOOKLIST': 'Lista książek',
    'ADDBOOK': 'Dodaj książkę',
    'LIST_CATEGORIES': 'Lista kategorii',
    'BOOKFILTER': 'Filtruj książki',
    'CATEGORIE_ADD': 'Dodaj kategorię',
    'ISBN': 'ISBN',
    'AUTHOR': 'Autor',
    'SERIES': 'Seria',
    'CATEGORIES': 'Kategorie',
    'EDIT_BOOK': 'Edytuj Książkę',
    'ADD_NEW_BOOK': 'Dodaj nową książkę',
    'NAME': 'Nazwa',
    'ADD_NEW_AUTHOR': 'Dodaj nowego autora',
    'CATEGORY': 'Kategoria',
    'AUTHOR_NAME': 'Nazwa Autora',
    'GIVE_NAME': 'Podaj Nazwę',
    'GIVE_ISBN': 'Podaj numer ISBN',
    'GIVE_SERIE': 'Podaj serię',
    'ERROR_GIVE_NAME': 'Musisz podać nazwę książki',
    'ERROR_GIVE_ISBN': 'Musisz podać poprawny numer, Tip: 9971502100',
    'ERROR_GIVE_AUTHOR': 'Musisz wybrać autora książki',
    'ADD_NEW_BOOK_SHORT': 'Dodaj książkę'
  });
  $translateProvider.translations('en', {
    'BOOKLIST': 'Books list',
    'ADDBOOK': 'Add book',
    'LIST_CATEGORIES': 'Categories list',
    'BOOKFILTER': 'Search',
    'CATEGORIE_ADD': 'Add new category',
    'ISBN': 'ISBN',
    'AUTHOR': 'Author',
    'SERIES': 'Series',
    'CATEGORIES': 'Categories',
    'EDIT_BOOK': 'Edit book',
    'ADD_NEW_BOOK': 'Add new book',
    'NAME': 'Name',
    'ADD_NEW_AUTHOR': 'Add new author',
    'CATEGORY': 'Category',
    'AUTHOR_NAME': 'Authors name',
    'GIVE_NAME': 'Type name',
    'GIVE_ISBN': 'Type ISBN number',
    'GIVE_SERIE': 'Type serie',
    'ERROR_GIVE_NAME': 'You must specify the name of the book.',
    'ERROR_GIVE_ISBN': 'You must enter a valid number., Tip: 9971502100',
    'ERROR_GIVE_AUTHOR': 'You have to choose the author of the book.',
    'ADD_NEW_BOOK_SHORT': 'Add book'
  });
  $translateProvider.preferredLanguage('pl');
}]);

/**
 * Bootstrap app
 */
angular.element(document).ready(function() {
  angular.bootstrap(document, ['mybooks'], {
    strictDi: true
  });
});

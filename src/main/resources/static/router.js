booksApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/books/list");

    $stateProvider.state('bookListState', {
        url: "/books/list",
        templateUrl: "views/book.list.tpl.html",
        controller: 'BookListController',
        controllerAs: 'vm',
        resolve: {
            bookList: ['$filter', 'booksService', 'toastr', function($filter, booksService, toastr) {
                return booksService.getBooks();
            }]
        }
    })
    .state('addBookState', {
        url: "/books/new",
        templateUrl: "views/book.edit.tpl.html",
        controller: 'BookModifyController',
        controllerAs: 'vm',
        resolve: {
            book: function() {
                return {};
            },
            authors: ['AuthorsService', function(authorsService) {
                return authorsService.getAuthors();
            }],
            categories: ['categoryService', function(categoryService) {
                return categoryService.getCategories();
            }],
            series: ['seriesService', function(seriesService) {
                return seriesService.getSeries();
            }]
        }
    })
    .state('editBookState', {
        url: "/books/{bookId:[0-9].*}/edit",
        templateUrl: "views/book.edit.tpl.html",
        controller: 'BookModifyController',
        controllerAs: 'vm',
        resolve: {
            book: ['booksService', '$stateParams', function(booksService, $stateParams) {
                return booksService.getBook($stateParams.bookId);
            }],
            authors: ['AuthorsService', function(authorsService) {
                return authorsService.getAuthors();
            }],
            categories: ['categoryService', function(categoryService) {
                return categoryService.getCategories();
            }],
            series: ['seriesService', function(seriesService) {
                return seriesService.getSeries();
            }]
        }
    })
    .state('bookDetails', {
        url: "/books/{bookId:[0-9].*}",
        templateUrl: "views/book.details.tpl.html",
        controller: 'BookDetailsController',
        controllerAs: 'vm',
        resolve: {
            book: ['booksService', '$stateParams', function(booksService, $stateParams) {
                return booksService.getBook($stateParams.bookId);
            }],
        }
    })
    .state('categoriesState', {
        url: "/categories",
        templateUrl: "views/categories.tpl.html",
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
            categories: ['categoryService', function(categoryService) {
                return categoryService.getCategories();
            }]
        }
    })
    .state('seriesState', {
        url: "/series",
        templateUrl: "views/series.tpl.html",
        controller: 'SeriesController',
        controllerAs: 'vm',
        resolve: {
            series: ['seriesService', function(seriesService) {
                return seriesService.getSeries();
            }]
        }
    })
}]);

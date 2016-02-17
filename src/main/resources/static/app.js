var app = angular.module('myBooks', ['ui.router', 'ngAnimate', 'ngMaterial', 'am.multiselect', 'pascalprecht.translate', 'ngToast'])

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myBooks']);
});

/////////////////////////////
//Navbar
/////////////////////////////
app.value('CurrentNavState', {});
app.run(['$rootScope', 'CurrentNavState', function($rootScope, currentNavigationState) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
        currentNavigationState.name = toState.name;
        currentNavigationState.params = toStateParams;
    });
}]);
app.controller('NavController', ['CurrentNavState', function(currentNavState) {
    this.currentNavState = currentNavState;
}]);

/////////////////////////////
//filter
/////////////////////////////
app.filter('map', function() {
    return function(input, propName) {
        if (angular.isUndefined(input) || input === null) {
            return '';
        } else {
            return input.map(function(item) {
                return item[propName];
            });
        }
    };
});

/////////////////////////////
//Controllers
/////////////////////////////

app.controller('BookListController', ['books', function(books) {
    this.books = books;
}]);

app.controller('BookDetailsController', ['book', '$state', '$translate', 'ngToast', function(book, $state, $translate, ngToast) {
    this.book = book;
    this.edit = function() {
        $state.go('book-edit', {
            'id': this.book.id
        });
    };

    this.changeLanguage = function() {
        $translate.use() === 'pl' ? $translate.use('en') : $translate.use('pl');
    };

}]);

app.controller('BookEditController', ['authors', 'series', 'categories', 'book', 'BookService', '$state', 'ngToast', function(authors, series, categories, book, bookService, $state, ngToast) {

    var ctrl = this;
    this.authors = authors;
    this.series = series;
    this.categories = categories;
    this.book = book;
    this.category = {};

    this.saveBook = function() {
        if ($state.current.name === 'book-add') {
            bookService.addBook(this.book).then(function() {
                $state.go('book-list');
                ngToast.create({
                    timeout: 3000,
                    content: 'Dodano nową kasiążkę: "' + ctrl.book.name + '"'
                });
            }, function() {
                alert('Wystapił błąd podczas dodawania book`a!');
            });
        } else {
            bookService.saveBook(this.book).then(function() {
                $state.go('book-details', {
                    'id': ctrl.book.id
                });
                ngToast.create({
                    timeout: 3000,
                    content: 'Zmieniono książkę: "' + ctrl.book.name + '"'
                });
            }, function() {
                alert('Wystapił błąd podczas dodawania book`a!');
            });
        }
    }

    this.addCategory = function() {
        var addToArray = true;
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name === this.category.name) {
                addToArray = false;
                ngToast.create({
                    className: 'warning',
                    timeout: 3000,
                    content: 'Kategoria "' + this.category.name + '" już istnieje!'
                });
            }
        }
        if (addToArray) {
            this.categories.push(this.category);
            ngToast.create({
                timeout: 3000,
                content: 'Zdefiniowano nową kategorię: "' + this.category.name + '"'
            });
        }
        this.category = {};
    }

    this.getTitle = function() {
        return $state.current.data.title;
    };
    this.clearAuthor = function() {
        this.book.author = {};
    };
    this.clearCategories = function() {
        this.book.categories = [];
    };
    this.clearSeries = function() {
        this.book.series = {};
    };
    if (angular.isUndefined(this.book.id) === false && this.book.id != null) {
        for (author of this.authors) {
            if (this.book.author.id === author.id) {
                this.book.author = author;
            }
        }
        for (series of this.series) {
            if (this.book.series.id === series.id) {
                this.book.series = series;
            }
        }
    }
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

/////////////////////////////
//Services
/////////////////////////////
app.service('BookService', ['$http', '$q', function($http, $q) {
    this.getBook = function(bookId) {
        var deferred = $q.defer();
        $http.get('/api/books/' + bookId).then(function(response) {
            deferred.resolve(response.data);
        }, function(errorResponse) {
            console.log(errorResponse);
            deferred.reject(errorResponse);
        });
        return deferred.promise;
    };

    this.getBooks = function() {
        var deferred = $q.defer();
        $http.get('/api/books').then(function(response) {
            deferred.resolve(response.data);
        }, function(errorResponse) {
            console.log(errorResponse);
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

    this.saveBook = function(book) {
        var deferred = $q.defer();
        $http.put('/api/books/' + book.id, book).then(function(response) {
            deferred.resolve(response.data);
        }, function(errorResponse) {
            console.log(errorResponse);
            deferred.reject(errorResponse);
        });
        return deferred.promise;
    };
}]);

app.service('AuthorService', ['$http', '$q', function($http, $q) {

    this.getAuthors = function() {
        var deferred = $q.defer();
        $http.get('/api/author').then(function(response) {
            deferred.resolve(response.data);
        }, function(errorResponse) {
            console.log(errorResponse);
            deferred.reject(errorResponse);
        });
        return deferred.promise;
    };
}]);

app.service('SeriesService', ['$http', '$q', function($http, $q) {

    this.getSeries = function() {
        var deferred = $q.defer();
        $http.get('/api/series').then(function(response) {
            deferred.resolve(response.data);
        }, function(errorResponse) {
            console.log(errorResponse);
            deferred.reject(errorResponse);
        });
        return deferred.promise;
    };
}]);

app.service('CategoryService', ['$http', '$q', function($http, $q) {

    this.getCategories = function() {
        var deferred = $q.defer();
        $http.get('/api/category').then(function(response) {
            deferred.resolve(response.data);
        }, function(errorResponse) {
            console.log(errorResponse);
            deferred.reject(errorResponse);
        });
        return deferred.promise;
    };
}]);


/////////////////////////////
//Directive
/////////////////////////////
app.directive('cdOverlay', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'views/overlay.tpl.html',
        controller: 'CdOverlayController',
        controllerAs: 'vm'
    };
});
/////////////////////////////
//Config
/////////////////////////////
app.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', 'ngToastProvider', function($stateProvider, $urlRouterProvider, $translateProvider, ngToast) {

    $urlRouterProvider.otherwise('/books');
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
    $stateProvider.state('book-add', {
        url: '/books/new',
        templateUrl: 'views/book.edit.tpl.html',
        controller: 'BookEditController',
        controllerAs: 'vm',
        resolve: {
            authors: ['AuthorService', function(authorService) {
                return authorService.getAuthors();
            }],
            series: ['SeriesService', function(seriesService) {
                return seriesService.getSeries();
            }],
            categories: ['CategoryService', function(categoryService) {
                return categoryService.getCategories();
            }],
            book: function() {
                return {};
            }
        },
        data: {
            title: 'Dodaj nową książkę'
        }
    });
    $stateProvider.state('book-edit', {
        url: '/books/edit/{id:[0-9]+}',
        templateUrl: 'views/book.edit.tpl.html',
        controller: 'BookEditController',
        controllerAs: 'vm',
        resolve: {
            authors: ['AuthorService', function(authorService) {
                return authorService.getAuthors();
            }],
            series: ['SeriesService', function(seriesService) {
                return seriesService.getSeries();
            }],
            categories: ['CategoryService', function(categoryService) {
                return categoryService.getCategories();
            }],
            book: ['BookService', '$stateParams', function(bookService, $stateParams) {
                return bookService.getBook($stateParams.id);
            }]
        },
        data: {
            title: 'Edytuj książkę'
        }
    });
    $translateProvider.translations('pl', {
        BUTTON_EDIT: 'Edytuj',
        BUTTON_LANG: 'Zmień język',
        AUTHOR: 'Autor',
        SERIES: 'Seria',
        CATEGORIES: 'Kategorie'
    });
    $translateProvider.translations('en', {
        BUTTON_EDIT: 'Edit',
        BUTTON_LANG: 'Change language',
        AUTHOR: 'Author',
        SERIES: 'Series',
        CATEGORIES: 'Categories'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    ngToast.configure({
        maxNumber: 3
    });

}]);
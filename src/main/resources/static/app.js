/**
 * App module
 */
var app = angular.module('myBooksApp', ['ui.router', 'ngResource']);

/**
 * Book service
 */
app.service('BookService', ['$http', '$q', function($http, $q) {
    this.getBooks = function() {
        var deferred = $q.defer();
        $http.get('/api/books').then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.getBook = function(id) {
        var deferred = $q.defer();
        $http.get('/api/books/' + id).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.addBook = function(book) {
        var deferred = $q.defer();
        $http.post('/api/books/', book).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.updateBook = function(id, book) {
        var deferred = $q.defer();
        $http.put('/api/books/' + id, book).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
}]);

/**
 * Author service
 */
app.service('AuthorService', ['$http', '$q', function($http, $q) {
    this.getAuthors = function() {
        var deferred = $q.defer();
        $http.get('/api/author').then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.getAuthor = function(id) {
        var deferred = $q.defer();
        $http.get('/api/author/' + id).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.addAuthor = function(author) {
        var deferred = $q.defer();
        $http.post('/api/author/', author).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
         return deferred.promise;
    };
    this.updateAuthor = function(id, author) {
        var deferred = $q.defer();
        $http.put('/api/author/' + id, author).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
}]);

/**
 * Category service
 */
app.service('CategoryService', ['$http', '$q', function($http, $q) {
    this.getCategories = function() {
        var deferred = $q.defer();
        $http.get('/api/category').then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.getCategory = function(id) {
        var deferred = $q.defer();
        $http.get('/api/category/' + id).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.addCategory = function(category) {
        var deferred = $q.defer();
        $http.post('/api/category/', category).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
         return deferred.promise;
    };
    this.updateCategory = function(id, category) {
        var deferred = $q.defer();
        $http.put('/api/category/' + id, category).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
}]);

/**
 * Series service
 */
app.service('SeriesService', ['$http', '$q', function($http, $q) {
    this.getSeries = function() {
        var deferred = $q.defer();
        $http.get('/api/series').then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.addSeries = function(series) {
        var deferred = $q.defer();
        $http.post('/api/series/', series).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
         return deferred.promise;
    };
    this.updateSeries = function(id, series) {
        var deferred = $q.defer();
        $http.put('/api/series/' + id, series).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
}]);

/**
 * Controllers
 */
app.value('CurrentNavigationState', {});
app.run(['$rootScope', 'CurrentNavigationState', function($rootScope, currentNavigationState) {
   $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams) {
    currentNavigationState.name = toState.name;
    currentNavigationState.params = toParams;
   });
}]);

app.controller('NavbarController', ['CurrentNavigationState',
    function(currentNavigationState) {
        this.currentNavigationState = currentNavigationState;
}]);

/**
 * Book list Controller
 */
app.controller('BookListController', ['books', function(books) {
   this.books = books;
}]);

/**
 * Book details Controller
 */
app.controller('BookDetailsController', ['book', function(book) {
   this.book = book;
}]);

/**
 * Add book Controller
 */
app.controller('BookAddController', ['$scope', '$state', 'authors', 'series', 'categories', 'BookService', function($scope, $state, authors, series, categories, bookService) {
    this.book = {};
    this.authors = authors;
    this.series = series;
    this.categories = categories;
    this.allBookCategories = null;
    var ctrl = this;  

    $scope.saveBook = function() {
        ctrl.book.categories = ctrl.allBookCategories;
        bookService.addBook(ctrl.book).then(function() {
            $state.go('book-list');
        }, function() {
            alert("Błąd dodawania książki!");
        });
    };
    $scope.clearAuthor = function() {
        ctrl.book.author = {};
    };
    $scope.clearSeries = function() {
        ctrl.book.series = null;
    };
    $scope.clearNewCategory = function() {
        if (!this.addCategoryChecked && isNotNull(this.newCategoryName)) {
            this.newCategoryName = null;
            ctrl.allBookCategories = angular.copy(ctrl.book.categories);
        }
    };
    
    isNotNull = function(field) {
        return (field != null && field != "");
    };

    $scope.updateCategory = function() {
        isNotNullNewCategoryName = isNotNull(this.newCategoryName);
        if (ctrl.book.categories == null && !isNotNullNewCategoryName) {
	   return;
        }
        ctrl.allBookCategories = angular.copy(ctrl.book.categories);
        if (this.addCategoryChecked && isNotNull(this.newCategoryName)) {
            if (ctrl.allBookCategories == null) {
                ctrl.allBookCategories = [];
            }
            ctrl.allBookCategories.push({"name" : this.newCategoryName});
        }
    };
}]);

/**
 * Edit book controller
 */
app.controller('BookEditController', ['$scope', '$state', 'book', 'authors', 'series', 'categories', 'BookService', function($scope, $state, book, authors, series, categories, bookService) {
    this.book = book;
    this.authors = authors;
    this.series = series;
    this.categories = categories;
    this.allBookCategories = angular.copy(this.book.categories);
    var ctrl = this;

    $scope.saveBook = function() {
        ctrl.book.categories = ctrl.allBookCategories;
        bookService.updateBook(ctrl.book.id, ctrl.book).then(function() {
            $state.go('book-details', {id: ctrl.book.id});
        }, function() {
            alert("Błąd aktualizowania książki!");
        });
    }
    $scope.clearAuthor = function() {
        ctrl.book.author = {};
    };
    $scope.clearSeries = function() {
        ctrl.book.series = null;
    };
    $scope.clearNewCategory = function() {
        if (!this.addCategoryChecked && isNotNull(this.newCategoryName)) {
            this.newCategoryName = null;
            ctrl.allBookCategories = angular.copy(ctrl.book.categories);
        }
    };
    
    isNotNull = function(field) {
        return (field != null && field != "");
    };

    $scope.updateCategory = function() {
        isNotNullNewCategoryName = isNotNull(this.newCategoryName);
        if (ctrl.book.categories == null && !isNotNullNewCategoryName) {
	   return;
        }
        ctrl.allBookCategories = angular.copy(ctrl.book.categories);
        if (this.addCategoryChecked && isNotNull(this.newCategoryName)) {
            if (ctrl.allBookCategories == null) {
                ctrl.allBookCategories = [];
            }
            ctrl.allBookCategories.push({"name" : this.newCategoryName});
        }
    };

    for (author of this.authors) {
        if (this.book.author.id === author.id) {
            this.book.author = author;
            break;
        }
    };
    for (seria of this.series) {
        if (this.book.series.id === seria.id) {
            this.book.series = seria;
            break;
        }
    };
}]);


/**
 * Category list Controller
 */
app.controller('CategoryListController', ['$scope', '$state', 'categories', 'CategoryService', function($scope, $state, categories, categoryService) {
    var ctrl = this;
    this.categories = categories;
    $scope.newField = {};
    $scope.editing = false;
    
    $scope.editCategory = function(field) {
       $scope.editing = ctrl.categories.indexOf(field);;
       $scope.newField = angular.copy(field);
    }

    $scope.saveCategory = function(field) { 
        var alreadyExists = false;
        for (category of ctrl.categories) {
            if (category.name == field.name && category.id != field.id) {
                alreadyExists = true;
                alert('Podana kategoria już istnieje!');
                break;
            }
        }
        if (!alreadyExists) {
            categoryService.updateCategory(field.id, field).then(function() {
                //location.reload(false);
            }, function() {
                alert("Błąd aktualizowania kategorii!");
            });
        } else {
            location.reload(false);
        }
    };

    $scope.cancelCategory = function() {
        if ($scope.editing !== false) {
            ctrl.categories[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }       
    };

    $scope.addCategory = function() {
        if (this.addCategoryChecked) {
            for (category of ctrl.categories) {
                if (category.name == this.newCategoryName) {
                    alert('Podana kategoria już istnieje!');
                    return;
                 }
            }
            categoryService.addCategory({"name" : this.newCategoryName}).then(function() {
                location.reload(false);
            }, function() {
                alert("Błąd dodawania kategorii!");
            });
        }
    }
}]);

/**
 * Series list Controller
 */
app.controller('SeriesListController', ['$scope', '$state', 'series', 'SeriesService', function($scope, $state, series, seriesService) {
    var ctrl = this;
    this.series = series;
    $scope.newField = {};
    $scope.editing = false;
 
    $scope.editSeries = function(field) {
       $scope.editing = ctrl.series.indexOf(field);;
       $scope.newField = angular.copy(field);
    }

    $scope.saveSeries = function(field) { 
        var alreadyExists = false;
        for (series of ctrl.series) {
            if (series.name == field.name && series.id != field.id) {
                alreadyExists = true;
                alert('Podana seria już istnieje!');
                break;
            }
        }
        if (!alreadyExists) {
            seriesService.updateSeries(field.id, field).then(function() {
            }, function() {
                alert("Błąd aktualizowania serii!");
            });
        } else {
            location.reload(false);
        }
    };

    $scope.cancelSeries = function() {
        if ($scope.editing !== false) {
            ctrl.series[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }       
    };

    $scope.addSeries = function() {
        if (this.addSeriesChecked) {
            for (series of ctrl.series) {
                if (series.name == this.newSeriesName) {
                    alert('Podana seria już istnieje!');
                    return;
                 }
            }
            seriesService.addSeries({"name" : this.newSeriesName}).then(function() {
                location.reload(false);
            }, function() {
                alert("Błąd dodawania serii!");
            });
        }
    }
}]);

/**
 * Author list Controller
 */
app.controller('AuthorListController', ['$scope', '$state', 'authors', 'AuthorService', function($scope, $state, authors, authorService) {
    var ctrl = this;
    this.authors = authors;
    $scope.newField = {};
    $scope.editing = false;
 
    $scope.editAuthor = function(field) {
       $scope.editing = ctrl.authors.indexOf(field);;
       $scope.newField = angular.copy(field);
    }

    $scope.saveAuthor = function(field) {
       var alreadyExists = false;
       for(author of ctrl.authors) {
           if (author.name == field.name && author.id != field.id) {
               alreadyExists = true;
               alert('Podany autor już istnieje!');
               break;
           }
       }
       if (!alreadyExists) {
           authorService.updateAuthor(field.id, field).then(function() {
               }, function() {
                   alert("Błąd aktualizowania autora!");
               });
       } else {
            location.reload(false);
       }
    };

    $scope.cancelAuthor = function() {
        if ($scope.editing !== false) {
            ctrl.authors[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }       
    };

    $scope.addAuthor = function() {
        if (this.addAuthorChecked) {
            for (author of ctrl.authors) {
                if (author.name == this.newAuthorName) {
                    alert('Podany autor już istnieje!');
                    return;
                 }
            }
            authorService.addAuthor({"name" : this.newAuthorName}).then(function() {
                location.reload(false);
            }, function() {
                alert("Błąd dodawania autora!");
            });
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

app.directive('cdOverlay', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'views/overlay.tpl.html',
        controller: 'CdOverlayController',
        controllerAs: 'vm'
    };
});

/**
 * Routing
 */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/books");

    $stateProvider.state('book-list', {
        url: "/books",
        templateUrl: "views/book.list.tpl.html",
        controller: 'BookListController',
        controllerAs: 'vm',
        resolve: {
            books: ['BookService', function(bookService) { return bookService.getBooks(); }]
        }
    });
    $stateProvider.state('book-add', {
        url: "/books/new",
        templateUrl: "views/book.edit.tpl.html",
        controller: 'BookAddController',
        controllerAs: 'vm',
        resolve: {
            authors: ['AuthorService', function(authorService) { return authorService.getAuthors(); }],
            series: ['SeriesService', function(seriesService) { return seriesService.getSeries(); }],
            categories: ['CategoryService', function(categoryService) { return categoryService.getCategories(); }]
        }
    });
    $stateProvider.state('book-edit', {
        url: "/books/edit/{id:[0-9]+}",
        templateUrl: "views/book.edit.tpl.html",
        controller: 'BookEditController',
        controllerAs: 'vm',
        resolve: {
            book: ['BookService', '$stateParams', function(bookService, $stateParams) { return bookService.getBook($stateParams.id); }],
            authors: ['AuthorService', function(authorService) { return authorService.getAuthors(); }],
	    series: ['SeriesService', function(seriesService) { return seriesService.getSeries(); }],
            categories: ['CategoryService', function(categoryService) { return categoryService.getCategories(); }]
        }
    });
    $stateProvider.state('book-details', {
        url: '/book/{id:[0-9]+}',
        templateUrl: "views/book.details.tpl.html",
        controller: 'BookDetailsController',
        controllerAs: 'vm',
        resolve: {
            book: ['BookService', '$stateParams', function(bookService, $stateParams) { return bookService.getBook($stateParams.id); }]
        }
    });
    $stateProvider.state('category-list', {
        url: "/categories",
        templateUrl: "views/category.list.tpl.html",
        controller: 'CategoryListController',
        controllerAs: 'vm',
        resolve: {
            categories: ['CategoryService', function(categoryService) { return categoryService.getCategories(); }]
        }
    });
    $stateProvider.state('series-list', {
        url: "/series",
        templateUrl: "views/series.list.tpl.html",
        controller: 'SeriesListController',
        controllerAs: 'vm',
        resolve: {
            series: ['SeriesService', function(seriesService) { return seriesService.getSeries(); }]
        }
    });
    $stateProvider.state('author-list', {
        url: "/authors",
        templateUrl: "views/author.list.tpl.html",
        controller: 'AuthorListController',
        controllerAs: 'vm',
        resolve: {
            authors: ['AuthorService', function(authorService) { return authorService.getAuthors(); }]
        }
    });
}]);

/**
 * Bootstrap
 */
/*angular.element(document).ready(function() {
    angular.bootstrap(document, ['myBooksApp'], {
        strictDi: true
    });
});
*/



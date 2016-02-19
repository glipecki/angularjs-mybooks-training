var myApp = angular.module('booksApp', ['ui.router', 'ngResource']);

myApp.factory("BookResource", function ($resource) {
  return $resource("/api/books/:id", null, {
      'update': { method:'PUT' }
  });
});

myApp.factory("AuthorResource", function ($resource) {
  return $resource("/api/author/:id");
});

myApp.factory("CategoryResource", function ($resource) {
  return $resource("/api/category/:id");
});

myApp.factory("SeriesResource", function ($resource) {
  return $resource("/api/series/:id");
});

myApp.service('BookService', ['BookResource', '$window', function(res, $window) {
   onFailure = function() {
       $window.alert("Błąd podczas operacji na książce");
   }
    
   this.getBooks = function() {
       return res.query();
   };
    this.addBook = function(book, onSuccess) {
        if (book.id) {
            return res.update({id : book.id}, book, onSuccess, onFailure);
        } else {
            return res.save(book, onSuccess, onFailure);
        }
    };
    this.getBook = function(id) {
        return res.get({id:id});
    };
}]);

myApp.service('SeriesService', ['SeriesResource', '$window', function(res, $window) {
   onFailure = function() {
       $window.alert("Błąd podczas operacji na serii");
   }
    
   this.getSeries = function() {
       return res.query();
   };
   this.addSerie = function(serie, onSuccess) {
       return res.save(serie, onSuccess, onFailure);
   };
}]);

myApp.service('AuthorsService', ['AuthorResource', '$window', function(res, $window) {
   onFailure = function() {
       $window.alert("Błąd podczas operacji na autorku");
   }
    
   this.getAuthors = function() {
       return res.query();
   };
   this.addAuthor = function(author, onSuccess) {
       return res.save(author, onSuccess, onFailure);
   };
}]);

myApp.value('CurrentNavigationState', {});
myApp.run(['$rootScope', 'CurrentNavigationState', function($rootScope, crNavSt8) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
        crNavSt8.name = toState.name;
        crNavSt8.params = toStateParams;
    });
}])
myApp.controller('NavbarController', ['CurrentNavigationState', function(state) {
    this.currentNavigationState = state;
}]);

myApp.controller('BookAddController', ['$scope', '$state', 'authors', 'book', 'series', 'BookService', 'AuthorsService', function($scope, $state, authors, book, series, BookService, AuthorsService) {
        this.authors = authors;
        this.book = book;
        this.series = series;
        var ref = this;
        this.addBook = function() {
            if (ref.isAddNewAuthor) {
                ref.book.author = { name:ref.typedAuthor };
                var resAddAuthor = AuthorsService.addAuthor(ref.book.author, function() {
                    // on success
                    ref.book.author = resAddAuthor;
                    BookService.addBook(ref.book, function() {
                        // success -add- book
                        $state.go('book-list');
                    });
                });
            } else {
                BookService.addBook(ref.book, function() {
                        // success -add- book
                        $state.go('book-list');
                    });
            }
        };
        this.clearAuthor = function() {
            ref.book.author = {};
        }
}]);

myApp.controller('CdOverlayController', ['$rootScope', function($rootScope) {
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

myApp.controller('CdCategoriesController', ['CategoryResource', '$scope', function(categoriesRes, $scope) {
    var ctrl = this;
    this.categories = $scope.datasource;
    this.allCategories = categoriesRes.query();
    this.addNewCategory = function() {
        cat = { name: this.typedCategoryName };
        categoriesRes.save(cat, function() {
            // on success
            ctrl.allCategories.push(cat);
            ctrl.typedCategoryName="";
        }, function() {
            // on failure
        })
    };
    this.addSelectedCategory = function() {
        var ctrlCategories = ctrl.categories;
        ctrl.selectedCategory.forEach(function (cat) {
            found = 0;
            for(var i = ctrlCategories.length-1; i>=0; i--) {
	           if (ctrlCategories[i].id === cat.id) {
                 found = 1;
                 break;
               }
            }
            if (found==0) {
                ctrlCategories.push(cat);
            }
        });
    };
    
    this.removeSelectedCategory = function() {
        var ctrlCategories = ctrl.categories;
        ctrl.selectedCategory.forEach(function (cat) {
            for(var i = ctrlCategories.length-1; i>=0; i--) {
	           if (ctrlCategories[i].id === cat.id) {
                 ctrlCategories.splice(i, 1);
               }
            }

        });
        
    }
            

}]);

var ISBN_REGEXP = /^((978|979)-)?\d+-\d+-\d+-[0-9X]$/i;
var ISBN_13_START_REGEXP = /^(978|979)-\d+-\d+-\d+-[0-9X]$/i;
// pozytywny np. 0-306-40615-2
myApp.directive('isbnInput', function() {
   return {
       require: 'ngModel',
       link: function(scope, elm, attrs, ctrl) {
           ctrl.$validators.isbnInput = function(modelValue, viewValue) {
               if (!ISBN_REGEXP.test(viewValue)) {
                   return false;
               }
               digits = [];
               for(i=0;i<viewValue.length;i++) {
                   char = viewValue.charCodeAt(i);
                   if (char>=48 && char<=57) {
                       digits.push(char-48);
                   }
                   if (viewValue.charAt(i)=='X') {
                       digits.push(11);
                   }
               }
               if (digits.length==10) {
                   // 2006 -
                   chksum = 0;
                   for(c=0;c<9;c++) {
                       chksum+=(c+1)*digits[c];
                   }
                   chksum %= 11;
                   if (chksum==digits[9]) {
                       return true;
                   }
               }
               if (digits.length==13) {
                   // 2006 +
                   chksum = 0;
                   for(c=0;c<12;c++) {
                       waga = 1;
                       if (c % 2 == 1) {
                           waga = 3;
                       }
                       chksum+=waga*digits[c];
                   }
                   chksum = 10 - chksum % 10;
                   if (chksum==digits[12]) {
                       return true;
                   }
               }
               return false;
           }
       }
   };
});

myApp.directive('cdOverlay', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'views/overlay.tpl.html',
        controller: 'CdOverlayController',
        controllerAs: 'vm'
    };
});

myApp.directive('cdCategories', function() {
    return {
        restrict: 'AE',
        scope: {
            datasource: '='
        },
        replace: true,
        templateUrl: 'views/categories.tpl.html',
        controller: 'CdCategoriesController',
        controllerAs: 'vmc'
    };
});

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/books");
  $stateProvider
    .state('book-list', {
      url: "/books",
      templateUrl: "views/book.list.tpl.html",
      controller: function(books) {
        this.books = books;
      },
      controllerAs: 'vm',
      resolve: {
        books: ['BookService', function(bookService) { return bookService.getBooks(); }]
      }
      })
    .state('book-edit', {
      url: "/bookedit/{id:[0-9]+}",
      templateUrl: "views/book.edit.tpl.html",
      controller: 'BookAddController',
      controllerAs: 'vm',
      resolve: {
        authors: ['AuthorsService', function(authorService) { return authorService.getAuthors(); }], 
        series: ['SeriesService', function(seriesService) { return seriesService.getSeries(); }], 
        book: ['BookService', '$stateParams', function(bookService, $stateParams) { return bookService.getBook($stateParams.id); }]
      }
    })
    .state('book-add', {
      url: "/bookedit",
      templateUrl: "views/book.edit.tpl.html",
      controller: 'BookAddController',
      controllerAs: 'vm',
      resolve: {
        authors: ['AuthorsService', function(authorService) { return authorService.getAuthors(); }],
        series: ['SeriesService', function(seriesService) { return seriesService.getSeries(); }], 
        book: function() { return { author: {}, categories: [] }; }
          
      }
    })
    .state('book-details', {
      url: '/books/{id:[0-9]+}',
      templateUrl: "views/book.details.tpl.html",
      controller: function(book) {
        this.book = book;
      },
      controllerAs: 'vm',
      resolve: {
        book: ['BookService', '$stateParams', function(bookService, $stateParams) { return bookService.getBook($stateParams.id); }]
      }
    })

    });

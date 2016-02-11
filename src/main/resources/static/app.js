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

myApp.controller('BookAddController', function($scope, $state, authors, book, BookService, AuthorsService) {
        this.authors = authors;
        this.book = book;
        var ref = this;
        $scope.addBook = function() {
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
        }
        $scope.clearAuthor = function() {
            ref.book.author = {};
        }
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
        book: function() { return {}; }
          
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

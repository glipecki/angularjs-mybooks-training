var myApp = angular.module('booksApp', ['ui.router', 'ngResource']);

myApp.factory("BookResource", function ($resource) {
  return $resource("/api/books/:id");
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
        return res.save(book, onSuccess, onFailure);
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


myApp.controller('BookAddController', function($scope, $state, authors, BookService, AuthorsService) {
        this.authors = authors;
        $scope.addBook = function() {
            if ($scope.vm.isAddNewAuthor) {
                $scope.vm.book.author = { name:$scope.vm.typedAuthor };
                AuthorsService.addAuthor($scope.vm.book.author, function() {
                    // on success
                    BookService.addBook($scope.vm.book, function() {
                        // success -add- book
                        $state.go('book-list');
                    });
                });
            } else {
                BookService.addBook($scope.vm.book, function() {
                        // success -add- book
                        $state.go('book-list');
                    });
            }
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
      controller: function($stateParams) {
        console.log($stateParams.id);
        }
    })
    .state('book-add', {
      url: "/bookedit",
      templateUrl: "views/book.edit.tpl.html",
      controller: 'BookAddController',
      controllerAs: 'vm',
      resolve: {
        authors: ['AuthorsService', function(authorService) { return authorService.getAuthors(); }]
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

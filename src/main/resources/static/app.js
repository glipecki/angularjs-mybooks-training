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

myApp.service('BookService', ['BookResource', function(res) {
   this.getBooks = function() {
       return res.query();
   };
    this.addBook = function(book) {
        res.save(book);
    };
    this.getBook = function(id) {
        res.get(id);
    };
}]);

myApp.service('AuthorsService', ['AuthorResource', function(res) {
   this.getAuthors = function() {
       return res.query();
   };
}]);


myApp.controller('BookAddController', function($scope, authors, BookService, AuthorsService) {
        this.authors = authors;
        $scope.addBook = function() {
            if (this.vm.isAddNewAuthor) {
                this.vm.book.author.id=null;
                this.vm.book.author.name=this.vm.typedAuthor;
                // TODO AuthorsService.addAuthor()
            }
            BookService.addBook(this.vm.book);
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
      controller: function($stateParams) {
        console.log($stateParams.id);
    }
    })

    });

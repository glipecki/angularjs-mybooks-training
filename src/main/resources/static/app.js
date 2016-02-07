var myApp = angular.module('booksApp', ['ui.router', 'ngResource']);

myApp.factory("BookResource", function($resource) {
  return $resource("/api/books/:id");
});

myApp.service('BookService', ['BookResource', function(res) {
   this.getBooks = function() {
      /*return [{id: 1, title: "baaaa", author: "bJohn" },
        {id: 2, title: "bbbbb", author: "bRambo" },
        {id: 3, title: "bcccc", author: "bBleh" } ];*/
       return res.query();
   };
}]);

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
    .state('book-details', {
      url: '/books/{id:[0-9]+}',
      templateUrl: "views/book.details.tpl.html",
      controller: function($stateParams) {
        console.log($stateParams.id);
    }
    })

    });

var myApp = angular.module('booksApp', ['ui.router']);


myApp.controller('BookListController',
    function() {
        this.books = [{id: 1, title: "aaaa", author: "John" },
        {id: 2, title: "bbbb", author: "Rambo" },
        {id: 3, title: "cccc", author: "Bleh" } ];
    }
);

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/books");
  $stateProvider
    .state('book-list', {
      url: "/books",
      templateUrl: "views/book.list.tpl.html"
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

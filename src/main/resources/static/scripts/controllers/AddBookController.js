/**
 * Controller
 * Obsługuje dodawanie książki
 */

app.controller('AddBookController', ['authors', 'BookService', '$state', 'AlertService', 'IsbnValidatorService', 'categories', function(authors, bookService, $state, alertService, isbnValidatorService, categories) {
  this.saveBook = function() {
    this.book.categories = [{id: this.book.categories[0].id, name: this.book.categories[0].name}];
    bookService.addBook(this.book).then(function() {
      alertService.addSuccess();
      $state.go('book-list');
    }, function() {
      alertService.addOrEditError();
    });
  };
  this.validIsbn = function(subject) {
    return isbnValidatorService.validIsbn(subject);
  };
  this.resetAuthor = function() {
    this.book.author = {};
  };
  this.categories = categories;
  this.authors = authors;
  this.book = {};
  this.category = "";

}]);

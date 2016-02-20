/**
 * Controller
 * Obsługuje edytowanie książki
 */

app.controller('EditBookController', ['book', 'authors', 'BookService', '$state', 'AlertService', 'IsbnValidatorService', 'categories', function(book, authors, bookService, $state, alertService, isbnValidatorService, categories) {
  var ctrl = this;
  this.resetAuthor = function() {
      this.book.author = {};
  };
  this.saveBook = function() {
    bookService.updateBook(this.book.id, this.book).then(function() {
      alertService.editSuccess();
      $state.go('book-details', {id: ctrl.book.id});
    }, function() {
      alertService.addOrEditError();
    });
  };
  this.validIsbn = function(subject) {
    return isbnValidatorService.validIsbn(subject);
  };
  this.authors = authors;
  this.categories = categories;
  this.book = book;
  for (category of this.categories){
    if(book.categories[0].id === category.id) {
      book.categories[0] = category;
      break;
    }
  }
  for (author of this.authors) {
    if (this.book.author.id === author.id) {
        this.book.author = author;
        break;
    }
  }


}]);

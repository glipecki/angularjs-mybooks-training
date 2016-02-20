/**
 * Controller
 * Obsługuje wyświetlanie informacji o wybranej książce
 */

app.controller('BookDetailsController', ['book', '$state', function(book, $state) {
  this.book = book;
  this.editBook = function() {
    $state.go('book-edit', {id: this.book.id});
  };
}]);

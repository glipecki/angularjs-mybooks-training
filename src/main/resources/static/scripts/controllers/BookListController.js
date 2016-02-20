/**
 * Controller
 * Obsługuje wyświetlanie listy pozycji
 */

app.controller('BookListController', ['books', function(books) {
  this.books = books;
}]);

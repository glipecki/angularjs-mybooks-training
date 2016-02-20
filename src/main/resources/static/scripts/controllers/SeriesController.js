/**
 * Controller
 * Obsługuje wyświetlanie listy serii
 */

app.controller('SeriesController', ['series', function(series) {
  this.series = series;
}]);

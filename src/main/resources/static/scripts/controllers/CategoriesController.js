/**
 * Controller
 * Obsługuje wyświetlanie listy kategorii
 */

app.controller('CategoriesController', ['categories', 'CategoryService', '$state', function(categories, categoryService, $state) {
  this.categories = categories;
  this.newCategory = function() {
    swal({
      title: "Nowa Kategoria",
      text: "Wprowadź nazwę nowej kategorii",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "pop",
      inputPlaceholder: "wpisz kategorię..."
    }, function(inputValue) {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("Wpisz coś");
        return false;
      }
      swal("Nieźle", "Powstała nowa kategoria " + inputValue, "success");
      categoryService.addCategory(inputValue);
      return true;
    });
    $state.go('categories');
  };

}]);

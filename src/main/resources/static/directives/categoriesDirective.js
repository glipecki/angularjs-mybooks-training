/*
 * Dyrektywa obsługująca wielowybór kategorii podczas dodawania/edycji książki
 */
app.directive('multiChoiceCategory', function () {
    return {
        scope: {
            allcategories: '=', //Two-way data binding
            book: '='
        },
        templateUrl: 'views/category.directive.tpl.html',
        controller: 'MultiChoiceCategoryController',
        controllerAs: 'vmc',
		resolve : {
			categories : [ 'CategoryService', function(categoryService) {
				return categoryService.getCategories();
			} ]
		}
    };
});

app.controller('MultiChoiceCategoryController', ['growl','$scope', function(growl, $scope) {
	this.categories = $scope.allcategories;
	this.book = $scope.book;
	var selectedCategory = null;
	
	if(this.book.categories == null) {
		this.book.categories = [];
	}
	
	this.addBookCategory = function () {
		if(this.selectedCategory == null) {
			return;
		}
		for(var cat of this.book.categories) {
			if(typeof cat === "undefined") {
				return;
			} else if(cat.id === this.selectedCategory.id) {
				// wysłanie powiadomienia w przypadku próby dodania istniejącej katgorii
				// dla danej książki
				growl.error("Podana kategoria została już dodana!",{title: 'Błąd!'});
				return;
			}
		}
		this.book.categories.push(this.selectedCategory);
	};

	this.resetBookCategory = function () {
		this.book.categories = [];
		this.selectedCategory = null;
	};
}]);
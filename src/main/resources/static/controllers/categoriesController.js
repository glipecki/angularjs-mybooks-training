/*
 * Kontroler zarządzający kategoriami książki
 */
app.controller('CategoryController', [ 'growl', 'CategoryService', 'categories', '$state', function(growl, categoryService, categories, $state) {
	this.categories = categories;
	this.saveCategory = function() {
		if(this.validateCategories(this.addNewItem)) {
			this.category.name =  this.addNewItem;
			categoryService.addCategory(this.category).then(function() {
				$state.go('category-list', {}, { reload: true });
			}, function() {
				alert("Ups, coś poszło nie tak!");
			});
		}
	};
	
	this.validateCategories = function(name) {
		if(this.categories != null) {
			for(var category of this.categories) {
				if(name === category.name) {
					growl.error("Podana kategoria już istnieje!",{title: 'Błąd!'});
					return false;
				}
			}
		}
		return true;
	}
	
	this.showInput = function(id) {
		return this.categoryId === id;
	};
	
	this.startEditItem = function(item) {
		this.category = item;
		this.categoryId = item.id;
		this.editCategoryName = item.name;
	};
	
	this.cancelEditItem = function() {
		this.category = {};
		this.categoryId = 0;
		this.editCategoryName = "";
	};
	
	this.updateItem = function() {
		if(this.validateCategories(this.editCategoryName)) {
			this.category.name = this.editCategoryName;
			categoryService.updateCategory(this.category.id, this.category).then(function() {
				$state.go('category-list', {}, { reload: true });
			}, function() {
				alert("Ups, coś poszło nie tak!");
			});
		}
	};
	
	this.category = {};
} ]);

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
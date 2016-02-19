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
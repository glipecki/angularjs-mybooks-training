var app = angular.module('mybooks');

app.service('CategoryService', ['$http', '$q', function($http, $q) {
	this.getCategories = function() {
		var deferred = $q.defer();
		$http.get('/api/category').then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;
	};
	this.getCategory = function(categoryId) {
		var deferred = $q.defer();
		$http.get('/api/category/' + categoryId).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.addCategory = function(category) {
		var deferred = $q.defer();
		$http.post('/api/category', category).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	};
	this.updateCategory = function(category) {
		var deferred = $q.defer();
		$http.put('/api/category/' + category.id, category).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	}
}]);

app.controller('CategoryDetailsController', ['category', function(category) {
	this.category = category;
}]);


app.controller('CategoryListController', ['categories', function(categories) {
	this.categories = categories;
}]);


app.controller('AddCategoryController', ['CategoryService', '$state',  'ngToast', function(categoryService, $state, ngToast) {
	this.saveCategory = function() {
		categoryService.addCategory(this.category).then(function() {
			$state.go('category-list');
			ngToast.success({
  				content: 'CATEGORY_ADD_SUCCESS'
			});
		}, function() {
			ngToast.danger({
  				content: 'CATEGORY_EDIT_ERROR'
			});
		})
	};
	this.category = {};
}]);


app.controller('EditCategoryController', ['category', 'CategoryService', '$state', 'ngToast', function(category, categoryService, $state, ngToast) {
	this.saveCategory = function() {
		categoryService.updateCategory(this.category).then(function() {
			$state.go('category-list');
			ngToast.success({
  				content: 'CATEGORY_EDIT_SUCCESS'
			});
		}, function() {
			ngToast.danger({
  				content: 'CATEGORY_EDIT_ERROR'
			});
		})
	};
	this.category = category;
}]);
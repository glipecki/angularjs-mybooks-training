booksApp.controller('CategoriesController', ['$scope', '$filter', 'categoryService', 'categories', 'toastr',
                                    function($scope, $filter, categoryService, categories, toastr) {

    $scope.addNewCategory = function()  {
        categoryService.addNewCategory({name: this.newCategoryName})
            .then(function(response) {
                $scope.categories.push(response);
                $scope.newCategoryName =  '';
                toastr.success($filter('translate')('CATEGORY_SAVED'));
            }, function(reason) {
                toastr.error($filter('translate')('CATEGORY_SAVE_ERROR'));
            }
        );
    },

    $scope.changeCategoryName = function() {
        if(this.editingElement >= 0  && this.editingElementValue) {
            var oldName = categories[this.editingElement].name;
            categories[this.editingElement].name = this.editingElementValue;
            categoryService.updateCategory(categories[this.editingElement]).then(function(response) {
                    toastr.success($filter('translate')('CATEGORY_UPDATED'));
                }, function(reason) {
                    categories[this.editingElement].name = oldName;
                    toastr.error($filter('translate')('CATEGORY_UPDATE_ERROR'));
                }
            );
        }
        this.editingElement = -1;
        this.editingElementValue = '';
    },

    $scope.changeEditingElement = function(index) {
        this.editingElement = index;
        this.editingElementValue = this.categories[index].name;
    },

    $scope.editingElementValue = '';
    $scope.editingElement = -1;
    $scope.newCategoryName = '';
    $scope.categories = categories;

}]);

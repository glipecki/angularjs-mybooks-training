describe('AddCategoryController', function() {
	var $controller;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(_$controller_, _CategoryService_) {
		$controller = _$controller_;
		categoryService = _CategoryService_;
	}));

	it('should add category via category service', function() {
		// given
		categoryServiceMock = {
			lastAddedCategory: null,
			addCategory: function(categoryToAdd) {
				this.lastAddedCategory = categoryToAdd;
				return { then: function() {}};
			}
		};

		addCategoryController = $controller('AddCategoryController', {
			CategoryService: categoryServiceMock
		});
		expectedCategory = {};

		// when
		addCategoryController.category = expectedCategory;
		addCategoryController.saveCategory();

		// then
		expect(categoryServiceMock.lastAddedCategory).not.toBeNull();
		expect(categoryServiceMock.lastAddedCategory).toBe(expectedCategory);

	});

	it('should add category via category service with data', function() {
		// given
		addCategoryController = $controller('AddCategoryController');
		expectedCategory = {
			name: 'Cat1'};
		spyOn(categoryService, 'addCategory').and.returnValue({ then: function() {} });

		// when
		addCategoryController.category = expectedCategory;
		addCategoryController.saveCategory();

		// then
		expect(categoryService.addCategory).toHaveBeenCalledWith(expectedCategory);
	});
});
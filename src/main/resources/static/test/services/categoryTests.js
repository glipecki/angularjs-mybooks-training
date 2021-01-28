describe('CategoryService', function() {

	var categoryService, $httpBackend, $rootScope;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(CategoryService, _$httpBackend_, _$rootScope_) {
		categoryService = CategoryService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
	}));

	it('should return promise as result', function() {
		// when
		response = categoryService.getCategory(1);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	});

	it('should get category', function() {
		// prepare mocks
		$httpBackend.when('GET', '/api/category/1').respond(200, {id: 1, name: 'Fantastyka'});

		// when
		responsePromise = categoryService.getCategory(1);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Fantastyka');
			expect(response.id).toEqual(1);
		});

		// flush pending operations
		$httpBackend.flush();
	});

	it('should return promise when posting a category', function() {
		// given
		var category = { name : 'Category 1'};

		// then
		response = categoryService.addCategory(category);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
		
	});


	it('should post a category', function() {
		// prepare mocks
		var category;
		$httpBackend.when('POST', '/api/category').respond(201, {id: 1, name: 'Cat1'});

		// when
		responsePromise = categoryService.addCategory(category);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Cat1');
			expect(response.id).toEqual(1);
		});

		// flush pending operations
		$httpBackend.flush();
	});

	it('should return promise when putting a category', function() {
		// given
		var category = { name : 'Cat 1' };

		// then
		response = categoryService.updateCategory(category);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	});

	it('should put a category', function() {
		// prepare mocks
		var category = { name : 'Cat 3', id: 3};
		$httpBackend.when('PUT', '/api/category/3').respond(200, {id: 1, name: 'Cat3'});

		// when
		responsePromise = categoryService.updateCategory(category);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Cat3');
		});

		// flush pending operations
		$httpBackend.flush();
	});

});

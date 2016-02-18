describe('Warmup tests', function() {
	it('should assert truthy', function() {
		expect(true).toBeTruthy();
	})
});

describe('CategoryService', function() {
	var categoryService, $httpBackend, $rootScope;
	
	beforeEach(module('app'));
	
	beforeEach(inject(function(CategoryService, _$httpBackend_, _$rootScope_) {
		categoryService = CategoryService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		
	}));
	
	it('[get categories] should return promisse as result', function() {
		response = categoryService.getCategories();
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('[add category] should return promisse as result', function() {
		response = categoryService.addCategory();
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('[update category] should return promisse as result', function() {
		response = categoryService.updateCategory(1);
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('should get list of series', function() {
		$httpBackend.when('GET', '/api/category/').respond(200, [{ id: 1, name: 'Category 1'}, { id: 2, name: 'Category 2'}]);
		
		responsePromise = categoryService.getCategories();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response[0].name).toBe('Category 1');
			expect(response[1].name).toBe('Category 2');
		});
		
		$httpBackend.flush();
	});
	
	
	it('should add category', function() {
		$httpBackend.when('POST', '/api/category').respond(200, {id: 1, name: 'Category 1'});
		
		responsePromise = categoryService.addCategory();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Category 1');
		});
		
		$httpBackend.flush();
	});
	
	it('should edit category', function() {
		$httpBackend.when('PUT', '/api/category/' + '1',{id: 1, name: 'Category 1'}).respond(200, {id: 1, name: 'Category 1'});
		responsePromise = categoryService.updateCategory(1, {id: 1, name: 'Category 1'});
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Category 1');
		});
		
		$httpBackend.flush();
	});
});
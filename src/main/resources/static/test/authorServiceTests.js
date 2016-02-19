describe('Warmup tests', function() {
	it('should assert truthy', function() {
		expect(true).toBeTruthy();
	})
});

describe('AuthorService', function() {
	var authorService, $httpBackend, $rootScope;
	
	beforeEach(module('app'));
	
	beforeEach(inject(function(AuthorService, _$httpBackend_, _$rootScope_) {
		authorService = AuthorService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		
	}));
	
	it('[get authors] should return promisse as result', function() {
		response = authorService.getAuthors();
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('should get list of authors', function() {
		$httpBackend.when('GET', '/api/author/').respond(200, [{ id: 1, name: 'Author 1'}, { id: 2, name: 'Author 2'}]);
		
		responsePromise = authorService.getAuthors();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response[0].name).toBe('Author 1');
			expect(response[1].name).toBe('Author 2');
		});
		
		$httpBackend.flush();
	});
});
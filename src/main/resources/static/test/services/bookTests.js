describe('BookService', function() {

	var bookService, $httpBackend, $rootScope;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(BookService, _$httpBackend_, _$rootScope_) {
		bookService = BookService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
	}));

	it('should return promise as result', function() {
		// when
		response = bookService.getBook(1);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	});

	it('should get book', function() {
		// prepare mocks
		$httpBackend.when('GET', '/api/books/1').respond(200, {id: 1, name: 'Hello'});

		// when
		responsePromise = bookService.getBook(1);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Hello');
		});

		// flush pending operations
		$httpBackend.flush();
	});

	it('should return promise when posting a book', function() {
		// given
		book = { name : 'Book 1', author : { name: 'Author 1'}, isbn: '45634564576' };

		// then
		response = bookService.addBook(book);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
		
	});


	it('should post a book', function() {
		// prepare mocks
		var book;
		$httpBackend.when('POST', '/api/books').respond(201, {id: 1, name: 'Hello'});

		// when
		responsePromise = bookService.addBook(book);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Hello');
		});

		// flush pending operations
		$httpBackend.flush();
	});

	it('should return promise when putting a book', function() {
		// given
		var book = { name : 'Book 1', author : { name: 'Author 1'}, isbn: '45634564576' };

		// then
		response = bookService.updateBook(book);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	});

	it('should put a book', function() {
		// prepare mocks
		var book = { name : 'Book 3', id: 3, author : { name: 'Author 1'}, isbn: '45634564576' };
		$httpBackend.when('PUT', '/api/books/3').respond(200, {id: 1, name: 'Hello'});

		// when
		responsePromise = bookService.updateBook(book);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Hello');
		});

		// flush pending operations
		$httpBackend.flush();
	});

});

describe('filterNameOrAuthorName', function() {

	var $filter;

	beforeEach(function() {
		module('mybooks');

		inject(function(_$filter_) {
			$filter = _$filter_;
		});	
	});

	it('should filter a list', function() {
		// given
		var list = [{name : 'S', author: {name: 'Basia'}}, {name : 'Aba', author: {name: 'Zaaab'}}];

		// when
		var result = $filter('filterNameOrAuthorName')(list, 'ba');
		
		// then
		expect(result).not.toBeNull();
		expect(result.length).toBe(2);
		expect(result[0].name).toBe('S');
		expect(result[1].name).toBe('Aba');
	});

	it('should return result when uppercase', function() {
		// given
		var list = [{name : '1', author: {name: 'za'}}, {name : '3', author: {name: 'ZA'}}];

		// when
		var result = $filter('filterNameOrAuthorName')(list, 'za');
		
		// then
		expect(result).not.toBeNull();
		expect(result.length).toBe(2);
		expect(result[0].name).toBe('1');
		expect(result[1].name).toBe('3');
	});

	it('should filter list with numbers', function() {
		// given
		var list = [{name : '1', author: {name: 'za'}}, {name : '3', author: {name: 'ZA'}}];

		// when
		var result = $filter('filterNameOrAuthorName')(list, '1');
		
		// then
		expect(result).not.toBeNull();
		expect(result.length).toBe(1);
		expect(result[0].name).toBe('1');
	});

	it('should return empty list when no list', function() {
		// given
		var list = [];

		// when
		var result = $filter('filterNameOrAuthorName')(list, '');
		
		// then
		expect(result).not.toBeNull();
		expect(result.length).toBe(0);
	});

	it('should return full list when empty query', function() {
		// given
		var list = [{name : 'S', author: {name: 'Basia'}}, {name : 'Aba', author: {name: 'Zaaab'}}];

		// when
		var result = $filter('filterNameOrAuthorName')(list, '');
		
		// then
		expect(result).not.toBeNull();
		expect(result.length).toBe(2);
		expect(result[0].name).toBe('S');
		expect(result[1].name).toBe('Aba');
	});
});

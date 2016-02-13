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


});
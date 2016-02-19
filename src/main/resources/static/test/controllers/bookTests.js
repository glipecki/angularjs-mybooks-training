describe('AddBookController', function() {
	var $controller;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(_$controller_, _BookService_, _BookCategoriesService_) {
		$controller = _$controller_;
		bookService = _BookService_;
		bookCategoriesService = _BookCategoriesService_;
	}));

	it('should add book via books service', function() {
		// given
		bookServiceMock = {
			lastAddedBook: null,
			addBook: function(bookToAdd) {
				this.lastAddedBook = bookToAdd;
				return { then: function() {}};
			}
		};

		addBookController = $controller('AddBookController', {
			authors: [],
			series: [],
			categories: [],
			BookService: bookServiceMock
		});
		expectedBook = {};

		// when
		addBookController.book = expectedBook;
		addBookController.saveBook();

		// then
		expect(bookServiceMock.lastAddedBook).not.toBeNull();
		expect(bookServiceMock.lastAddedBook).toBe(expectedBook);

	});

	it('should add book via books service with data', function() {
		// given
		addBookController = $controller('AddBookController', {
			authors: [],
			series: [],
			categories: []
		});
		expectedBook = {
			name: 'Book1',
			author: { id : 1, name: 'author 1'},
			series: { name: 'New series'},
			categories: [{name: 's', id: 1}]};
		spyOn(bookService, 'addBook').and.returnValue({ then: function() {} });

		// when
		addBookController.book = expectedBook;
		addBookController.saveBook();

		// then
		expect(bookService.addBook).toHaveBeenCalledWith(expectedBook, []);
	});

	it('should add book via books service with new and old categories', function() {
		// given
		addBookController = $controller('AddBookController', {
			authors: [],
			series: [],
			categories: []
		});
		expectedBook = { categories: [{name: 's', id: 1}]};
		spyOn(bookCategoriesService, 'addCategory').and.callThrough();
		spyOn(bookCategoriesService, 'toggleCategory').and.callThrough();
		spyOn(bookService, 'addBook').and.returnValue({ then: function() {} });

		// when
		addBookController.book = expectedBook;
		addBookController.toggleCategory({name: 's', id: 1});
		addBookController.toggleCategory({name: 't', id: 2});
		addBookController.toggleCategory({name: 's', id: 1});
		addBookController.addCategory({name: 'a'});
		addBookController.addCategory({name: 'b'});
		addBookController.saveBook();

		// then
		expect(bookService.addBook).toHaveBeenCalledWith(expectedBook,  [ { name: 'a'}, {name: 'b'}]);
	});
});
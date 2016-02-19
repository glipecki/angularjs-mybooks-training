
describe('BookCategoriesService', function() {

	var bookCategoriesService, $rootScope;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(BookCategoriesService, _$rootScope_) {
		bookCategoriesService = BookCategoriesService;
		$rootScope = _$rootScope_;
	}));


	it('should return a book category if exists', function() {
		// given
		var book = {
			name : 'Book 3',
			id: 3,
			author :{
				name: 'Author 1'
			},
			isbn: '45634564576',
			categories: [
			{name: 'Kat1', 'id': 1},
			{name: 'Kat7', 'id': 2}

			]
		};
		var category = {name: 'Kat1', 'id': 1};

		// when
		var response = bookCategoriesService.getBookCategory(book, category);

		// then
		expect(response).not.toBeNull();
		expect(response.name).toBe('Kat1');
		expect(response.id).toBe(1);
	});

	it('should not return a book category if category does not exist', function() {
		// given
		var book = {
			name : 'Book 3',
			id: 3,
			author :{
				name: 'Author 1'
			},
			isbn: '45634564576',
			categories: [
			{name: 'Kat1', 'id': 1},
			{name: 'Kat7', 'id': 2}

			]
		};

		var category = {name: 'Kat2'};

		// when
		var response = bookCategoriesService.getBookCategory(book, category);

		// then
		expect(response).toBeUndefined();

	});

	it('should not return a book category if no categories', function() {
		// given
		var book = {
			name : 'Book 3',
			id: 3,
			author :{
				name: 'Author 1'
			},
			isbn: '45634564576'
		};

		var category = {name: 'Kat1', 'id': 1};


		// when
		var response = bookCategoriesService.getBookCategory(book, category);
		
		// then
		expect(response).toBeUndefined();

	});

	it('should add a book category if category is not in the list', function() {
		// given
		var book = {
			name : 'Book 3',
			id: 3,
			author :{
				name: 'Author 1'
			},
			isbn: '45634564576',
			categories: []
		};

		var category = {name: 'Kat1', 'id': 1};


		// when
		bookCategoriesService.toggleCategory(book, category);		
		var response = bookCategoriesService.isExistingCategoryInBook(book, category);

		// then
		expect(response).toBeTruthy();

	});

	it('should remove a book category if category is not in the list', function() {
		// given
		var book = {
			name : 'Book 3',
			id: 3,
			author :{
				name: 'Author 1'
			},
			isbn: '45634564576',
			categories: [ {name: 'Kat1', id: 1}]
		};

		var category = {name: 'Kat1', 'id': 1};


		// when
		bookCategoriesService.toggleCategory(book, category);		
		var response = bookCategoriesService.isExistingCategoryInBook(book, category);

		// then
		expect(response).toBeFalsy();

	});

});
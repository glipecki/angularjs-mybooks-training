describe('Warmup tests', function() {

    it('should assert truthy', function() {
        expect(true).toBeTruthy();
    })
});

describe('AddBookController', function() {

    var $controller;

    beforeEach(module('app'), []);

    beforeEach(inject(function(_$controller_, _BookService_) {
        $controller = _$controller_;
        bookService = _BookService_;
        addBookController = $controller('AddBookController', {
            authors: [],
            book: {},
            categories: [],
            series: []
        });
    }));

    it('should expose authors, book, categories, series', function() {
        // then
        expect(addBookController.authors).not.toBe(null);
        expect(addBookController.book).not.toBe(null);
        expect(addBookController.categories).not.toBe(null);
        expect(addBookController.series).not.toBe(null);
    });
    
    it('should add book via books service', function() {
        // given
        bookServiceMock = {
        	lastAddedBook: null,
            addBook: function(bookToAdd) {
            	this.lastAddedBook = bookToAdd;
                return {then: function() {}};
            },
        };
        addBookController = $controller('AddBookController', {
            authors: [],
            BookService: bookServiceMock,
            authors: [],
            book: {},
            categories: [],
            series: []
        });
        expectedBook = {name: "Nowa książka", categories: [{name: "Kategoria 1"}, {name: "Kategoria 2"}]};

        // when
        addBookController.book = expectedBook;
        addBookController.saveBook();

        // then
        expect(bookServiceMock.lastAddedBook).not.toBe(null);
        expect(bookServiceMock.lastAddedBook).toBe(expectedBook);
        expect(bookServiceMock.lastAddedBook.name).toBe("Nowa książka");
    });
    
    it('should edit book via books service', function() {
        // given
        bookServiceMock = {
        	lastAddedBook: null,
            updateBook: function(id, bookToAdd) {
            	this.lastAddedBook = bookToAdd;
                return {then: function() {}};
            },
        };
        addBookController = $controller('EditBookController', {
            authors: [],
            BookService: bookServiceMock,
            authors: [],
            book: {},
            categories: [],
            series: []
        });
        
        updatedBook = {id: 1, name: "Nowa książka", categories: [{name: "Kategoria 1"}, {name: "Kategoria 2"}]};

        // when
        addBookController.book = updatedBook;
        addBookController.saveBook();

        // then
        expect(bookServiceMock.lastAddedBook).not.toBe(null);
        expect(bookServiceMock.lastAddedBook).toBe(updatedBook);
    });
    
    it('should add book via books service with spy and call through', function() {
        expectedBook = {};
        spyOn(bookService, 'addBook').and.callThrough();

        // when
        addBookController.book = expectedBook;
        addBookController.saveBook();

        // then
        expect(bookService.addBook).toHaveBeenCalled();
        expect(bookService.addBook).toHaveBeenCalledWith(expectedBook);
    });
    
    it('should add book via books service with spy and call with changed response', function() {
        expectedBook = {};
        spyOn(bookService, 'addBook').and.returnValue({ then: function() {} });
        // when
        addBookController.book = expectedBook;
        addBookController.saveBook();

        // then
        expect(bookService.addBook).toHaveBeenCalled();
        expect(bookService.addBook).toHaveBeenCalledWith(expectedBook);
    });

});

describe('Test mechanizmu testowego', function() {
    it('true == true', function() {
        expect(true).toBeTruthy();
    });
});

describe('Test BookService', function() {
    var bookService, res, $window;
    
    beforeEach(module('booksApp'));
    
    beforeEach(inject(function(BookService, _$window_, $injector) {
               bookService = BookService;
               $window    = _$window_;
        }));
    
    afterEach(inject(function($httpBackend){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));
    
    it('should get book', inject(function($httpBackend) {
        $httpBackend.expectGET('/api/books/1').respond(200, JSON.stringify( 
            {
                name : 'Nazwa ksiazki',
                author : { name: 'Autor' }
            }
        ));
       result = bookService.getBook(1);
        $httpBackend.flush();
        
        expect(result.name).toBe('Nazwa ksiazki');
        
    }));
    
    it('should update book when id is not null', inject(function($httpBackend) {
        book = {
            id: 1,
            name: 'Nazwa ksiazki',
            author: { id: 1, name: 'Autor'}
        };
        $window : {
            alert = function(text) {};
        };
        $httpBackend.expect('PUT','/api/books/1', book).respond(200);
        result = bookService.addBook(book);
        $httpBackend.flush();
        expect(result).toBeDefined();
    }));
    
    it('should add book when id is null', inject(function($httpBackend) {
        book = {
            name: 'Nazwa ksiazki',
            author: { id: 1024, name: 'Aaaautor'}
        };
        bookResponse = {
            id : 2345,
            name: 'Nazwa ksiazki',
            author: { id: 1024, name: 'Aaaautor'}
        };
        $window : {
            alert = function(text) {};
        };
        $httpBackend.expectPOST('/api/books?author=%7B%22id%22:1024,%22name%22:%22Aaaautor%22%7D&name=Nazwa+ksiazki').respond(200, JSON.stringify(bookResponse) );
        result = bookService.addBook(book);
        $httpBackend.flush();
        expect(result.id).toBeDefined();
    }));
});

describe('Test BookAddController', function() {
    var $controller;
    
    beforeEach(module('booksApp')); 
        
    beforeEach(inject(function(_$controller_, _BookService_, _AuthorsService_) {
        $controller = _$controller_;
        bookService = _BookService_;
        authorsService = _AuthorsService_;
    }));

    it('should clear author should clear author', function() {
        controller = $controller('BookAddController', {
           authors: [{name: "name1", id: 1},{name: "name2", id:2}],
           book: { author: { name: "abc"} },
           series: [],
           $scope: {}
        });
        controller.clearAuthor();
        expect(controller.book.author).toBeDefined();
        expect(controller.book.author.name).toBeUndefined();
    });
    
    it('addbook new book with existing author should call book add only', function() {
        expectedBook = { author: { name: "name1", id:1 }, name: "bookname1" };
        controller = $controller('BookAddController', {
           authors: [{name: "name1", id: 1},{name: "name2", id:2}],
           book: expectedBook,
           series: [],
           $scope: {}
        });
        spyOn(authorsService, 'addAuthor').and.callThrough();
        spyOn(authorsService, 'getAuthors').and.callThrough();
        spyOn(bookService, 'getBook').and.callThrough();
        spyOn(bookService, 'getBooks').and.callThrough();
        spyOn(bookService, 'addBook').and.callThrough();
        controller.addBook();
        expect(controller.book.author).toBeDefined();
        // shouldnt call addAuthor
        expect(authorsService.addAuthor.calls.count()).toBe(0);
        // shouldnt call addAuthor
        expect(bookService.addBook).toHaveBeenCalledWith(expectedBook, jasmine.anything());
    });
    
    it('addbook new book with notexisting author should call addAuthor and addBook', function() {
        expectedBook = { author: { }, name: "bookname1" };
        expectedAuthor = { name: "newAuthor1" };
        controller = $controller('BookAddController', {
           authors: [{name: "name1", id: 1},{name: "name2", id:2}],
           book: expectedBook,
           series: [],
           $scope: {}
        });
        controller.isAddNewAuthor=true;
        controller.typedAuthor=expectedAuthor.name;
        spyOn(authorsService, 'addAuthor').and.callThrough();
        spyOn(authorsService, 'getAuthors').and.callThrough();
        spyOn(bookService, 'getBook').and.callThrough();
        spyOn(bookService, 'getBooks').and.callThrough();
        spyOn(bookService, 'addBook').and.callThrough();
        controller.addBook();
        expect(controller.book.author).toBeDefined();
        // shouldnt call addAuthor
        expect(authorsService.addAuthor).toHaveBeenCalledWith(expectedAuthor, jasmine.anything());
        // shouldnt call addAuthor
        expect(bookService.addBook).toHaveBeenCalledWith(expectedBook, jasmine.anything());
    });
    
    
});
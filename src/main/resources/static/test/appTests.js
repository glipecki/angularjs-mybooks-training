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
        $httpBackend.expectPOST('/api/books?author=%7B%22id%22:1024,%22name%22:%22Aaaautor%22%7D&name=Nazwa+ksiazki').respond(200, JSON.stringify(bookResponse) );
        result = bookService.addBook(book);
        $httpBackend.flush();
        expect(result.id).toBeDefined();
    }));
});

describe('Test BookAddController', function() {
    var $controller;
    var scope, $state, authors, book, BookService, AuthorsService;
    
    beforeEach(function() {
        module('booksApp'); 
        
        module(function($provide) {
            $provide.service('AuthorsService', AuthorsService);
        });

        inject(function($injector) {
            AuthorsService = $injector.get('AuthorsService');
        });
    });
   

   
    beforeEach(inject(function($rootScope, $controller, _AuthorsService_, _BookService_) {
        scope = $rootScope.$new();
        AuthorsService = _AuthorsService_;
        BookService = _BookService_;
        authors = {};
        
        createController = function() {
            return $controller('BookAddController', {
                '$scope': scope
            });
        };

    }));
    
    it('should clear author should clear author', function() {
        var controller = createController();
        controller.book = { author: { name: abc }};
        scope.clearAuthor();
        expect(controller.book.author).toBe({});
    });
    
    
});
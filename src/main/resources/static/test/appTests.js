describe('BookService test', function() {
    var bookService, $httpBackend, $rootScope;
    beforeEach(module('myBooks'));

    beforeEach(inject(function(BookService, _$httpBackend_, _$rootScope_) {
        bookService = BookService;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_
    }));



    it('shouldReturnPromise', function() {
        $httpBackend.when('GET', '/api/books/1').respond(200, {
            id: 1,
            name: "test"
        });
        response = bookService.getBook(1);
        expect(response).not.toBeNull();
        expect(response.catch).not.toBeNull();

    });

    it('shouldGetBook ', function() {
        //mock
        $httpBackend.when('GET', '/api/books/1').respond(200, {
            id: 1,
            name: "bookName"
        });
        //when
        responsePromise = bookService.getBook(1);

        //then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response.name).toBe('bookName');
        });
        $httpBackend.flush();
    });

    it("shouldPostBook", function() {
        //mock
        var book = {
            "id": "1",
            "name": 'bookName',
            "author": {
                "id": "0",
                "name": "Mroczna Wieża"
            }
        };
        //when
        $httpBackend.when('POST', '/api/books', book).respond(201, book);
        //then
        responsePromise = bookService.addBook(book);
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response.name).toBe("bookName");
        });
        $httpBackend.flush();
    });


});

describe('BookDetailsController test', function() {
    var scope, ctrl;
    var book, $state, $translate, ngToast;
    var bookMock = {
        "id": "1",
        "name": 'bookName',
        "author": {
            "id": "0",
            "name": "Mroczna Wieża"
        }
    };
    var $stateMock;


    beforeEach(function() {
        module('myBooks')
        $stateMock = jasmine.createSpyObj('$state', ['go']);
    });

    beforeEach(inject(function($rootScope, $controller, _$state_, _$translate_, _ngToast_) {
        $translate = _$translate_;
        ngToast = _ngToast_;
        $state = _$state_;
        scope = $rootScope.$new();

        spyOn($state, 'go').and.callFake(function(state, params) {});
        ctrl = $controller('BookDetailsController as vm', {
            $scope: scope,
            book: bookMock
        });
    }));

    it('shouldStartWithBook', function() {
        expect(scope.vm.book).not.toBeNull();
        expect(scope.vm.book.name).toBe("bookName");
    });


    it('shouldChangeLanguage', function() {
        //set up.
        $translate.use('pl')
            //make the call.
        scope.vm.changeLanguage();
        //assert
        expect($translate.use()).toEqual('en');
    });


    it('shouldGoToEditForm', function() {
        //make the call.
        scope.vm.edit();
        //assert
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('book-edit', {
            'id': "1"
        });
    });

});
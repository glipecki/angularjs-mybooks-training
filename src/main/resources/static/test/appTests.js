describe('Warmup tests', function() {
    it('should assert truthy', function() {
        expect(true).toBeTruthy();
    });
});

describe('BookService test', function() {
    var bookService, $httpBackend;
    
    beforeEach(module('myBooksApp')); 

    beforeEach(inject(function(BookService, _$httpBackend_) {
        bookService = BookService;
        $httpBackend = _$httpBackend_;
    }));
    
    it('should return promise as result', function() {
        // when
        response = bookService.getBook(1);
        
        // then
        expect(response).not.toBeNull();
        expect(response.catch).not.toBeNull();
    });

    it('should get list of books', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/books').respond(200, 
           [ {id: 1, name: 'Book title1'}, {id: 2, name: 'Book title2'}]);
        // when
        responsePromise = bookService.getBooks();
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response[0].name).toBe('Book title1');
            expect(response[1].name).toBe('Book title2');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should get book', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/books/1').respond(200, 
            {id: 1, name: 'Book title'});
        // when
        responsePromise = bookService.getBook(1);
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response.name).toBe('Book title');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should add book', function() {
        book = {
              name: 'Book title',
              isbn: '123',
              series: {id: 0, name: 'Series'},
              author: {id: 0, name: 'Author'}
        };
       
        bookResponse = {
              id : 2,
              name: 'Book title',
              isbn: '123',
              series: {id: 0, name: 'Series'},
              author: {id: 0, name: 'Author'}
        };
        $httpBackend.when('POST', '/api/books/', book).respond(200, JSON.stringify(bookResponse) );
        // when
        responsePromise = bookService.addBook(book);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(response.id).toBeDefined();
        });
        expect(responsePromise).toBeDefined();
    });

    it('should update book', function() {
        book = {id: 1,
              name: 'Book title',
              isbn: '123',
              series: {id: 1, name: 'Series'},
              author: {id: 1, name: 'Author'}
        }

        $httpBackend.when('PUT', '/api/books/1', book).respond(200);
        // when
        responsePromise = bookService.updateBook(1,book);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
        });
        expect(responsePromise).toBeDefined();
    });
});
//
describe('AuthorService test', function() {
    var authorService, $httpBackend;
    
    beforeEach(module('myBooksApp')); 

    beforeEach(inject(function(AuthorService, _$httpBackend_) {
        authorService = AuthorService;
        $httpBackend = _$httpBackend_;
    }));

     it('should get list of authors', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/author').respond(200, 
           [ {id: 1, name: 'Author 1'}, {id: 2, name: 'Author 2'}]);
        // when
        responsePromise = authorService.getAuthors();
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response[0].name).toBe('Author 1');
            expect(response[1].name).toBe('Author 2');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should get author', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/author/1').respond(200, 
            {id: 1, name: 'Author name'});
        // when
        responsePromise = authorService.getAuthor(1);
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response.name).toBe('Author name');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should add author', function() {
        author = {name: 'Author name'};

        $httpBackend.when('POST', '/api/author/', author).respond(200, JSON.stringify({id: 2, name: 'Author name'}) );
        // when
        responsePromise = authorService.addAuthor(author);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(responsePromise.id).toBeDefined();
        });
        expect(responsePromise).toBeDefined();
    });

    it('should update author', function() {
        author = {id: 1, name: 'Author name'};

        $httpBackend.when('PUT', '/api/author/1', author).respond(200);
        // when
        responsePromise = authorService.updateAuthor(1, author);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
        });
        expect(responsePromise).toBeDefined();
    });
});
//
describe('CategoryService test', function() {
    var categoryService, $httpBackend;
    
    beforeEach(module('myBooksApp')); 

    beforeEach(inject(function(CategoryService, _$httpBackend_) {
        categoryService = CategoryService;
        $httpBackend = _$httpBackend_;
    }));

     it('should get list of categories', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/category').respond(200, 
           [ {id: 1, name: 'Category 1'}, {id: 2, name: 'Category 2'}]);
        // when
        responsePromise = categoryService.getCategories();
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response[0].name).toBe('Category 1');
            expect(response[1].name).toBe('Category 2');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should get category', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/category/1').respond(200, 
            {id: 1, name: 'Category name'});
        // when
        responsePromise = categoryService.getCategory(1);
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response.name).toBe('Category name');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should add category', function() {
        category = {name: 'Category name'};

        $httpBackend.when('POST', '/api/category/', category).respond(200, JSON.stringify({id: 2, name: 'Category name'}) );
        // when
        responsePromise = categoryService.addCategory(category);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(responsePromise.id).toBeDefined();
        });
        expect(responsePromise).toBeDefined();
    });

    it('should update category', function() {
        category = {id: 1, name: 'Category name'};

        $httpBackend.when('PUT', '/api/category/1', category).respond(200);
        // when
        responsePromise = categoryService.updateCategory(1, category);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
        });
        expect(responsePromise).toBeDefined();
    });
});
//
describe('SeriesService test', function() {
    var seriesService, $httpBackend;
    
    beforeEach(module('myBooksApp')); 

    beforeEach(inject(function(SeriesService, _$httpBackend_) {
        seriesService = SeriesService;
        $httpBackend = _$httpBackend_;
    }));

     it('should get list of series', function() {
        // prepare mocks
        $httpBackend.when('GET', '/api/series').respond(200, 
           [ {id: 1, name: 'Series 1'}, {id: 2, name: 'Series 2'}]);
        // when
        responsePromise = seriesService.getSeries();
        
        // then
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
            expect(response[0].name).toBe('Series 1');
            expect(response[1].name).toBe('Series 2');
        });

        //flush pending operations
        $httpBackend.flush();
    });

    it('should add series', function() {
        series = {name: 'Series name'};

        $httpBackend.when('POST', '/api/series/', series).respond(200, JSON.stringify({id: 2, name: 'Series name'}) );
        // when
        responsePromise = seriesService.addSeries(series);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(responsePromise.id).toBeDefined();
        });
        expect(responsePromise).toBeDefined();
    });

    it('should update series', function() {
        series = {id: 1, name: 'Series name'};

        $httpBackend.when('PUT', '/api/series/1', series).respond(200);
        // when
        responsePromise = seriesService.updateSeries(1, series);
        // then
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        responsePromise.then(function(response) {
            expect(response).not.toBeNull();
        });
        expect(responsePromise).toBeDefined();
    });
});
//

describe('BookAddController test', function() {
    var $controller, scope;

    beforeEach(module('myBooksApp'));

    beforeEach(inject(function($rootScope, _$controller_, _BookService_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        bookService = _BookService_;
    }));

    it('should expose authors', function() {
        // given
        bookAddController = $controller('BookAddController', {
            '$scope': scope,
            authors: [{id: 1, name: 'Author name'}],
            series: [],
            categories: []
        });

        // then
        expect(bookAddController.authors).not.toBe(null);
        expect(bookAddController.authors.length).toBe(1);
    });

    it('should expose series', function() {
        // given
        bookAddController = $controller('BookAddController', {
            '$scope': scope,
            authors: [],
            series: [{id: 1, name: 'Series name'}],
            categories: []
        });

        // then
        expect(bookAddController.series).not.toBe(null);
        expect(bookAddController.series.length).toBe(1);
    });

    it('should expose categories', function() {
        // given
        bookAddController = $controller('BookAddController', {
            '$scope': scope,
            authors: [],
            series: [],
            categories: [{id: 1, name: 'Category name 1'}, {id:2, name: 'Category name 2'}]
        });

        // then
        expect(bookAddController.categories).not.toBe(null);
        expect(bookAddController.categories.length).toBe(2);
    });

    it('should add book via BookService', function() {
        // given
        mockBookService = {
            lastAddedBook: null,
            addBook: function(book) {
                this.lastAddedBook = book;
                return {then: function() {}};
            }
        };
        bookAddController = $controller('BookAddController', {
            '$scope': scope,
            authors: [],
            series: [],
            categories: [],
            BookService: mockBookService
        });
        expectedBook = {id: 1, name: 'Book title'};

        // when
        bookAddController.book = expectedBook;
        scope.saveBook();

        // then
        expect(mockBookService.lastAddedBook).not.toBe(null);
        expect(mockBookService.lastAddedBook).toBe(expectedBook);
        expect(mockBookService.lastAddedBook.name).toBe('Book title');
    });

    it('should add book via BookService with spy and call through', function() {
        // given
        bookAddController = $controller('BookAddController', {
            '$scope': scope,
            authors: [],
            series: [],
            categories: []
        });
        expectedBook = {};
        spyOn(bookService, 'addBook').and.callThrough();

        // when
        bookAddController.book = expectedBook;
        scope.saveBook();

        // then
        expect(bookService.addBook).toHaveBeenCalled();
        expect(bookService.addBook).toHaveBeenCalledWith(expectedBook);
    });

    it('should add book via BookService with spy and call with changed response', function() {
        // given
        bookAddController = $controller('BookAddController', {
            '$scope': scope,
            authors: [],
            series: [],
            categories: []
        });
        expectedBook = {};
        spyOn(bookService, 'addBook').and.returnValue({ then: function() {} });

        // when
        bookAddController.book = expectedBook;
        scope.saveBook();

        // then
        expect(bookService.addBook).toHaveBeenCalled();
        expect(bookService.addBook).toHaveBeenCalledWith(expectedBook);
    });
});

describe('BookEditController test', function() {
    var $controller, scope;

    beforeEach(module('myBooksApp'));

    beforeEach(inject(function($rootScope, _$controller_, _BookService_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        bookService = _BookService_;
    }));

    it('should expose authors', function() {
        // given
        bookEditController = $controller('BookEditController', {
            '$scope': scope,
            book: {id:1, name: 'Title name', author: {id: 1, name: 'Author name'}, series: {id: 1, name: 'Series name'}},
            authors: [{id: 1, name: 'Author name'}],
            series: [{id: 1, name: 'Series name'}],
            categories: []
        });

        // then
        expect(bookEditController.authors).not.toBe(null);
        expect(bookEditController.authors.length).toBe(1);
    });

    it('should expose series', function() {
        // given
        bookEditController = $controller('BookEditController', {
            '$scope': scope,
            book: {id:1, name: 'Title name', author: {id: 1, name: 'Author name'}, series: {id: 1, name: 'Series name'}},
            authors: [{id: 1, name: 'Author name'}],
            series: [{id: 1, name: 'Series name'}],
            categories: []
        });

        // then
        expect(bookEditController.series).not.toBe(null);
        expect(bookEditController.series.length).toBe(1);
    });

    it('should expose categories', function() {
        // given
        bookEditController = $controller('BookEditController', {
            '$scope': scope,
            book: {},
            authors: [],
            series: [],
            categories: [{id: 1, name: 'Category name 1'}, {id:2, name: 'Category name 2'}]
        });

        // then
        expect(bookEditController.categories).not.toBe(null);
        expect(bookEditController.categories.length).toBe(2);
    });

    it('should clear series', function() {
        // given
        bookEditController = $controller('BookEditController', {
            '$scope': scope,
            book: {id:1, name: 'Title name', author: {id: 1, name: 'Author name'}, series: {id: 1, name: 'Series name'}},
            authors: [{id: 1, name: 'Author name'}],
            series: [{id: 1, name: 'Series name'}],
            categories: []
        });
        scope.clearSeries();
        // then
        expect(bookEditController.book.series).toBe(null);
    });

    it('should update book via BookService', function() {
        // given
        mockBookService = {
            updatedBook: null,
            updateBook: function(id, book) {
                this.updatedBook = book;
                return {then: function() {}};
            }
        };
        bookEditController = $controller('BookEditController', {
            '$scope': scope,
            book: {id: 1, name: 'Book title', categories: {id:1, name: 'Category name'}},
            authors: [],
            series: [],
            categories: [{id:1, name: 'Category name'}],
            BookService: mockBookService
        });

        // when
        bookEditController.book.isbn = '123';
        scope.saveBook();

        // then
        expect(mockBookService.updatedBook).not.toBe(null);
        expect(mockBookService.updatedBook.isbn).toBe('123');
    });

    it('should update book via BookService with spy and call through', function() {
        // given
        bookEditController = $controller('BookEditController', {
            '$scope': scope,
            book: {id: 1, name: 'Book title', categories: {id:1, name: 'Category name'}},
            authors: [],
            series: [],
            categories: [{id:1, name: 'Category name'}]
        });
        spyOn(bookService, 'updateBook').and.callThrough();

        // when
        bookEditController.book.isbn = '123';
        scope.saveBook();

        // then
        expect(bookService.updateBook).toHaveBeenCalled();
    });
});

describe('CategoryListController test', function() {
    var $controller, scope;

    beforeEach(module('myBooksApp'));

    beforeEach(inject(function($rootScope, _$controller_, _CategoryService_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        categoryService = _CategoryService_;
    }));

    it('should expose categories', function() {
        // given
        categoryListController = $controller('CategoryListController', {
            '$scope': scope,
            categories: []
        });

        // then
        expect(categoryListController.categories).not.toBe(null);
        expect(categoryListController.categories.length).toBe(0);
    });

    it('should add category via CategoryService with spy and call through', function() {
        // given
        categoryListController = $controller('CategoryListController', {
            '$scope': scope,
            categories: []
        });
        expectedCategory = {name: 'Category name'};
        spyOn(categoryService, 'addCategory').and.callThrough();

        // when
        scope.newCategoryName = 'Category name';
        scope.addCategoryChecked = true;
        scope.addCategory();

        // then
        expect(categoryService.addCategory).toHaveBeenCalled();
        expect(categoryService.addCategory).toHaveBeenCalledWith(expectedCategory);
    });
});

describe('AuthorListController test', function() {
    var $controller, scope;

    beforeEach(module('myBooksApp'));

    beforeEach(inject(function($rootScope, _$controller_, _AuthorService_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        authorService = _AuthorService_;
    }));

    it('should expose authors', function() {
        // given
        authorListController = $controller('AuthorListController', {
            '$scope': scope,
            authors: [{id: 1, name: 'Author name'}]
        });

        // then
        expect(authorListController.authors).not.toBe(null);
        expect(authorListController.authors.length).toBe(1);
    });

    it('should add author via AuthorService with spy and call through', function() {
        // given
        authorListController = $controller('AuthorListController', {
            '$scope': scope,
            authors: []
        });
        expectedAuthor = {name: 'Author name'};
        spyOn(authorService, 'addAuthor').and.callThrough();

        // when
        scope.newAuthorName = 'Author name';
        scope.addAuthorChecked = true;
        scope.addAuthor();

        // then
        expect(authorService.addAuthor).toHaveBeenCalled();
        expect(authorService.addAuthor).toHaveBeenCalledWith(expectedAuthor);
    });
});

describe('SeriesListController test', function() {
    var $controller, scope;

    beforeEach(module('myBooksApp'));

    beforeEach(inject(function($rootScope, _$controller_, _SeriesService_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        seriesService = _SeriesService_;
    }));

    it('should expose series', function() {
        // given
        seriesListController = $controller('SeriesListController', {
            '$scope': scope,
            series: [{id: 1, name: 'Series name'}]
        });

        // then
        expect(seriesListController.series).not.toBe(null);
        expect(seriesListController.series.length).toBe(1);
    });

    it('should add series via SeriesService with spy and call through', function() {
        // given
        seriesListController = $controller('SeriesListController', {
            '$scope': scope,
            series: []
        });
        expectedSeries = {name: 'Series name'};
        spyOn(seriesService, 'addSeries').and.callThrough();

        // when
        scope.newSeriesName = 'Series name';
        scope.addSeriesChecked = true;
        scope.addSeries();

        // then
        expect(seriesService.addSeries).toHaveBeenCalled();
        expect(seriesService.addSeries).toHaveBeenCalledWith(expectedSeries);
    });
});

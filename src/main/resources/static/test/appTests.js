describe('Warmup tests', function() {

  it('should assert truthy', function() {
    expect(true).toBeTruthy();
  });

});

describe('BookService', function() {

  var bookService, $httpBackend, $rootScope;

  beforeEach(module('mybooks'));

  beforeEach(inject(function(BookService, _$httpBackend_, _$rootScope_) {
    bookService = BookService;
    $httpBackend = _$httpBackend_;
    $footScope = _$rootScope_;
  }));

  it('schould return promise as result', function() {
    // when
    response = bookService.getBook(1);

    //then
    expect(response).not.toBeNull();
    expect(response.catch).not.toBeNull();
  });

  it('should get list of books', function() {
    // prepare mocks
    $httpBackend.when('GET', '/api/books/1').respond(200, {
      id: 1,
      name: 'Hello'
    });

    //when
    responsePromise = bookService.getBook(1);

    //then
    responsePromise.then(function(response) {
      expect(response).not.toBeNull();
      expect(response.name).toBe('Hello');
    });

    //flush pending operations
    $httpBackend.flush();
  });

});

describe('AddBookController', function() {

  beforeEach(module('mybooks'));

  var $controller, isbnValidatorService;

  beforeEach(inject(function(IsbnValidatorService, _$controller_) {
    isbnValidatorService = IsbnValidatorService;
    $controller = _$controller_;
  }));

  it('should validate isnb', function() {
    var $stub = {};
    var controller = $controller('AddBookController', { authors: $stub, bookService: $stub, $state: $stub, alertService: $stub, isbnValidatorService: $stub, categories: $stub });
    var test = controller.validIsbn(123);
    expect(test).toEqual(false);
  });

});

describe('cdLanguage', function() {

  var $compile,
      $rootScope;

  beforeEach(module('mybooks'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should containg british flag', function() {

    var element = $compile("<div x-cd-language></div>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain("en.png");

  });
});

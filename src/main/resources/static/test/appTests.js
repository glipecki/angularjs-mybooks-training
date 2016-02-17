describe('Wormup tests', function() {
    it('should assert truthy', function() {
        expect(true).toBeTruthy();
    })
});

describe('booksService',  function() {

    var testBookService, $httpBackend, $rootScope;

    beforeEach(module('booksApp'));

    beforeEach(inject(function(booksService, _$httpBackend_, _$rootScope_)  {
        testBookService = booksService;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    it('should get book', function() {
        $httpBackend.when('GET', '/api/books/1').respond(200, {id: 1, name: "firstBook"});

        testBookService.getBook(1).then(function(response) {
            expect(response).not.toBeNull();
            expect(response.id).toBe(1);
            expect(response.name).toBe("firstBook");
        })
    })

});


describe('CategoriesController', function() {

    var $controller;

    beforeEach(module('booksApp'));

    beforeEach(inject(function(_$controller_, _categoryService_) {
        $controller = _$controller_;
        categoryService = _categoryService_;
    }));

    it('should add new category via service', function() {
        // given
        categoriesServiceMock = {
            addNewCategory: function(category) {
                lastAddedCategory = category;
                var deferred = $q.defer();
                deferred.resolve(category);
                return deferred;
            }
        };
        categoriesController = $controller('CategoriesController', {
            categories: [{id: 1, name: "Test"}],
            categoryService: categoriesServiceMock
        });

        // when
        categoriesController.newCategoryName = "Test2";
        categoriesController.addNewCategory();

        // then
        expect(categoriesServiceMock.lastAddedCategory).not.toBe(null);
        expect(categoriesServiceMock.lastAddedCategory.name).toBe("Test2");
    });

});

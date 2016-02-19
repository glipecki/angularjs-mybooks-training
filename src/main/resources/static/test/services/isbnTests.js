describe('directives', function() {
  var $scope, form;
  beforeEach(module('mybooks'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.isbn" name="isbn" isbn-format />' +
      '</form>'
    );
    $scope.model = {isbn: null};
    $compile(element)($scope);
    form = $scope.form;
  }));

  describe('isbn-format', function() {
    
    it('should format and pass with correct isbn 10', function() {
      form.isbn.$setViewValue('0306406152');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('0-306-40615-2');
      expect(form.isbn.$valid).toBe(true);
    });

    it('should format but not pass with incorrect isbn checksum', function() {
      form.isbn.$setViewValue('9788371815100');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('978-83-7181-510-0');
      expect(form.isbn.$valid).toBe(false);
    });

	it('should not format nor pass with too short isbn', function() {
      form.isbn.$setViewValue('978837');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('978837');
      expect(form.isbn.$valid).toBe(false);
    });

	it('should not format nor pass with too long isbn', function() {
      form.isbn.$setViewValue('9788371815100123132');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('9788371815100123132');
      expect(form.isbn.$valid).toBe(false);
    });

	it('should format and pass with correct isbn 13', function() {
      form.isbn.$setViewValue('9788371815102');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('978-83-7181-510-2');
      expect(form.isbn.$valid).toBe(true);
    });

	it('should reformat wrong format', function() {
      form.isbn.$setViewValue('97883--7-181-5102');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('978-83-7181-510-2');
      expect(form.isbn.$valid).toBe(true);
    });

	it('should reject nip with letters', function() {
      form.isbn.$setViewValue('NIPNIPNIPN');
      $scope.$digest();
      expect($scope.model.isbn).toEqual('NIPNIPNIPN');
      expect(form.isbn.$valid).toBe(false);
    });

  });
});

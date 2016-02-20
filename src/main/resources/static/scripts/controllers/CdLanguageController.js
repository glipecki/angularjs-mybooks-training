/**
 * Controller
 * Obsługuje zmianę języka
 */

app.controller('CdLanguageController', ['$translate','$scope', function($translate, $scope) {
  this.flag = 'en';
  this.changeLanguage = function (){
      $translate.use(($translate.use() === 'en') ? 'pl' : 'en');
      this.flag = (($translate.use() === 'en') ? 'pl' : 'en');
  };
}]);

var app = angular.module('mybooks');


app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('pl', {
    TITLE: 'myBooks',
    BOOK_LIST: 'Lista książek',
    CATEGORY_LIST: 'Lista kategorii',
    SERIES_LIST: 'Lista serii',

    ADD_BOOK: 'Dodaj książkę',
    ADD_NEW_BOOK: 'Dodaj nową książkę',
    EDIT_BOOK: 'Edytuj książkę',
    BOOK_NAME: 'Nazwa',
    BOOK_AUTHOR: 'Autor',
    BOOK_ISBN: 'ISBN',
    BOOK_NAME_REQUIRED: 'Musisz podać nazwę książki',
    ISBN_REQUIRED: 'Musisz podać poprawny ISBN',
    FILTER_BOOKS: 'Filtruj książki',
    SAVE_BOOK: 'Zapisz książkę',
    
    ADD_AUTHOR: 'Dodaj autora',
    ADD_NEW_AUTHOR: 'Dodaj nowego autora',
    AUTHOR_NAME: "Nazwa autora",
    BOOK_AUTHOR_REQUIRED: 'Musisz podać autora książki',
     
    
    ADD_SERIES: 'Dodaj nową serię',
    ADD_NEW_SERIES: 'Dodaj nową serię',
    SERIES_NAME: 'Nazwa serii',
    SERIES: 'Seria',    
    SERIES_NAME_REQUIRED: 'Musisz podać nazwę serii',
    FILTER_SERIES:'Filtruj serie',
    SAVE_SERIES: 'Zapisz serię',

    CATEGORIES: 'Kategorie',
    ADD_CATEGORY: 'Dodaj nową kategorię',
    EDIT_CATEGORY: 'Edytuj kategorię',
    SAVE_CATEGORY: 'Zapisz kategorię',
    CATEGORY_NAME_REQUIRED: 'Musisz podać nazwę kategorii',
    CATEGORY_NAME: 'Nazwa kategorii',
    FILTER_CATEGORIES:'Filtruj kategorie',

    NAME: 'Nazwa',
    NAME_REQUIRED: 'Podaj nazwę',
    EDIT: 'Edytuj'
  });
  $translateProvider.translations('en', {
    EDIT: 'Edit',
    BOOK_LIST: 'Book list'
  });

  $translateProvider.preferredLanguage('pl');
  $translateProvider.useSanitizeValueStrategy('escape');
}]);


app.controller('LanguageController', ['$translate',  function($translate) {
  this.select = function(key) {
    if (this.languages.indexOf(key) > -1) {
      this.current = key;
      $translate.use(key);
    }
  };
  this.languages = ['pl', 'en'];
  this.current = 'pl';
}]);

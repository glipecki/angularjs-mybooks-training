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
    ENTER_ISBN: 'Podaj ISBN',
    BOOK_NAME_REQUIRED: 'Musisz podać nazwę książki',
    ISBN_REQUIRED: 'Musisz podać poprawny ISBN',
    FILTER_BOOKS: 'Filtruj książki',
    SAVE_BOOK: 'Zapisz książkę',
    BOOK_ADDED_SUCCESS: 'Książka została dodana',
    
    ADD_AUTHOR: 'Dodaj autora',
    ADD_NEW_AUTHOR: 'Dodaj nowego autora',
    AUTHOR_NAME: 'Nazwa autora',
    BOOK_AUTHOR_REQUIRED: 'Musisz podać autora książki',
    ENTER_AUTHOR: 'Podaj nazwę autora', 
    
    ADD_SERIES: 'Dodaj serię',
    ADD_NEW_SERIES: 'Dodaj nową serię',
    SERIES_NAME: 'Nazwa serii',
    SERIES: 'Seria',    
    SERIES_NAME_REQUIRED: 'Musisz podać nazwę serii',
    FILTER_SERIES:'Filtruj serie',
    SAVE_SERIES: 'Zapisz serię',
    ENTER_SERIES: 'Podaj nazwę serii',

    CATEGORIES: 'Kategorie',
    ADD_CATEGORY: 'Dodaj nową kategorię',
    EDIT_CATEGORY: 'Edytuj kategorię',
    SAVE_CATEGORY: 'Zapisz kategorię',
    CATEGORY_NAME_REQUIRED: 'Musisz podać nazwę kategorii',
    CATEGORY_NAME: 'Nazwa kategorii',
    FILTER_CATEGORIES:'Filtruj kategorie',
    ADD_NEW_CATEGORIES: 'Dodaj nowe kategorie',
    ENTER_CATEGORY_NAME: 'Wprowadź nazwę kategorii',

    NAME: 'Nazwa',
    ENTER_NAME: 'Podaj nazwę',
    EDIT: 'Edytuj',
    ENTER: 'Wprowadź'
  });
  $translateProvider.translations('en', {
    TITLE: 'myBooks',
    BOOK_LIST: 'List of books',
    CATEGORY_LIST: 'List of categories',
    SERIES_LIST: 'List of series',

    ADD_BOOK: 'Add book',
    ADD_NEW_BOOK: 'Add new book',
    EDIT_BOOK: 'Edit book',
    BOOK_NAME: 'Name',
    BOOK_AUTHOR: 'Author',
    BOOK_ISBN: 'ISBN',
    ENTER_ISBN: 'Enter ISBN',
    BOOK_NAME_REQUIRED: 'You have to add book name',
    ISBN_REQUIRED: 'Incorrect ISBN',
    FILTER_BOOKS: 'Filter books',
    SAVE_BOOK: 'Save book',
    BOOK_ADDED_SUCCESS: 'Book has been added',

    ADD_AUTHOR: 'Add author',
    ADD_NEW_AUTHOR: 'Add new author',
    AUTHOR_NAME: 'Author name',
    BOOK_AUTHOR_REQUIRED: 'You have to add author name',
    ENTER_AUTHOR: 'Enter author',
     
    
    ADD_SERIES: 'Add series',
    ADD_NEW_SERIES: 'Add new series',
    SERIES_NAME: 'Series name',
    SERIES: 'Series',    
    SERIES_NAME_REQUIRED: 'You have to add series name',
    FILTER_SERIES:'Filter series',
    SAVE_SERIES: 'Save series',
    ENTER_SERIES: 'Enter series',

    CATEGORIES: 'Categories',
    ADD_CATEGORY: 'Add new category',
    EDIT_CATEGORY: 'Edit category',
    SAVE_CATEGORY: 'Save category',
    CATEGORY_NAME_REQUIRED: 'You have to add category name',
    CATEGORY_NAME: 'Category name',
    FILTER_CATEGORIES:'Filter category',
    ADD_NEW_CATEGORIES: 'Add new categories',
    ENTER_CATEGORY_NAME: 'Enter category name',

    NAME: 'Name',
    ENTER_NAME: 'Enter name',
    EDIT: 'Edit',
    ENTER: 'Enter'
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

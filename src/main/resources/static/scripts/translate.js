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
    BOOK_ADD_SUCCESS: 'Książka została dodana',
    BOOK_ADD_ERROR: 'Nie udało się dodać książki',
    BOOK_EDIT_SUCCESS: 'Książka została zmieniona',
    BOOK_EDIT_ERROR: 'Nie udało się zapisać książki',
    
    ADD_AUTHOR: 'Dodaj autora',
    ADD_NEW_AUTHOR: 'Dodaj nowego autora',
    AUTHOR_NAME: 'Nazwa autora',
    BOOK_AUTHOR_REQUIRED: 'Musisz podać autora książki',
    ENTER_AUTHOR: 'Podaj nazwę autora', 
    
    ADD_SERIES: 'Dodaj serię',
    ADD_NEW_SERIES: 'Dodaj nową serię',
    EDIT_SERIES: 'Edytuj serię',
    SERIES_NAME: 'Nazwa serii',
    SERIES: 'Seria',    
    SERIES_NAME_REQUIRED: 'Musisz podać nazwę serii',
    FILTER_SERIES:'Filtruj serie',
    SAVE_SERIES: 'Zapisz serię',
    ENTER_SERIES: 'Podaj nazwę serii',
    SERIES_ADD_SUCCESS: 'Seria została dodana',
    SERIES_ADD_ERROR: 'Nie udało się dodać serii',
    SERIES_EDIT_SUCCESS: 'Seria została zmieniona',
    SERIES_EDIT_ERROR: 'Nie udało się zapisać serii',

    CATEGORIES: 'Kategorie',
    ADD_CATEGORY: 'Dodaj kategorię',
    ADD_NEW_CATEGORIES: 'Dodaj nowe kategorie',
    EDIT_CATEGORY: 'Edytuj kategorię',
    SAVE_CATEGORY: 'Zapisz kategorię',
    CATEGORY_NAME_REQUIRED: 'Musisz podać nazwę kategorii',
    CATEGORY_NAME: 'Nazwa kategorii',
    FILTER_CATEGORIES:'Filtruj kategorie',
    ENTER_CATEGORY_NAME: 'Wprowadź nazwę kategorii',
    CATEGORY_ADD_SUCCESS: 'Kategoria została dodana',
    CATEGORY_ADD_ERROR: 'Nie udało się dodać kategorii',
    CATEGORY_EDIT_SUCCESS: 'Kategoria została zmieniona',
    CATEGORY_EDIT_ERROR: 'Nie udało się zmienić kategorii',

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
    BOOK_ADD_SUCCESS: 'Book has been added',
    BOOK_ADD_ERROR: 'Book has not been added',
    BOOK_EDIT_SUCCESS: 'Book has been edited successfully',
    BOOK_EDIT_ERROR: 'Book has not been edited',

    ADD_AUTHOR: 'Add author',
    ADD_NEW_AUTHOR: 'Add new author',
    AUTHOR_NAME: 'Author name',
    BOOK_AUTHOR_REQUIRED: 'You have to add author name',
    ENTER_AUTHOR: 'Enter author',
     
    
    ADD_SERIES: 'Add series',
    ADD_NEW_SERIES: 'Add new series',
    EDIT_SERIES: 'Edit series',
    SERIES_NAME: 'Series name',
    SERIES: 'Series',    
    SERIES_NAME_REQUIRED: 'You have to add series name',
    FILTER_SERIES:'Filter series',
    SAVE_SERIES: 'Save series',
    ENTER_SERIES: 'Enter series',
    SERIES_ADD_SUCCESS: 'Series has been added',
    SERIES_ADD_ERROR: 'Series has not been added',
    SERIES_EDIT_SUCCESS: 'Series has been successfully modified',
    SERIES_EDIT_ERROR: 'Series has not been modified',

    CATEGORIES: 'Categories',
    ADD_CATEGORY: 'Add category',
    ADD_NEW_CATEGORIES: 'Add new categories',
    EDIT_CATEGORY: 'Edit category',
    SAVE_CATEGORY: 'Save category',
    CATEGORY_NAME_REQUIRED: 'You have to add category name',
    CATEGORY_NAME: 'Category name',
    FILTER_CATEGORIES:'Filter category',
    ENTER_CATEGORY_NAME: 'Enter category name',
    CATEGORY_ADD_SUCCESS: 'Category has been added',
    CATEGORY_ADD_ERROR: 'Category has not been added',
    CATEGORY_EDIT_SUCCESS: 'Category has been successfully modified',
    CATEGORY_EDIT_ERROR: 'Category has not been modified',

    NAME: 'Name',
    ENTER_NAME: 'Enter name',
    EDIT: 'Edit',
    ENTER: 'Enter'
  });

  $translateProvider.preferredLanguage('pl');
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useLocalStorage();
}]);


app.controller('LanguageController', ['$translate',  function($translate) {
  this.select = function(key) {
    if (this.languages.indexOf(key) > -1) {
      this.current = key;
      $translate.use(key);
    }
  };
  this.languages = ['pl', 'en'];
  this.current = $translate.use();
}]);

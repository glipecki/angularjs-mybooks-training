app.controller('TranslateController', function ($scope, $translate) {
	this.changeLanguage = function() {
        $translate.use() === 'pl' ? $translate.use('en') : $translate.use('pl');
    };
});

app.config(function ($translateProvider) {
	$translateProvider.translations('pl', {
		LANG: "pl",
		EDIT: 'Edytuj',
		SAVE: 'Zapisz',
		CANCEL: 'Anuluj',
		BACK_TO_LIST: "Powrót do listy",
		BOOK_LIST: "Lista książek",
		TITLE: "Tytuł",
		AUTHOR: "Autor",
		SERIES: "Seria",
		CATEGORIES: "Kategorie",
		NAME: "Nazwa",
		ADD_AUTHOR: "Dodaj nowego autora",
		AUTHOR_NAME: "Nazwa autora",
		ADD_EDIT_BOOK: "Dodaj/edytuj książkę",
		ADD_BOOK: "Dodaj książkę",
		BOOK_SERIES: "Serie wydawnicze",
		BOOK_CATEGORIES: "Kategorie książek",
		FILTER_BOOKS: "Filtruj książki",
		FILL_NAME: "Podaj nazwę",
		FILL_ISBN: "Podaj numer ISBN",
		NAME_REQ: "Musisz podać nazwę książki",
		NAME_TOO_LONG: "Nazwa książki jest za długa",
		WRONG_ISBN: "Musisz podać poprawny numer ISBN",
		SELECT_AUTHOR: "Musisz wybrać autora książki",
		AUTHOR_REQ: "Musisz podać nazwę autora",
		AUTHOR_TOO_LONG: "Nazwa autora jest za długa",
		FILTER: "Filtruj",
		ADD_CATEGORY: "Dodaj nową kategorię",
		ADD_SERIES: "Dodaj nową serię wdawniczą",
		NAME_TOO_SHORT: "Nazwa jest za krótka",
		NAME_TOO_LONG: "Nazwa jest za długa"
		
	});
	$translateProvider.translations('en', {
		LANG: "en",
		EDIT: 'Edit',
		SAVE: 'Save',
		CANCEL: 'Cancel',
		BACK_TO_LIST: "Back to list",
		BOOK_LIST: "Book list",
		TITLE: "Title",
		AUTHOR: "Author",
		SERIES: "Series",
		CATEGORIES: "Categories",
		NAME: "Name",
		ADD_AUTHOR: "Add new author",
		AUTHOR_NAME: "Author name",
		ADD_EDIT_BOOK: "Add/edit book",
		ADD_BOOK: "Add book",
		BOOK_SERIES: "Publishing series",
		BOOK_CATEGORIES: "Book categories",
		FILTER_BOOKS: "Filter books",
		FILL_NAME: "Fill a name",
		FILL_ISBN: "Fill an ISBN number",
		NAME_REQ: "Please enter a book name",
		NAME_TOO_LONG: "Book name is too long",
		WRONG_ISBN: "Enter correct ISBN number",
		SELECT_AUTHOR: "Please select an author",
		AUTHOR_REQ: "Please enther an author name",
		AUTHOR_TOO_LONG: "Author name is too long",
		FILTER: "Filter",
		ADD_CATEGORY: "Add a new category",
		ADD_SERIES: "Add a new publishing series",
		NAME_TOO_SHORT: "Name is too short",
		NAME_TOO_LONG: "Name is too long"
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('escape');
});
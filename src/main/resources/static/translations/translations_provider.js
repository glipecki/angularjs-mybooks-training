booksApp.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.translations('pl', {
        // Commons
        'SAVE': 'zapisz',
        'EDIT': 'edytuj',
        //MENU
        'APP_NAME': 'myBooks',
        'ADD_BOOK': 'dodaj książkę',
        'BOOKS_LIST': 'lista książek',
        // Books
        'ISBN': 'ISBN',
        'NAME': 'nazwa',
        'AUTHOR': 'autor',
        'SERIES': 'seria',
        'CATEGORIES' : 'kategorie',
        // Edit Book
        'ADD_NEW_BOOK_HEADER': 'Dodaj nową książkę',
        'ADD_NEW_BOOK_NAME_PLACEHOLDER': 'Podaj nazwę',
        'ADD_NEW_BOOK_NAME_HELPER': 'Musisz podać nazwę książki',
        'ADD_NEW_BOOK_ISBN_PLACEHOLDER': 'Podaj numer ISBN',
        'ADD_NEW_BOOK_ISBN_HELPER': 'Musisz podać poprawny numer ISBN',
        'ADD_NEW_BOOK_SERIES_PLACEHOLDER': 'Podaj serie',
        'ADD_NEW_BOOK_AUTHOR_EMPTY_OPTION': 'Wybierz autora',
        'ADD_NEW_BOOK_AUTHOR_HELPER': 'Musisz wybrać autora książki',
        'ADD_NEW_BOOK_NEW_AUTHOR_BUTTON': 'Dodaj nowego autora',
        'ADD_NEW_BOOK_NEW_AUTHOR_HEADER': 'Nazwa autora',
        'ADD_NEW_BOOK_NEW_AUTHOR_PLACEHOLDER': 'Podaj nazwę autora',
        'BOOK_ADDED': "Dodano nową książkę",
        'BOOK_UPDATED': "Książka została zaktualizowana",
        'BOOK_SAVE_ERROR': "Wystąpił problem podczas zapisu książki",
        //  CATEGORIES
        'ADD_NEW_CATEGORY_PLACEHOLDER':  'Podaj nazwę nowej kategorii',
        'CATEGORIES_FILTER_PLACEHOLDER': 'Szukaj kategorii',
        'CATEGORIES': 'kategorie',
        // SERIES
        'ADD_NEW_SERIES_PLACEHOLDER':  'Podaj nazwę nowej serii',
        'SERIES_FILTER_PLACEHOLDER': 'Szukaj serii',
        'SERIES': 'serie',

        'GETTING_BOOK_LIST_ERROR': "Wystąpił błąd podczas pobierania listy książek",
        'DATA_COLLECTING_ERROR': "Wystąpił błąd podczas ładowania wymaganych danych z serwera",

        'CATEGORY_SAVED': "Dodano nową kategorie",
        'CATEGORY_SAVE_ERROR': "Wystąpił błąd podczas dodawania kategorii",
        'CATEGORY_UPDATED': "Zaktualizowano kategorie",
        'CATEGORY_UPDATE_ERROR': "Wystąpił błąd podczas aktualizacji kategorii",

        'SERIES_SAVED': "Dodano nową serię",
        'SERIES_SAVE_ERROR': "Wystąpił błąd podczas dodawania serii",
        'SERIES_UPDATED': "Zaktualizowano serię",
        'SERIES_UPDATE_ERROR': "Wystąpił błąd podczas aktualizacji serii",
        'ADD_NEW_BOOK_CATEGORY': "Podaj kategorie"
    });

    $translateProvider.preferredLanguage('pl');

}]);

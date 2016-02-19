/*
 * Dodanie/edycja książki
 */
app.controller('AddBookController', [ 'growl', 'authors', 'book', 'categories', 'series', 'BookService', '$state', function(growl, authors, book, categories, series, bookService, $state) {
	this.authors = authors;
	this.book = book;
	this.categories = categories;
	this.series = series;
	this.addAuthor = false;
	
	// zapis ksiazki - dodanie nowej lub update
	this.saveBook = function() {
		bookService.addBook(this.book).then(function() {
			$state.go('book-list');
			growl.info("Dodano nową książkę. Tytuł: " 
					+ book.name + " Autor: " 
					+ book.author.name ,{title: 'Dodanie książki'});
		}, function() {
			alert("Ups, coś poszło nie tak!");
		});
	};

	this.clearAuthor = function() {
		this.book.author = {};
	};

} ]);

/*
 * Dodanie/edycja książki
 */
app.controller('EditBookController', [ 'growl', 'authors', 'book', 'categories', 'series', 'BookService', '$state', function(growl, authors, book, categories, series, bookService, $state) {
	this.authors = authors;
	this.book = book;
	this.categories = categories;
	this.series = series;
	this.addAuthor = false;
	
	// zapis ksiazki - dodanie nowej lub update
	this.saveBook = function() {
		bookService.updateBook(this.book.id, this.book).then(function(book) {
			$state.go('book-list', {notify: false});
			growl.info("Zaktualizowano książkę. Tytuł: " 
					+ book.name + " Autor: " 
					+ book.author.name ,{title: 'Aktualizacja książki'});
		}, function() {
			alert("Ups, coś poszło nie tak!");
		});
	};
	
	for(var author of this.authors) {
		if(this.book.author.id === author.id) {
			this.book.author = author;
			break;
		}
	};
	
	if(this.book.series != null) {
		for(var seria of this.series) {
			if(this.book.series.id === seria.id) {
				this.book.series = seria;
				break;
			}
		}
	}

	this.clearAuthor = function() {
		this.book.author = {};
	};

} ]);



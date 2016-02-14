var app = angular.module('mybooks');

app.service('BookService', ['$http', '$q', function($http, $q) {
	this.getBook = function(bookId) {
		var deferred = $q.defer();
		$http.get('/api/books/' + bookId).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.getBooks = function() {
		var deferred = $q.defer();
		$http.get('/api/books').then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			deferred.reject(errorResponse);
		});
		return deferred.promise;	
	};
	this.addBook = function(book, newCategories) {
		for (newCategoryName of newCategories) {
			book.categories.push({name: newCategoryName});
		}
		var deferred = $q.defer();
		$http.post('/api/books', book).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	};
	this.updateBook = function(book, newCategories) {
		for (newCategoryName of newCategories) {
			book.categories.push({name: newCategoryName});
		}
		var deferred = $q.defer();
		$http.put('/api/books/' + book.id, book).then(function(response) {
			deferred.resolve(response.data);
		}, function(errorResponse) {
			console.log(errorResponse);
			deferred.reject(errorResponse);
		});
		return deferred.promise;		
	}
}]);

app.service('BookCategoriesService', function() {
	this.getBookCategory = function(book, category) {
		for (bookCategory of book.categories) {
			if (bookCategory.id === category.id) {
				return bookCategory;
			}
		}
		return;
	};

	this.toggleCategory = function(book, category) {
		var bookCategory = this.getBookCategory(book, category);
		if (bookCategory) {
			var index = book.categories.indexOf(bookCategory);
			if (index > -1) {
				book.categories.splice(index, 1);
			}
		} else {
			book.categories.push(category);
		}
	};

	this.isCategoryInBook = function(book, category, newCategories) {
		if (category.id) {
			return this.isExistingCategoryInBook(book, category);	
		}  else {
			return newCategories.indexOf(category.name) > -1;
		}
	};

	this.isExistingCategoryInBook = function(book, category) {
		var returnValue = false;
		if (this.getBookCategory(book, category)) {
			returnValue = true;
		}
		return returnValue;	
	};

	this.addCategory = function(newCategories, newCategory) {
		if (this.getNewCategoryIndex(newCategories, newCategory) === -1) {
			newCategories.push(newCategory);
		}
	};

	this.removeCategory = function(newCategories, newCategory) {
		var index = this.getNewCategoryIndex(newCategories, newCategory);	
		if (index > -1) {
			newCategories.splice(index, 1);
		}
	};

	this.getNewCategoryIndex = function(newCategories, newCategory) {
		return newCategories.indexOf(newCategory);
	};

});

app.controller('BookDetailsController', ['book', function(book) {
	this.book = book;
}]);


app.controller('BookListController', ['books', function(books) {
	this.books = books;
}]);

app.controller('AddBookController', ['authors', 'series', 'categories', 'BookService', 'BookCategoriesService', '$state', 'ngToast',
	function(authors, series, categories, bookService, bookCategoriesService, $state, ngToast) {
	this.saveBook = function() {
		bookService.addBook(this.book, this.newCategories).then(function() {
			$state.go('book-list');
			ngToast.success({
  				content: 'BOOK_ADDED_SUCCESS'
			});
		}, function() {
			alert('Błąd dodawania książki :(');
		})
	};
	this.resetAuthor = function() {
		this.book.author = {};
	}
	this.resetSeries = function() {
		this.book.series = {};
	}
	this.resetCategories = function() {
		this.book.categories = {};
	}

	this.getBookCategory = function(category) {
		return bookCategoriesService.getBookCategory(this.book, category);
	};

	this.isCategoryInBook = function(category) {
		return bookCategoriesService.isCategoryInBook(this.book, category, this.newCategories);
	};

	this.toggleCategory = function(category) {
		if (category.id) {
			bookCategoriesService.toggleCategory(this.book, category);	
		} 
	};

	this.removeCategory = function(newCategory) {	
		bookCategoriesService.removeCategory(this.newCategories, newCategory);
	}

	this.addCategory = function(newCategory) {
		bookCategoriesService.addCategory(this.newCategories, newCategory);
	};

	this.authors = authors;
	this.series = series;
	this.categories = categories;
	this.newCategories = [];
	this.book = { categories: []};
}]);

app.controller('EditBookController', ['authors', 'series', 'categories', 'book', 'BookService', 'BookCategoriesService', '$state',
	function(authors, series, categories, book, bookService, bookCategoriesService, $state) {
	this.saveBook = function() {
		bookService.updateBook(this.book, this.newCategories).then(function() {
			$state.go('book-list');
		}, function() {
			alert('Błąd edycji książki :(');
		})
	};
	this.resetAuthor = function() {
		this.book.author = {};
	};
	this.resetSeries = function() {
		this.book.series = {};
	};

	this.getBookCategory = function(category) {
		return bookCategoriesService.getBookCategory(this.book, category);
	};

	this.isCategoryInBook = function(category) {
		return bookCategoriesService.isCategoryInBook(this.book, category, this.newCategories);
	};

	this.toggleCategory = function(category) {
		if (category.id) {
			bookCategoriesService.toggleCategory(this.book, category);	
		} 
	};

	this.removeCategory = function(newCategory) {	
		bookCategoriesService.removeCategory(this.newCategories, newCategory);
	}

	this.addCategory = function(newCategory) {
		bookCategoriesService.addCategory(this.newCategories, newCategory);
	};

	this.authors = authors;
	this.series = series;
	this.categories = categories;
	this.newCategories = [];
	this.book = book;
	
	if (!this.book.categories) {
		this.book.categories = [];
	}

	for (author of this.authors) {
		if (this.book.author.id === author.id) {
			this.book.author = author;
			break;
		}
	};

	for (series of this.series) {
		if (this.book.series && this.book.series.id === series.id) {
			this.book.series = series;
			break;
		}
	};

}]);

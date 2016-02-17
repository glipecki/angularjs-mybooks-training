booksApp.controller('BookModifyController', ['$q',  '$filter', '$state', '$filter', 'book', 'authors','booksService', 'categories', 'toastr', 'series',
                                    function($q, $filter, $state, $filter, book, authors, booksService, categories, toastr, series) {

    var ctrl = this;

    this.addNewAuthorClicked = function() {
        if(this.addNewAuthor) {
            this.book.author = {};
        }
    }

    this.saveClicked = function(){
        promise = null;
        var translationKey = '';
        if(book.id) {
            translationKey = 'BOOK_UPDATED';
            promise = booksService.modifyBook(this.book);
        }  else {
            translationKey = 'BOOK_ADDED';
            promise = booksService.addNewBook(this.book);
        }
        promise.then(function(response) {
                toastr.success($filter('translate')(translationKey), ctrl.book.title);
                $state.go('bookListState');
            }, function(reason) {
                toastr.error($filter('translate')('BOOK_SAVE_ERROR'));
            }
        );
    }

    this.filteredCategories = function(query) {
        var deferred = $q.defer();
        deferred.resolve($filter('filter')(this.categories, query));
        return deferred.promise;
    };

    this.getSeriesName = function() {
        var result = [];
        for(serieObj in this.series) {
            result.push(serieObj.name);
        }
        return result;
    };

    suggest_state = function suggest_state(term) {
        var q = term.toLowerCase().trim();
        var results = [];
        console.log(ctrl.series  + ' ' + q);
        for (seriesIndex in ctrl.series) {
            var series = ctrl.series[seriesIndex];
            console.log(series.name  + ' ' + q);
            if (series.name.toLowerCase().indexOf(q) === 0) {
                results.push({ label: series.name, value: series.name, obj: series });
            }
        }
        console.log(results);
        return results;
    }

    this.autocomplete_options = {
        suggest: suggest_state,
        on_select: function (selected) {
            ctrl.book.series = selected.obj;
        }
    };

    this.addNewAuthor;
    this.book = book;
    this.authors = authors;
    this.categories = categories;
    this.series = series;

}]);

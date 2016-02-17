booksApp.service('booksService', ['$http',  '$q', function($http,  $q) {

    this.addNewBook = function(book) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/books',
            data: book
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.modifyBook = function(book) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/api/books/' + book.id,
            data: book
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.getBooks = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/books'
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    },

    this.getBook = function(bookId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/books/' + bookId
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

}]);

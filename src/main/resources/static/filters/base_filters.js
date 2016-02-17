booksApp.filter('capitalize', function() {
    return function(input) {
        firstChar = input.charAt(0).toUpperCase();
        return firstChar + input.substr(1);
    };
});

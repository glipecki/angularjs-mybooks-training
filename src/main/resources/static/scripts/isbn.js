var app = angular.module('mybooks');

app.service('IsbnService', function() {

	this.isValidIsbn = function(elem, value, ctrl) {
		if (!value || value && value.length < 10) {
			this.setValidity(ctrl, false);
			return value;
		}
		
		if (!ALLOWED_CHARS.test(value)) {
			this.setValidity(ctrl, false);
			return value;
		}
		var isbn = value.replace(/\D/g, '');
		if (isbn && isbn.length === 10) {
			this.checksum(isbn.split(''), ISBN10_WEIGHTS, 11, ctrl);
			return this.formatIsbn(isbn, elem);
		} else if (isbn && isbn.length === 13) {
			this.checksum(isbn.split(''), ISBN13_WEIGHTS, 10, ctrl);
			return this.formatIsbn(isbn, elem);
		} else {
			this.setValidity(ctrl, false);
			return isbn;
		}
	}

	this.formatIsbn = function(isbn, element, mod, ctrl) {
		var formatted = isbn;
		if (isbn && isbn.length === 10) {
			formatted =
				isbn.substring(0, 1) + SEPARATOR
				+ isbn.substring(1, 4) + SEPARATOR
				+ isbn.substring(4, 9) + SEPARATOR
				+ isbn.substring(9, 10);
		} else if (isbn && isbn.length === 13) {
			formatted =
				isbn.substring(0, 3) + SEPARATOR
				+ isbn.substring(3, 5) + SEPARATOR
				+ isbn.substring(5, 9) + SEPARATOR
				+ isbn.substring(9, 12) + SEPARATOR
				+ isbn.substring(12, 13);
		}
		element.val(formatted);
		return formatted;
	};

	this.checksum = function(array, weights, mod, ctrl) {
		var checksum = array
		.reduce(function(a, x, i){
			a.push([Number(x), weights[i]]);
			return a;
		}, [])
		.reduce(function(sum, a){
			return sum + a[0] * a[1];
		}, 0);
		if (checksum % mod === 0) {
			this.setValidity(ctrl, true);
		} else {
			this.setValidity(ctrl, false);
		}
	};

	this.setValidity = function(ctrl, valid) {
		ctrl.$setValidity(VALIDITY, valid);
	}

	var SEPARATOR = '-';
	var ALLOWED_CHARS = /^[0-9,-]*$/;
	var ISBN10_WEIGHTS = [10,9,8,7,6,5,4,3,2,1];
	var ISBN13_WEIGHTS = [1,3,1,3,1,3,1,3,1,3,1,3,1];
	var VALIDITY = 'isbnFormat';
});

app.directive('isbnFormat', ['IsbnService', function(isbnService) {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(value) {
				return isbnService.isValidIsbn(elm, value, ctrl);
			});
		}
	};
}]);

booksApp.directive('isbnValidation', function (){
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModel)   {
            ngModel.$parsers.unshift(function(value) {
                var trimedValue = value.replace(/ /g, '');
                console.log(trimedValue);
                var valid = false;
                if(trimedValue.length == 10) {
                    valid = validateIsbn10(trimedValue);
                } else if(trimedValue.length == 13) {
                    valid = validateIsbn13(trimedValue);
                }
                ngModel.$setValidity('invalidIsbn',  valid);
                return valid ? trimedValue : undefined;
            });
        }
    };

    function validateIsbn10(value) {
        var t = 0;
        var s = 0;
        for (i = 0; i < value.length; i++) {
            t += Number(value[i]);
            s += t;
        }
        return (s % 11 == 0) ? true : false;
    }

    function validateIsbn13(value) {
        var sum = 0, i;
        for(i = 0; i<12; i++) {
            var number = Number(value[i]);
            sum += (i % 2) ? 3*number : number;
        }
        var controllNumber = 10 - (sum % 10);
        return Number(value[12]) == controllNumber;
    }

});

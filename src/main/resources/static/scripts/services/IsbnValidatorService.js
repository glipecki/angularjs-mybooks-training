/**
 * Service
 * Validator jako serwis?
 */

app.service('IsbnValidatorService', [function() {
  this.validIsbn = function(subject){
    var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    if (regex.test(subject)) {
      var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
      var last = chars.pop();
      var sum = 0;
      var check, i;
      if (chars.length == 9) {
        chars.reverse();
        for (i = 0; i < chars.length; i++) {
          sum += (i + 2) * parseInt(chars[i], 10);
        }
        check = 11 - (sum % 11);
        if (check == 10) {
          check = "X";
        } else if (check == 11) {
          check = "0";
        }
      } else {
        for (i = 0; i < chars.length; i++) {
          sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
        }
        check = 10 - (sum % 10);
        if (check == 10) {
          check = "0";
        }
      }
      if (check == last) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}]);

/**
 * Service
 * Dostarcza spoko wyglądające alerty
 */

app.service('AlertService', [function() {
  this.addSuccess = function() {
    swal({title: "Dobra robota", text: "Właśnie dodałeś nową książkę", type: "success", timer: 2000, showConfirmButton: false});
  };
  this.editSuccess = function() {
    swal({title: "Dobra robota", text: "Właśnie uaktualniłeś swoją książkę", type: "success", timer: 2000, showConfirmButton: false});
  };
  this.addOrEditError = function() {
    swal({title: "Oops...", text: "Coś poszło nie tak", type: "error", timer: 2000, showConfirmButton: false});
  };
}]);

booksApp.controller('SeriesController', ['$scope', '$filter', 'toastr', 'seriesService', 'series',
                                    function($scope, $filter, toastr, seriesService, series) {

    $scope.addNewSeries = function()  {
        seriesService.addNewSeries({name: this.newSeriesName})
            .then(function(response) {
                $scope.series.push(response);
                $scope.newSeriesName =  '';
                toastr.success($filter('translate')('SERIES_SAVED'));
            }, function(reason) {
                toastr.error($filter('translate')('SERIES_SAVE_ERROR'));
            }
        );
    },

    $scope.changeSeriesName = function() {
        if(this.editingElement >= 0  && this.editingElementValue) {
            var oldName = series[this.editingElement].name
            series[this.editingElement].name = this.editingElementValue;
            seriesService.updateSeries(series[this.editingElement]).then(function(response) {
                    toastr.success($filter('translate')('SERIES_UPDATED'));
                }, function(reason) {
                    series[this.editingElement].name = oldName;
                    toastr.error($filter('translate')('SERIES_UPDATE_ERROR'));
                }
            );
        }
        this.editingElement = -1;
        this.editingElementValue = '';
    },

    $scope.changeEditingElement = function(index) {
        this.editingElement = index;
        this.editingElementValue = this.series[index].name;
    },

    $scope.editingElementValue = '';
    $scope.editingElement = -1;
    $scope.newSeriesName = '';
    $scope.series = series;

}]);

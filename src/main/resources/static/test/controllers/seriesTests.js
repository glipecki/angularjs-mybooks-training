describe('AddSeriesController', function() {
	var $controller;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(_$controller_, _SeriesService_) {
		$controller = _$controller_;
		seriesService = _SeriesService_;
	}));

	it('should add series via series service', function() {
		// given
		seriesServiceMock = {
			lastAddedSeries: null,
			addSeries: function(seriesToAdd) {
				this.lastAddedSeries = seriesToAdd;
				return { then: function() {}};
			}
		};

		addSeriesController = $controller('AddSeriesController', {
			SeriesService: seriesServiceMock
		});
		expectedSeries = {};

		// when
		addSeriesController.series = expectedSeries;
		addSeriesController.saveSeries();

		// then
		expect(seriesServiceMock.lastAddedSeries).not.toBeNull();
		expect(seriesServiceMock.lastAddedSeries).toBe(expectedSeries);

	});

	it('should add series via series service with data', function() {
		// given
		addSeriesController = $controller('AddSeriesController');
		expectedSeries = {
			name: 'Series 1'};
		spyOn(seriesService, 'addSeries').and.returnValue({ then: function() {} });

		// when
		addSeriesController.series = expectedSeries;
		addSeriesController.saveSeries();

		// then
		expect(seriesService.addSeries).toHaveBeenCalledWith(expectedSeries);
	});
});
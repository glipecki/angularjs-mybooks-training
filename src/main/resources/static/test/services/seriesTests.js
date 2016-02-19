describe('SeriesService', function() {

	var seriesService, $httpBackend, $rootScope;

	beforeEach(module('mybooks'));

	beforeEach(inject(function(SeriesService, _$httpBackend_, _$rootScope_) {
		seriesService = SeriesService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
	}));

	it('should return promise as result', function() {
		// when
		response = seriesService.getOneSeries(1);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	});

	it('should get series', function() {
		// prepare mocks
		$httpBackend.when('GET', '/api/series/1').respond(200, {id: 1, name: 'Seria'});

		// when
		responsePromise = seriesService.getOneSeries(1);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Seria');
			expect(response.id).toEqual(1);
		});

		// flush pending operations
		$httpBackend.flush();
	});

	it('should return promise when posting a series', function() {
		// given
		var series = { name : 'Series 1'};

		// then
		response = seriesService.addSeries(series);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
		
	});


	it('should post a series', function() {
		// prepare mocks
		var series;
		$httpBackend.when('POST', '/api/series').respond(201, {id: 1, name: 'Series 1'});

		// when
		responsePromise = seriesService.addSeries(series);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Series 1');
			expect(response.id).toEqual(1);
		});

		// flush pending operations
		$httpBackend.flush();
	});

	it('should return promise when putting a series', function() {
		// given
		var series = { name : 'Series 1' };

		// then
		response = seriesService.updateSeries(series);

		// then
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	});

	it('should put a series', function() {
		// prepare mocks
		var series = { name : 'Series 2', id: 2};
		$httpBackend.when('PUT', '/api/series/2').respond(200, {id: 2, name: 'Series 2'});

		// when
		responsePromise = seriesService.updateSeries(series);

		// then
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Series 2');
		});

		// flush pending operations
		$httpBackend.flush();
	});

});

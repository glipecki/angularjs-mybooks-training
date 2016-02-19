describe('Warmup tests', function() {
	it('should assert truthy', function() {
		expect(true).toBeTruthy();
	})
});

describe('SeriesService', function() {
	var seriesService, $httpBackend, $rootScope;
	
	beforeEach(module('app'));
	
	beforeEach(inject(function(SeriesService, _$httpBackend_, _$rootScope_) {
		seriesService = SeriesService;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		
	}));
	
	it('[get series] should return promisse as result', function() {
		response = seriesService.getSeries();
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('[add seria] should return promisse as result', function() {
		response = seriesService.addSeria();
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('[update seria] should return promisse as result', function() {
		response = seriesService.updateSeria(1);
		
		expect(response).not.toBeNull();
		expect(response.catch).not.toBeNull();
	})
	
	it('should get list of series', function() {
		$httpBackend.when('GET', '/api/series/').respond(200, [{ id: 1, name: 'Seria 1'}, { id: 2, name: 'Seria 2'}]);
		
		responsePromise = seriesService.getSeries();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response[0].name).toBe('Seria 1');
			expect(response[1].name).toBe('Seria 2');
		});
		
		$httpBackend.flush();
	});
	
	it('should add seria', function() {
		$httpBackend.when('POST', '/api/series').respond(200, {id: 1, name: 'Seria 1'});
		
		responsePromise = seriesService.addSeria();
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Seria 1');
		});
		
		$httpBackend.flush();
	});
	
	it('should edit seria', function() {
		$httpBackend.when('PUT', '/api/series/' + '1',{id: 1, name: 'Seria 1'}).respond(200, {id: 1, name: 'Seria 1'});
		responsePromise = seriesService.updateSeria(1, {id: 1, name: 'Seria 1'});
		
		responsePromise.then(function(response) {
			expect(response).not.toBeNull();
			expect(response.name).toBe('Seria 1');
		});
		
		$httpBackend.flush();
	});
});
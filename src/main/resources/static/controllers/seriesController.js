/*
 * Kontroler zarządzający seriami wydawniczymi
 */
app.controller('SeriaController', ['growl', 'series', 'SeriesService', '$state', function(growl, series, seriesService, $state) {
	this.series = series;
	this.editItemName = "";
	this.saveItem = function() {
		if(this.validateSeries(this.addNewItem)) {
			this.seria.name =  this.addNewItem;
			seriesService.addSeria(this.seria).then(function() {
				$state.reload();
				$state.go('series-list', {}, { reload: true });
			}, function() {
				alert("Ups, coś poszło nie tak!");
			});
		}
	};
	
	this.validateSeries = function(name) {
		if(this.series != null) {
			for(var seria of this.series) {
				console.log(seria.name + " -- " + name);
				if(name === seria.name) {
					growl.error("Podana Seria Wydawnicza już istnieje!",{title: 'Błąd!'});
					return false;
				}
			}
		}
		return true;
	}

	this.showInput = function(id) {
		return this.seriaId === id;
	}
	this.startEditItem = function(seria) {
		this.seria = seria;
		this.seriaId = seria.id;
		this.editItemName = this.seria.name;
	}
	
	this.cancelEditItem = function(seria) {
		this.seria = {};
		this.seriaId = 0;
		this.editItemName = "";
	}
	
	this.updateItem = function() {
		this.seria.name = this.editItemName;
		seriesService.updateSeria(this.seria.id, this.seria).then(function() {
			$state.go('series-list', {}, { reload: true });
		}, function() {
			alert("Ups, coś poszło nie tak!");
		});
	};
	
	this.seria = {};
} ]);

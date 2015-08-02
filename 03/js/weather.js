(function() {

	'use strict';

	var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=sk&q=Bratislava';
	var elements = {};

	function getWeatherClassName(icon) {
		switch(icon) {
			case '01d':
				return 'wi-day-sunny';
			case '01n':
				return 'wi-night-clear';
			case '02d':
				return 'wi-day-sunny-overcast';
			case '02n':
				return 'wi-night-partly-cloudy';
			case '03d':
			case '03n':
				return 'wi-cloud';
			case '04d':
			case '04n':
				return 'wi-cloudy';
			case '09d':
			case '09n':
				return 'wi-showers';
			case '10d':
				return 'wi-day-rain';
			case '10n':
				return 'wi-night-rain';
			case '11d':
			case '11n':
				return 'wi-thunderstorm';
			case '13d':
			case '13n':
				return 'wi-snow';
			case '50d':
			case '50n':
				return 'wi-fog';
			default:
				return 'wi-alien';
		}
	}

	function cacheElements() {
		elements.weather = $('#weather');
		elements.progress = elements.weather.find('.progress');
		elements.degrees = elements.weather.find('.degrees');
		elements.description = elements.weather.find('.description');
		elements.icon = elements.weather.find('.icon');
		elements.refresh = elements.weather.find('.refresh');
	}

	function refreshUi(loading, data) {
		if(loading) {
			elements.degrees.html('&nbsp;');
			elements.description.html('&nbsp;');
			elements.icon.hide();
			elements.progress.css('visibility', 'visible');
		} else {
			elements.progress.css('visibility', 'hidden');
			if(data) {
				elements.description.text(data.weather && data.weather.length && data.weather[0].description ? data.weather[0].description : 'N/A');
				elements.degrees.text(data.main && typeof data.main.temp !== undefined ? Math.round(data.main.temp) + '°C' : 'N/A');
				if(data.weather && data.weather.length && data.weather[0].icon) {
					elements.icon.addClass(getWeatherClassName(data.weather[0].icon)).show();
				}
			} else {
				elements.description.text('N/A');
				elements.degrees.text('N/A');
			}
		}
	}

	function refresh() {
		refreshUi(true);

		$.ajax({
			method: 'GET',
			url: weatherUrl,
			success: function(data) {
				refreshUi(false, data);
			},
			error: function() {
				refreshUi(false);
			}
		});
	}

	$(document).ready(function() {
		cacheElements();
		elements.refresh.on('click', refresh);
		refresh();
	});

})();

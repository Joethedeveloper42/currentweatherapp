
init();

var tempDisplay = "celcius";


function init() {if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
		var lat  = position.coords.latitude;
		var long = position.coords.longitude;
		getWeather(lat, long);
});
} else {
	console.log("no data available");
  }
}

$("#change-temp-button").click(function(){
	changeTempToFah();
});


function getWeather(lat, long) {
	var urlString = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
	$("#current-lat").html(lat);
	$("#current-long").html(long);
	$.ajax({
		url: urlString,
		success: function(result){
			$("#city-name").text(result.name);
			$("#country").text(result.sys.country);
			$("#description").text(result.weather[0].main);
			$("#current-temp").text(result.main.temp + "°C");
			$("#humidity").text(result.main.humidity + "%");
			weatherIcon(result.weather[0].main);

		}
	});
}

function weatherIcon(weather) {
	var weather = weather.toLowerCase();
	switch (weather) {
		case 'clouds':
		$("#cloudy-weather").addClass("cloudy")
		break;
		case 'rain':
		$("#rainy-weather").addClass("rainy")
		break;
		case 'clear':
		$("#sunny-weather").addClass("sunny")
		break;
		case 'thunderstorm':
		$("#cloudy-weather").addClass("stormy")
		break;
		case 'snow':
		$("#snowy-weather").addClass("snowy")
		break;
		default:
		$("#sunny-weather").addClass("sunny")
		break;
	}
}


function changeTempToFah(){

	if(tempDisplay === "celcius") {
	var text = $("#current-temp").text();
	var number = parseInt(text, 10);
	var fahTemp = Math.round(number * 9 / 5 + 32);
	tempDisplay = "fahrenheit";
	$("#current-temp").hide();
	$("#current-temp-fah").text(fahTemp + "°F");
	} else {
	var text = $("#current-temp-fah").text();
	var number = parseInt(text, 10);
	var celTemp = Math.round((number-32) * 5 / 9 );
	tempDisplay = "celcius";
	$("#current-temp").hide();
	$("#current-temp-fah").text(celTemp + "°C");
	}
	
}










function getDay(dayIndex) {
  var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return dayNames[dayIndex];
}

function toggleUnits() {
  if ($("#units").text() === "Farenheit")
    $("#units").text("Celsius");
  else
    $("#units").text("Farenheit");
}

function getFormattedTemp(temp) {
  return temp.toFixed(1) + "°" + $("#units").text()[0];
}

function getDayNightSuffix() {
  return "-n";
}

function getCurrentWeather(lat, lon) {
  //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
  var url = BASE_URL + "weather";
  url += "?lat=" + lat;
  url += "&lon=" + lon;
  url += "&mode=json";
  url += "&appid=" + API_KEY;
  url += "&units=" + ($("#units").text() === "Farenheit" ? "imperial" : "metric");

    // today
  $.getJSON(url, function(data) {
    $("#city").text(data.name);
    $("#today-icon").html("<i class='owf owf-" + data.weather[0].id + getDayNightSuffix() + " owf-5x'></i>");
    var weather1 = "Temp " + getFormattedTemp(data.main.temp);
    weather1 += " " + data.weather[0].main + " (" + data.weather[0].description + ")";
    $("#today-weather1").text(weather1);
    var weather2 = "Min " + getFormattedTemp(data.main.temp_min) + " Max " + getFormattedTemp(data.main.temp_max);
    $("#today-weather2").text(weather2);
  });
}

function getForecast(lat, lon) {
  var url = BASE_URL + "forecast/daily";
  url += "?lat=" + lat;
  url += "&lon=" + lon;
  url += "&cnt=12";
  url += "&mode=json";
  url += "&appid=" + API_KEY;
  url += "&units=" + ($("#units").text() === "Farenheit" ? "imperial" : "metric");

  //url = "data/16day.json";
  $.getJSON(url, function(data) {
    $(data.list).each(function(i, item) {
      var html = "";
      var dt = new Date(item.dt*1000);
      html += "<h4>" + getDay(dt.getDay()) + " " + dt.getDate() + "</h4>";
      html += "<i class='owf owf-" + item.weather[0].id + " owf-3x'></i>"
      html += item.weather[0].main + "<br/><span class='small'>" + item.weather[0].description + "</span><br/>";
      html += "<div><span class='small'>Min </span>" + getFormattedTemp(item.temp.min) + "<div>";
      html += "<div><span class='small'>Max </span>" + getFormattedTemp(item.temp.max) + "<div>";
      $("#day" + (i+1)).html(html);
    });
  });
}

function load() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getCurrentWeather(position.coords.latitude, position.coords.longitude);
      getForecast(position.coords.latitude, position.coords.longitude);
    });
  } else {
    getForecast(50, 50);
  }
}

var API_KEY = "1f4a7f8fe44f77538c509909c14c2f1c";
var BASE_URL = "http://api.openweathermap.org/data/2.5/";

$(document).ready(function() {
  load();

  $("#units").on("click", function() {
    toggleUnits();
    load();
  });
});
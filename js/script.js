$(document).ready(function () {
    weatherApp = {
        $targetArea : $("#weather"),
        weatherApiKey : "",
        localStorageKey : "openWeatherApi",
        getFormData : function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "" ) {
                weatherApp.weatherApiKey = $("#apikey").val().trim();                
                weatherApp.saveApiKey();
            }
            var zip = $("#zip").val().trim();
            zip = zip.trim();
            if (zip === null || zip.length < 5) {
                weatherApp.$targetArea.html("Enter a zip code.");
            } else {
                weatherApp.getWeatherData(zip);
            }

            console.log(apikey);
            console.log(zip);
        },
        
        getWeatherData : function (zipcode) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url,function (data) {
                if (data.cod === 200){                    
               weatherApp.$targetArea.html("Success!");
                    weatherDesc = data.weather[0].description;
                    console.log(weatherDesc);
                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                }
            }).fail( function() {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
        },
        loadApiKey : function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
            } 
            else {
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "" ) {
                    //weatherApp.$targetArea.html("Sorry, no api key was found.");
                    return false;
                } 
                return true;
            }
        },
        saveApiKey : function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
            } 
            else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "" ) {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        }
    }
    
    $("#submit").click(function () {
        weatherApp.getFormData();
        return false;
    });
    if ( weatherApp.loadApiKey() ) {
        $("#apidiv").attr("class", "hide");
    }
});
let content = document.querySelector('meta[name="Town"]').content;

const baseURL = "https://byui-cit230.github.io/weather/data/towndata.json";

const upcomingEvents = async (key, value) => {
  try {
    const response = await fetch(`${baseURL}`);
    const wholeResponse = await response.json();
    let theList = wholeResponse[key];
    theList.forEach((element) => {
      if (element.name === value) {
        let event1 = document.querySelector(".title-town1");
        let event2 = document.querySelector(".title-town2");
        let event3 = document.querySelector(".title-town3");

        event1.innerHTML = element.events[0];
        event2.innerHTML = element.events[1];
        event3.innerHTML = element.events[2];
      }
    });
    return theList;
  } catch (error) {
    console.log(error);
  }
};

let apiWeather;
let forecast;

if (content === "Preston") {
  apiWeather =
    "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=cf30318bd54f960f230ff68f267c710d";

  forecast =
    "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=cf30318bd54f960f230ff68f267c710d";
  upcomingEvents("towns", "Preston");
} else if (content === "Soda Springs") {
  apiWeather =
    "https://api.openweathermap.org/data/2.5/weather?id=5607916&units=imperial&APPID=cf30318bd54f960f230ff68f267c710d";

  forecast =
    "https://api.openweathermap.org/data/2.5/forecast?id=5607916&units=imperial&appid=cf30318bd54f960f230ff68f267c710d";
  upcomingEvents("towns", "Soda Springs");
} else if (content === "Fish Haven") {
  apiWeather =
    "https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&APPID=cf30318bd54f960f230ff68f267c710d";

  forecast =
    "https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&appid=cf30318bd54f960f230ff68f267c710d";
  upcomingEvents("towns", "Fish Haven");
}

const weatherApi = async () => {
  try {
    const response = await fetch(apiWeather);
    const wholeResponse = await response.json();
    let windSpeed = wholeResponse.wind.speed;
    let mainTemp = wholeResponse.main.temp;
    let humidity = wholeResponse.main.humidity;
    let currently = wholeResponse.weather[0].main;

    document.querySelector(".currently").textContent = currently;
    document.querySelector(".hight").textContent = mainTemp;
    document.querySelector(".humidity").textContent = humidity;
    document.querySelector(".wind").textContent = windSpeed;

    const farenheit = mainTemp;
    const wind = windSpeed;
    let calculation = document.querySelector(".windchill");

    const windchill =
      35.74 +
      0.6215 * farenheit -
      35.75 * wind ** 0.16 +
      0.4275 * farenheit * wind ** 0.16;

    if (farenheit <= 50 && wind >= 4.8) {
      calculation.textContent = Math.round(windchill);
    } else {
      calculation.textContent = "N/A";
    }
  } catch (error) {
    console.log(error);
  }
};

const forecastURI = async () => {
  try {
    const response = await fetch(forecast);
    const wholeResponse = await response.json();
    let fiveForecast = wholeResponse.list.filter((item) =>
      item.dt_txt.includes("18:00:00")
    );
    fiveForecast.forEach((item, index) => {
      let milliseconds = item.dt * 1000;
      let dayShort = new Date(milliseconds).toLocaleString("en-US", {
        weekday: "short",
      });
      document.querySelector(`#day${index}`).textContent = dayShort;
      let imagesrc =
        "https://openweathermap.org/img/w/" + item.weather[0].icon + ".png";
      document.querySelector(`#img-${index}`).setAttribute("src", imagesrc);
      let temperature = item.main.temp;
      document.querySelector(
        `#temperature${index}`
      ).textContent = `${temperature}°F`;
    });
  } catch (error) {
    console.log(error);
  }
};

forecastURI();
weatherApi();

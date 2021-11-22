const today = new Date();
const year = today.getFullYear();
const day = today.getDay();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const baseURL = "https://byui-cit230.github.io/weather/data/towndata.json";
const apiWeather =
  "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=cf30318bd54f960f230ff68f267c710d";

const forecast =
  "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=cf30318bd54f960f230ff68f267c710d";

const imagesDataSrc = document.querySelectorAll("img[data-src]");
const daysVisited = document.querySelector(".days-visited");

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

    const farenheit = document.querySelector(".hight").textContent;
    const wind = document.querySelector(".wind").textContent;
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

document.querySelector(".formatted-time").textContent =
  today.toLocaleDateString("en-UK", options);

const hamburger = document.querySelector(".ham");
const mainnav = document.querySelector(".navigation");

hamburger.addEventListener(
  "click",
  () => {
    mainnav.classList.toggle("responsive");
  },
  false
);

window.onresize = () => {
  if (window.innerWidth > 600) mainnav.classList.remove("responsive");
};

const banner = () => {
  document.querySelector(".hide").style.display = "block";
};

if (day == 5) {
  banner();
}

const townApi = async (key, value, nameImage) => {
  try {
    const response = await fetch(`${baseURL}`);
    const wholeResponse = await response.json();
    let theList = wholeResponse[key];
    theList.forEach((element) => {
      if (element.name === value) {
        console.log(element.photo);
        console.log(typeof element.photo);

        const theCard = document.createElement("div");
        theCard.setAttribute("class", "card");
        let information = document.createElement("div");
        let h2 = document.createElement("h2");
        let motto = document.createElement("p");
        motto.setAttribute("class", "motto-card");
        let yearFounded = document.createElement("p");
        yearFounded.setAttribute("class", "par-card");
        let population = document.createElement("p");
        population.setAttribute("class", "par-card");
        let averageRainFall = document.createElement("p");
        averageRainFall.setAttribute("class", "par-card");
        let image = document.createElement("img");
        h2.innerHTML = element.name;
        motto.innerHTML = element.motto;
        yearFounded.innerHTML = `Year Founded: ${element.yearFounded}`;
        population.innerHTML = `Population: ${element.currentPopulation}`;
        averageRainFall.innerHTML = `Annual Rain Fall: ${element.averageRainfall}`;
        image.setAttribute("src", `images/${nameImage}`);
        image.setAttribute("alt", `${element.name}'s photo`);
        image.setAttribute("class", "card-photo");
        information.appendChild(h2);
        information.appendChild(motto);
        information.appendChild(yearFounded);
        information.appendChild(population);
        information.appendChild(averageRainFall);
        theCard.appendChild(information);
        theCard.appendChild(image);
        document.querySelector("section.the-section").appendChild(theCard);
      }
    });
    return theList;
  } catch (error) {
    console.log(error);
  }
};

townApi("towns", "Fish Haven", "fish-haven.webp");
townApi("towns", "Preston", "preston.webp");
townApi("towns", "Soda Springs", "soda-idaho.webp");

weatherApi();

function adjustRating(rating) {
  document.getElementById("ratingvalue").innerHTML = rating;
}

function selectResponse() {
  const s = document.querySelector("#selected");
  const sel = document.querySelector("#selectbrowser");
  s.style.display = "block";
  s.textContent = sel.value;
}

document.addEventListener("DOMContentLoaded", () => {
  populateStorage();
});

const populateStorage = () => {
  try {
    let theDay = localStorage.getItem("daysVisited");
    if (theDay != timestamp) {
      // (1.000 milisecondss x 60 seconds x 60 minutes x 24 hours)
      let days = Math.round((timestamp - theDay) / 86400000);
      daysVisited.textContent = `Days between your last visit and this one: ${days}`;
      setStyles();
    }
  } catch (er) {
    setStyles();
  }
};

const setStyles = () => {
  localStorage.setItem("daysVisited", timestamp);
};

const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesDataSrc.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesDataSrc.forEach((img) => {
    loadImages(img);
  });
}

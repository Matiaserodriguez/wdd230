const hamburger = document.querySelector(".ham");
const mainnav = document.querySelector(".navbar-items");
const baseURL =
  "https://matiaserodriguez.github.io/wdd230/lesson12-13-14/json/stores.json";

const oneCallApi =
  "https://api.openweathermap.org/data/2.5/onecall?lat=-34.61315&lon=-58.37723&units=metric&exclude=minutely,hourly&appid=cf30318bd54f960f230ff68f267c710d";

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

const weatherApi = async () => {
  try {
    const response = await fetch(`${oneCallApi}`);
    const wholeResponse = await response.json();
    let currentTemp = wholeResponse.current.temp;
    let currentHum = wholeResponse.current.humidity;
    let currentDescription = wholeResponse.current.weather[0].description;
    let milliseconds = wholeResponse.current.dt * 1000;
    let dayShort = new Date(milliseconds).toLocaleString("en-US", {
      weekday: "short",
    });
    let imagesrc =
      "https://openweathermap.org/img/w/" +
      wholeResponse.current.weather[0].icon +
      ".png";

    document.querySelector(".imageT").setAttribute("src", imagesrc);
    document.querySelector(".temperatureT").textContent = `${currentTemp}°C`;
    document.querySelector(".humidityT").textContent = `${currentHum}%`;
    document.querySelector(
      ".descriptionT"
    ).textContent = `${currentDescription}`;

    wholeResponse.daily.slice(1, 4).forEach((element) => {
      let card = document.createElement("div");
      let max = document.createElement("p");
      let min = document.createElement("p");

      let milliseconds = element.dt * 1000;
      let dayShort = new Date(milliseconds).toLocaleString("en-US", {
        weekday: "short",
      });

      console.log(element);
      card.textContent = dayShort;
      max.textContent = `↟ Max: ${element.temp.max}°C`;
      min.textContent = `↡ Min: ${element.temp.min}°C`;

      card.appendChild(min);
      card.appendChild(max);

      console.log(card);

      let newCard = document.querySelector(".container-weather");
      newCard.appendChild(card);
    });
    // console.log(wholeResponse);
  } catch (err) {
    console.log(err);
  }
};

weatherApi();

const storesJSON = async (key) => {
  try {
    const response = await fetch(`${baseURL}`);
    const wholeResponse = await response.json();
    let theList = wholeResponse[key];
    if (document.querySelector('meta[name="Page"]').content == "Home") {
      theList.slice(0, 3).forEach((element) => {
        // console.log(element);
        const sectionCards = document.querySelector(".container-home");
        const theCard = document.createElement("div");
        theCard.setAttribute("class", "card");
        let h3 = document.createElement("h3");
        let image = document.createElement("img");
        let link = document.createElement("p");
        h3.innerHTML = element.name;
        image.setAttribute("src", `images/${element.logo}`);
        image.setAttribute("alt", `${element.name}'s photo`);
        link.innerHTML = `<a href="${element.link}">${element.name}'s page<a>`;
        theCard.appendChild(h3);
        theCard.appendChild(image);
        theCard.appendChild(link);
        sectionCards.appendChild(theCard);
      });
    } else {
      theList.forEach((element) => {
        // console.log(element);
        const sectionCards = document.querySelector(".container-home");
        const theCard = document.createElement("div");
        theCard.setAttribute("class", "card");
        let h3 = document.createElement("h3");
        let image = document.createElement("img");
        let link = document.createElement("p");
        h3.innerHTML = element.name;
        image.setAttribute("src", `images/${element.logo}`);
        image.setAttribute("alt", `${element.name}'s photo`);
        link.innerHTML = `<a href="${element.link}">${element.name}'s page<a>`;
        theCard.appendChild(h3);
        theCard.appendChild(image);
        theCard.appendChild(link);
        sectionCards.appendChild(theCard);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

storesJSON("stores");

const bigContainer = document.querySelector(".big-container");
const point = document.querySelectorAll(".point");

point.forEach((element, i) => {
  point[i].addEventListener("click", () => {
    let position = i;
    let operation = position * -20;

    bigContainer.style.transform = `translateX(${operation}%)`;
    point.forEach((element, i) => {
      point[i].classList.remove("active");
    });
    point[i].classList.add("active");
  });
});

const containerHome = document.querySelector(".container-home");
const grid = document.querySelector(".grid-directory");
const list = document.querySelector(".list-directory");

list.addEventListener("click", () => {
  containerHome.classList.add("directory-list");
});

grid.addEventListener("click", () => {
  containerHome.classList.remove("directory-list");
});

const popup = document.querySelector(".popup");
const close = document.querySelector(".close");

window.onload = () => {
  setTimeout(() => {
    popup.style.display = "block";
  }, 3000);
};

close.addEventListener("click", () => {
  popup.style.display = "none";
});

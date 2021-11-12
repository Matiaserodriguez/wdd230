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

const townApi = async (key, value) => {
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
        image.setAttribute("src", element.photo);
        image.setAttribute("alt", `${element.name}'s photo`);
        theCard.appendChild(h2);
        theCard.appendChild(motto);
        theCard.appendChild(yearFounded);
        theCard.appendChild(population);
        theCard.appendChild(averageRainFall);
        theCard.appendChild(image);
        document.querySelector("section.the-section").appendChild(theCard);
      }
    });
    return theList;
  } catch (error) {
    console.log(error);
  }
};

townApi("towns", "Fish Haven");
townApi("towns", "Preston");
townApi("towns", "Soda Springs");

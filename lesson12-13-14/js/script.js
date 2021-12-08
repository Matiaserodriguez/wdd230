const hamburger = document.querySelector(".ham");
const mainnav = document.querySelector(".navbar-items");
const baseURL =
  "https://matiaserodriguez.github.io/wdd230/lesson12-13-14/json/stores.json";

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

const storesJSON = async (key) => {
  try {
    const response = await fetch(`${baseURL}`);
    const wholeResponse = await response.json();
    let theList = wholeResponse[key];
    theList.forEach((element) => {
      console.log(element);
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
      // image.setAttribute("class", "card-photo");
      theCard.appendChild(h3);
      theCard.appendChild(image);
      theCard.appendChild(link);
      sectionCards.appendChild(theCard);
    });
    return theList;
  } catch (error) {
    console.log(error);
  }
};

storesJSON("stores");

const today = new Date();
const year = today.getFullYear();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
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

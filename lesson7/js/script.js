const imagesDataSrc = document.querySelectorAll("img[data-src]");
const daysVisited = document.querySelector(".days-visited");

const today = new Date();
const year = today.getFullYear();
const day = today.getDay();

const timestamp = today.getTime();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

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

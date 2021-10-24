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

console.log(windchill);

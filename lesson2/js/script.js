const today = new Date();
const year = today.getFullYear();
const modified = document.lastModified;
const lastUpdated = document.querySelector(".last-updated");

document.getElementById("date-and-time").textContent = year;

lastUpdated.textContent = `Last Updated ${modified}`;

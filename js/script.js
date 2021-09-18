// get the Current Date
const today = new Date();

// get the day, month and year
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

// get the hours, minutes and seconds
const hours = today.getHours();
const minutes = today.getMinutes();
const seconds = today.getSeconds();

const modified = document.lastModified;

// takes the last-updated class from html
const lastUpdated = document.querySelector(".last-updated");

document.getElementById("date-and-time").textContent = year;

lastUpdated.textContent = `Last Updated ${modified}`;

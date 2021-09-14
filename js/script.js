const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sutarday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const todaysDate = new Date();
const dayName = dayNames[todaysDate.getDay()];
const monthName = months[todaysDate.getMonth()];
const year = todaysDate.getFullYear();

const currentDate = `Today's date is ${dayName} ${todaysDate.getDate()}/${monthName}/${year}`;

document.getElementById("date-and-time").textContent = currentDate;

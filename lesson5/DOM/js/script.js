const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const uList = document.querySelector(".list");
const wrongMessage = document.querySelector(".wrong-message");

const bookOfMormon = {
  FirstNephi: 22,
  SecondNephi: 33,
  Jabob: 7,
  Enos: 1,
  Jarom: 1,
  Omni: 1,
  WordsofMormon: 1,
  Mosiah: 29,
  Alma: 63,
  Helaman: 16,
  ThirdNephi: 30,
  FourthNephi: 1,
  Mormon: 9,
  Ether: 15,
  Moroni: 10,
};

button.addEventListener("click", () => {
  const li = document.createElement("li");
  const but = document.createElement("button");

  // please, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  // creates a new variable from the input value
  const inputItself = input.value;
  // replaces the numbers of the given input and strips spaces
  const inputNoNumbers = inputItself.replace(/[0-9\s]/g, "").trim();
  // gets the range of the number of chapters of the given book
  const rangeInput = range(1, bookOfMormon[inputNoNumbers] + 1, 1);
  // gets only the number of the chapter
  const numberInput = inputItself.replace(/[^\d.-]/g, "");

  if (
    bookOfMormon[inputNoNumbers] !== undefined &&
    rangeInput[numberInput] !== undefined
  ) {
    li.textContent = input.value;
    uList.appendChild(li);
    but.textContent = "❌";
    li.appendChild(but);
    input.value = "";
    wrongMessage.style.display = "none";
  } else {
    wrongMessage.style.display = "block";
  }

  but.onclick = function (e) {
    uList.removeChild(li);
  };

  input.focus();
});

const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const uList = document.querySelector(".list");

button.addEventListener("click", () => {
  const li = document.createElement("li");
  const but = document.createElement("button");
  li.textContent = input.value;
  uList.appendChild(li);
  but.textContent = "❌";
  li.appendChild(but);

  but.onclick = function (e) {
    uList.removeChild(li);
  };

  input.focus();
});

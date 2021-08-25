// variables
let colors = document.querySelectorAll(".color"),
realcolors = [...colors];
const container = document.querySelector(".container"),
h2 = document.querySelector("h2"),
code = document.querySelector(".code"),
remove = document.querySelector(".remove"),
add = document.querySelector(".add");
window.values = [];
window.gradientValue = "";

function refresh() {
colors = document.querySelectorAll(".color");
realcolors = [...colors];
}

function getValues() {
refresh();
for (let i = 0; i < realcolors.length; i++) {
  realcolors[i].setAttribute("data-color", realcolors[i].value);
  window.values[window.values.length] =
    realcolors[i].getAttribute("data-color");
  window.gradientValue = window.values.join(",");

  realcolors[i].addEventListener("change", () => {
    realcolors[i].setAttribute("data-color", realcolors[i].value);
    window.values = [];
    getValues();
    excute();
  });
}
}

function excute() {
document.body.style.backgroundImage = `linear-gradient(to right, ${window.gradientValue} )`;
h2.style.backgroundImage = `linear-gradient(to right, ${window.values
  .reverse()
  .join(",")} )`;
code.innerHTML = document.body.style.backgroundImage;
}

function createItems() {
let newColor = document.createElement("input");
newColor.setAttribute("type", "color");
newColor.setAttribute("class", "color");
newColor.setAttribute("data-color", newColor.value);
container.appendChild(newColor);
}

function createColor() {
createItems();
window.values = [];
getValues();
excute();
}
function removecolor() {
refresh();
if (realcolors.length > 2) {
  document.querySelector(".container input:last-child").remove();
  window.values = [];
  getValues();
  excute();
}
}

getValues();
excute();
add.addEventListener("click", createColor);
remove.addEventListener("click", removecolor);


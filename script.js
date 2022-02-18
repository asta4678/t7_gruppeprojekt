const url = "https://dynamiskwebgruppe-47ce.restdb.io/rest/ajowebsite";
const key = "620f579e34fd621565858797";
const main = document.querySelector("main");
const temp = document.querySelector("template");
const modal = document.querySelector("#modal");
let items = [];
let filter = "alle";
const filterKnapper = document.querySelectorAll("button");
const header = document.querySelector("h1");

document.addEventListener("DOMContentLoaded", start);

function start() {
  filterKnapper.forEach((knap) => {
    knap.addEventListener("click", setFilter);
  });
  hentData();
}

function setFilter() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  header.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
  vis();
}

async function hentData() {
  const respons = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": key,
    },
  });
  items = await respons.json();
  console.log(items);
  vis();
}

function vis() {
    console.log(items);
    main.innerHTML = "";
    items.forEach((item) => {
      if (filter == item.kategori || filter == "alle") {
        let klon = temp.cloneNode(true).content;
        klon.querySelector(".billede").src =
          "billeder/" + item.billednavn + "-md.jpg";

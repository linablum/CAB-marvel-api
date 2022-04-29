function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + API_KEY_PRIVATE_2 + API_KEY_PUBLIC_2);
  return `apikey=${API_KEY_PUBLIC_2}&ts=${timestamp}&hash=${md5Hash}`;
}

let url =
  "http://gateway.marvel.com/v1/public/characters?" +
  getHash() +
  "&limit=100&offset=";

let urls = [];
for (let i = 0; i < 300; i += 100) {
  urls.push(url + i);
}

async function fetchCharacters() {
  try {
    const allArray = [];
    const data = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            allArray.push(...res.data.results);
          })
      )
    );
    console.log("allArray", allArray);
    clickCheckbox();
    //filterEvents(allArray);
  } catch (err) {
    console.log(err);
  }
}

fetchCharacters();

function clickCheckbox(allArray) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterEvents(allArray);
    });
  });
}

function filterEvents(data) {
  const checkboxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checked) => checked.value);
  return (
    (checkboxes.includes("Civil War") && console.log("First")) ||
    (checkboxes.includes("Age of Ultron") && console.log("SecondBox")) ||
    (checkboxes.includes("Infinity War") && console.log("ThirdBox")) ||
    (checkboxes.includes("Acts of Vengance") && console.log("FourthBox")) ||
    (checkboxes.includes("Secret War") && console.log("FifthBox"))
  );
}

/* function filterEventsXXX(data) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function filterChar() {
      let dataFiltered = data.filter((e) => {
        return e.events.items.some((f) => f.name == "Age of Ultron");
      });
      console.log(dataFiltered);
      showChars(dataFiltered);
    });
  });
} */

function showChars(characters) {
  document.getElementById("api-data").innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let list = document.createElement("li");
    list.innerHTML = characters[i].name;
    document.getElementById("api-data").appendChild(list);
    //list.style.display === "block";‚
  }
}

/* function displayChar() {
  if (list.style.display === "block") {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
} */

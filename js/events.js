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
    clickCheckbox(allArray);
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
    (checkboxes.includes("Civil War") && filterChars(data, checkboxes)) ||
    (checkboxes.includes("Age of Ultron") && filterChars(data, checkboxes)) ||
    (checkboxes.includes("Infinity War") && filterChars(data, checkboxes)) ||
    (checkboxes.includes("Acts of Vengeance!") &&
      filterChars(data, checkboxes)) ||
    (checkboxes.includes("Secret Wars II") && filterChars(data, checkboxes))
  );
}

function filterChars(data, checkboxes) {
  checkboxes.map((checkbox) => {
    let result = [];
    let dataFiltered = data.filter((e) => {
      return e.events.items.some((f) => f.name == checkbox);
    });
    console.log("Filtered", dataFiltered);
    //showChars(dataFiltered);
  });
}

//arr4 = arr1.filter((value) => arr2.includes(value) && arr3.includes(value));

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

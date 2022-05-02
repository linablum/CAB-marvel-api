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
for (let i = 0; i < 1600; i += 100) {
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
  let dataFiltered = data.filter((e) => {
    return e.events.items.some((f) => checkboxes.includes(f.name));
  });
  console.log(dataFiltered);
  showChars(dataFiltered);
}

/* function filterEvents(data) {
  const checkboxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checked) => checked.value);
  let dataFiltered = data.filter((e) => {
    return e.events.items.some(
      (f) =>
        f.name.includes(checkboxes[0]) ||
        f.name.includes(checkboxes[1]) ||
        f.name.includes(checkboxes[2]) ||
        f.name.includes(checkboxes[3]) ||
        f.name.includes(checkboxes[4])
    );
  });
  console.log(dataFiltered);
  showChars(dataFiltered);
}
 */
/* function filterEvents(data) {
  const checkboxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checked) => checked.value);
  let dataFiltered = data.filter((e) => {
    return e.events.items.some(
      (f) =>
        ((((f.name == checkboxes[0]) !== (f.name == checkboxes[1])) !==
          (f.name == checkboxes[2])) !==
          (f.name == checkboxes[3])) !==
        (f.name == checkboxes[4])
    );
  });
  console.log("after", checkboxes.length);
  console.log(checkboxes);
  console.log(dataFiltered);
  showChars(dataFiltered);
} */

//let result = result1.filter((o1) => !result2.some((o2) => o1.id === o2.id));

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

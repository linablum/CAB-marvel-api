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
    allArray.sort((a, b) => a.name.localeCompare(b.name));
    clickCheckbox(allArray);
    spinner.setAttribute("hidden", "hidden");
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
    if (checkboxes.length > 0) {
      return (
        e.events.available > 0 &&
        checkboxes.every((checkbox) =>
          e.events.items.some((item) => item.name === checkbox)
        )
      );
    } else {
      return (document.getElementById("api-data").innerHTML = "");
    }
  });
  showChars(dataFiltered);
}

function showChars(characters) {
  document.getElementById("api-data").innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let list = document.createElement("li");
    list.innerHTML = characters[i].name;
    document.getElementById("api-data").appendChild(list);
  }
}

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
    charEvents(allArray);
  } catch (err) {
    console.log(err);
  }
}

fetchCharacters();

//document.querySelectorAll();

let checkbox = document.getElementById("btncheck1");
function charEvents(data) {
  checkbox.addEventListener("change", function filterChar() {
    let dataFiltered = data.filter((event) => {
      return event.name.charAt(0) == "B";
      //return event.events.items.name == "Civil War";
    });
    console.log(dataFiltered);
    showChar(dataFiltered);
  });
}

function showChar(characters) {
  document.getElementById("api-data").innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let list = document.createElement("li");
    list.innerHTML = characters[i].name;
    document.getElementById("api-data").appendChild(list);
    /*list.style.display = "none";

     checkbox.addEventListener("change", function displayChar() {
      if (list.style.display === "none") {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    }); */
  }
}

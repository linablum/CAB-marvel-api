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
const spinner = document.getElementById("spinner");

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
    if (window.location.pathname == "/characters.html") {
      alphabetButtons(allArray);
    } else if (window.location.pathname == "/events.html") {
      clickCheckbox(allArray);
    }
    spinner.setAttribute("hidden", "hidden");
  } catch (err) {
    cdivContainer.append("Oh, something went wrong: " + err.message);
  }
}

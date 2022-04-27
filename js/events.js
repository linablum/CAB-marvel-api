function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + API_KEY_PRIVATE_2 + API_KEY_PUBLIC_2);
  return `apikey=${API_KEY_PUBLIC_2}&ts=${timestamp}&hash=${md5Hash}`;
}

/* let urlXXX =
  "http://gateway.marvel.com/v1/public/characters?" +
  getHash() +
  "&limit=100&offset=";
 */
let url =
  "http://gateway.marvel.com/v1/public/events?" + getHash() + "&limit=100";

async function loadChars() {
  const res = await fetch(url);
  const apiData = await res.json();
  console.log(apiData);
  const eventArray = [15, 2, 30, 0, 55];
  return eventArray.map((num, i) =>
    eventChar(num, `btncheck${i + 1}`, apiData)
  );
}

loadChars();

function eventChar(x, y, data) {
  for (
    let i = 0;
    i < Object.keys(data.data.results[x].characters.items).length;
    i++
  ) {
    let list = document.createElement("li");
    list.innerHTML = data.data.results[x].characters.items[i].name;
    document.getElementById("api-data").appendChild(list);
    list.style.display = "none";

    let checkbox = document.getElementById(y);
    checkbox.addEventListener("change", function displayChar() {
      if (list.style.display === "none") {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    });
  }
}

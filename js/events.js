//events = [15, 2, 30, 0, 55];

async function loadChars() {
  const res = await fetch(
    "https://gateway.marvel.com:443/v1/public/events?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100"
  );
  const apiData = await res.json();
  console.log(apiData);
  const eventArray = [15, 2, 30, 0, 55];
  const events = eventArray.map((num, i) =>
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

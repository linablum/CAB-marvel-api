//events = [15, 2, 30, 0, 55];

/* fetch(
  "https://gateway.marvel.com:443/v1/public/events?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100"
)
  .then((res) => {
    console.log("RESOLVED!", res);
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERROR!", e);
  }); */

const loadChars = async () => {
  const res = await fetch(
    "https://gateway.marvel.com:443/v1/public/events?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100"
  );
  const apiData = await res.json();
  console.log(apiData);
  eventChar(15, "btncheck1", apiData);
  eventChar(2, "btncheck2", apiData);
  eventChar(30, "btncheck3", apiData);
  eventChar(0, "btncheck4", apiData);
  eventChar(55, "btncheck5", apiData);
};

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

loadChars();

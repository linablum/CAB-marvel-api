console.log(data2);

//events = [15, 2, 30, 0, 55];

function eventChar(x, y) {
  for (
    let i = 0;
    i < Object.keys(data2.data.results[x].characters.items).length;
    i++
  ) {
    let list = document.createElement("li");
    list.innerHTML = data2.data.results[x].characters.items[i].name;
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

eventChar(15, "btncheck1");
eventChar(2, "btncheck2");
eventChar(30, "btncheck3");
eventChar(0, "btncheck4");
eventChar(55, "btncheck5");

// http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e

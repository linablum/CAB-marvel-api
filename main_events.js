console.log(data2);

//x = Object.keys(data.data.results).length

/* for (let i = 0; i < 50; i++) {
  let list = document.createElement("li");
  list.innerHTML = data.data.results[i].name;
  document.getElementById("text").appendChild(list);
} */

//civil war: 15
//age of: 2
//infinity: 30
//gauntlet: 31
//secret: 55

for (
  let i = 0;
  i < Object.keys(data2.data.results[2].characters.items).length;
  i++
) {
  let list = document.createElement("li");
  list.innerHTML = data2.data.results[2].characters.items[i].name;
  document.getElementById("text").appendChild(list);
}

// http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e

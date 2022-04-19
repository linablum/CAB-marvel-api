console.log(data);

let x = Object.keys(data.data.results).length;
console.log(x);

for (let i = 0; i < Object.keys(data.data.results).length; i++) {
  let list = document.createElement("li");
  list.innerHTML = data.data.results[i].name;
  document.getElementById("text").appendChild(list);
}

// http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e

//  ! again no need for repeating the getHash() function if you link the hash.js file
// function getHash() {
//   const timestamp = new Date().getTime();
//   const md5Hash = md5(timestamp + API_KEY_PRIVATE_2 + API_KEY_PUBLIC_2);
//   return `apikey=${API_KEY_PUBLIC_2}&ts=${timestamp}&hash=${md5Hash}`;
// }

let url =
  "http://gateway.marvel.com/v1/public/characters?" +
  getHash() +
  "&limit=100&offset=";

let urls = [];
for (let i = 0; i < 300; i += 100) {
  urls.push(url + i);
}

const spinner = document.getElementById("spinner");

async function fetchCharacters() {
  try {
    const allArray = [];
    await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            allArray.push(...res.data.results);
            spinner.setAttribute("hidden", "hidden");
          })
      )
    );
    allArray.sort((a, b) => a.name.localeCompare(b.name));
    alphabetButtons(allArray);
    console.log("allArray", allArray);
  } catch (err) {
    console.log(err);
  }
}

fetchCharacters();

let divAlphabet = document.getElementById("alphabet");

function alphabetButtons(data) {
  // ! don't create all the letters if you are not fetching all the characters, however good that you are showing "No characters to display"
  const alphabetLowerCase = [..."abcdefghijklmnopqrstuvwxyz"];
  // ! if you are anyway hardcoding the letters of the alphabet, why don't you write them directly upper case?
  const alphabet = alphabetLowerCase.map((letter) => letter.toUpperCase());
  let divRow = document.createElement("div");
  divRow.classList.add("row");
  let divCol = document.createElement("div");
  divCol.classList.add("col-6");
  for (i = 0; i < alphabet.length; i++) {
    let divBox = document.createElement("div");
    divBox.classList.add("btn-group", "mb-4");
    divBox.setAttribute("role", "group");
    divBox.setAttribute("aria-label", "button group with alphabet");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline-light");
    button.setAttribute("type", "button");
    button.setAttribute("id", `${alphabet[i]}`);
    button.innerHTML = alphabet[i];
    divAlphabet.append(divRow);
    divRow.append(divCol);
    divCol.append(divBox);
    divBox.append(button);
    document
      .getElementById(`${alphabet[i]}`)
      .addEventListener("click", function displayChar() {
        let dataFiltered = data.filter((letter) => {
          return letter.name.charAt(0) == button.innerHTML;
        });
        if (dataFiltered.length > 0) {
          showCard(dataFiltered);
        } else {
          divContainer.innerHTML = "";
          divContainer.append("No characters to display");
        }
      });
  }
}
// ! you are defining showCard() is every file (characters.js, searchbar.js, events.js)
// ! if these functions are creating exactly the same kind of cards, you could move the showCard() function to a showCard.js file and link it to
// ! all the html pages that need it (similarly to the hash.js file and getHash() function)
// ! if the only difference between showCard() here and showCard() in searchbar.js is that you don't show the description of the character,
// ! you could pass a "flag" to the function (ex: showDescription = true or showDescription = false) and check that in the showCard() function
function showCard(dataFiltered) {
  divContainer.innerHTML = "";
  for (i = 0; i < dataFiltered.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card", "bg-transparent", "mb-3", "frosted");
    divCard.setAttribute("style", "max-width:640px");
    let divRow = document.createElement("div");
    divRow.classList.add("row", "g-0");
    let divColImg = document.createElement("div");
    divColImg.classList.add("col-md-4");
    divColImg.setAttribute("style", "width:8rem");
    let img = document.createElement("img");
    img.classList.add("rounded-start", "img-fluid");
    img.setAttribute(
      "src",
      dataFiltered[i].thumbnail.path + "." + dataFiltered[i].thumbnail.extension
    );
    img.setAttribute("style", "width: 7rem");
    let divColText = document.createElement("div");
    divColText.classList.add("col-md-8");
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let hCardTitle = document.createElement("h5");
    hCardTitle.classList.add("card-title");
    hCardTitle.innerHTML = dataFiltered[i].name;
    let pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    let pCardSmall = document.createElement("p");
    pCardSmall.classList.add("card-text");
    pCardText.innerHTML = dataFiltered[i].description;
    let small = document.createElement("small");
    small.classList.add("text-muted");
    small.innerHTML = "Number of comics: " + dataFiltered[i].comics.available;

    divContainer.append(divCard);
    divCard.append(divRow);
    divRow.append(divColImg, divColText);
    divColImg.append(img);
    divColText.append(divCardBody);
    divCardBody.append(hCardTitle, pCardText, pCardSmall);
    pCardSmall.append(small);
  }
}

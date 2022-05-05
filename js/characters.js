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
  const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
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

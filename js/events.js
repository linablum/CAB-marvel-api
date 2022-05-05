// ! same general comment you could have a file called fetchData.js in which you define the fetch function and then just link it to the html
// ! files that need it

// ! if the only difference between showCard() here and showCard() in searchbar.js is that you don't show the description of the character,
// ! you could pass a "flag" to the function (ex: showDescription = true or showDescription = false) and check that in the showCard() function

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
    // ! you could apply the concept of "flag" here too, depending on which page you are (you can check the document.title to know in which page
    // ! you are) you can call clickCheckboxes() or alphabetButtons()
    clickCheckbox(allArray);
    spinner.setAttribute("hidden", "hidden");
  } catch (err) {
    console.log(err);
  }
}

fetchCharacters();

function clickCheckbox(allArray) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterEvents(allArray);
    });
  });
}

function filterEvents(data) {
  const checkboxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checked) => checked.value);
  if (checkboxes.length > 0) {
    let dataFiltered = data.filter((e) => {
      return (
        e.events.available > 0 &&
        checkboxes.every((checkbox) =>
          e.events.items.some((item) => item.name === checkbox)
        )
      );
    });
    showChars(dataFiltered);
  } else {
    document.getElementById("api-data").innerHTML = "";
  }
}

function showChars(characters) {
  document.getElementById("api-data").innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let list = document.createElement("li");
    list.innerHTML = characters[i].name;
    document.getElementById("api-data").appendChild(list);
  }
}

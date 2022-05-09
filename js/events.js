fetchCharacters();

function clickCheckbox(allArray) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterEvents(allArray);
      divContainer.innerHTML = "";
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

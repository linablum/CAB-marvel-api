// ! don't need to define it again
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

// ! same general comment here as for showCard() in characters.js, you could have a file called fetchData.js in which you define the fetch function and then just link it to the html
// ! files that need it

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
  let dataFiltered = data.filter((e) => {
    // ! if and else condition should be outside the filter function because otherwise you make this check for every single character in the array
    // ! while you just need to check that at the beginning of the event
    if (checkboxes.length > 0) {
      return (
        e.events.available > 0 &&
        checkboxes.every((checkbox) =>
          e.events.items.some((item) => item.name === checkbox)
        )
      );
    } else {
      // ! if you move if and else outside filter, you don't need to return something that is not meant to be returned
      return (document.getElementById("api-data").innerHTML = "");
    }
  });
  showChars(dataFiltered);
}
// ! again here you can use the same function that you have in characters.js and searchbar.js by just moving in into a new file and linking it
//  ! to the appropriate html
function showChars(characters) {
  document.getElementById("api-data").innerHTML = "";
  for (let i = 0; i < characters.length; i++) {
    let list = document.createElement("li");
    list.innerHTML = characters[i].name;
    document.getElementById("api-data").appendChild(list);
  }
}

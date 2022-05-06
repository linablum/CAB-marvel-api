/* const fetchCharacter = async (comicnumber) => {
  let url =
    `http://gateway.marvel.com/v1/public/comic?id=${comicnumber}&limit=100&` +
    getHash();
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      let response = await res.json();
      // ! if response is empty, show something to the user (for example, no characters with that name)
      let marvelCharacter = response.data.results;
      showCard(marvelCharacter);
    } else {
      divContainer.append("No characters with this name");
    }
  } catch (err) {
    // ! if there is an error show something to the user
    console.log(err);
  }
};
 */

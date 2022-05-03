function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + API_KEY_PRIVATE_2 + API_KEY_PUBLIC_2);
  return `apikey=${API_KEY_PUBLIC_2}&ts=${timestamp}&hash=${md5Hash}`;
}

let url =
  "http://gateway.marvel.com/v1/public/characters?$name={name}&limit=100" +
  getHash();

async function searchCharacters() {



//https://gateway.marvel.com:443/v1/public/characters?name=spiderman&limit=1400&offset=100&apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957

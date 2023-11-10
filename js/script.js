const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input_search");
const btnPrev = document.querySelector(".btn_prev");
const btnNext = document.querySelector(".btn_next");
const pokemonType = document.querySelector(".type");
const pokemonHeight = document.querySelector(".height");

let searchPokemon = 0;
if (searchPokemon === 0) {
  pokemonName.innerHTML = "pokeball";
  pokemonNumber.innerHTML = "#0";
  pokemonImage.src = "../imagem/open-pokeball.gif";
}

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "#0";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = "#" + data.id;
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`;
    //pokemon type & height
    pokemonType.innerHTML = "type: " + data.types[0].type.name;
    pokemonHeight.innerHTML = "height: " + data.height / 10 + "m";
    searchPokemon = data.id;
    inputSearch.value = "";
  } else {
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = "#0";
    pokemonImage.src = "../imagem/open-pokeball.gif";
    inputSearch.value = "";
    searchPokemon = 0;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 0) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  } else if (searchPokemon <= 0) {
    pokemonName.innerHTML = "pokeball";
    pokemonNumber.innerHTML = "#0";
    pokemonImage.src = "../imagem/open-pokeball.gif";
  }
});
btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
//renderPokemon(searchPokemon());

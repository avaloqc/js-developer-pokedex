const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number customButton">#${pokemon.number}</span>
            <span class="name customButton">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img class="customButton" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);
grabButton();

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    grabButton();

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
    grabButton();
  }
});

function grabButton() {
  setTimeout(() => {
    var openModalBtn = document.getElementsByClassName("pokemon");
    for (i = 0; i < Object.keys(openModalBtn).length; i++) {
      openModalBtn[i].children[0].addEventListener("click", openModal);
      openModalBtn[i].children[1].addEventListener("click", openModal);
      openModalBtn[i].children[2].children[1].addEventListener(
        "click",
        openModal
      );
    }
  }, 1000);
}

function openModal(e) {
  var texto = e.target.innerHTML;

  if (texto.includes("#")) {
    texto = e.target.innerHTML.replace("#", "");
  } else if (e.target.innerHTML === "") {
    texto = e.target.alt;
  }

  getInfo(texto);
}

async function getInfo(id) {
  const data = null;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    document.getElementById("nome").innerHTML = `NOME: ${data.name}`;
    document.getElementById("height").innerHTML = `ALTURA: ${data.height}`;
    document.getElementById("weight").innerHTML = `PESO: ${data.weight}`;
    modal.style.display = "flex";
  } catch (error) {}
  return data;
}

function closeModal() {
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

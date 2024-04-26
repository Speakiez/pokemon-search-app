const PokedexAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const inputElement = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const nameSpan = document.getElementById("pokemon-name");
const idSpan = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const hpSpan = document.getElementById("hp");
const attackSpan = document.getElementById("attack");
const defenseSpan = document.getElementById("defense");
const specialAttackSpan = document.getElementById("special-attack");
const specialDefenseSpan = document.getElementById("special-defense");
const speedSpan = document.getElementById("speed");
const typesElement = document.getElementById("types");

const fetchPokedexData = async (pokemon) => {
    try {
        const res = await fetch(`${PokedexAPI}/${pokemon}`);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        alert("Pokémon not found");
    }
};

fetchPokedexData("pikachu");

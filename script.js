// Variable Declaration //

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

// Function Declarations //

const formatUserInput = (input) => {
    return input
        .toLowerCase()
        .replace(/ /, "-")
        .split("")
        .filter(letter => {
            const regEx = /[\w-]/;
            return regEx.test(letter) ? letter : false;
        })
        .join("");
};

const fetchPokedexData = async (pokemon) => {
    try {
        const res = await fetch(`${PokedexAPI}/${pokemon}`);
        const data = await res.json();
        return data;
    } catch (error) {
        alert("Pokémon not found");
    }
};

const updateInfoOnScreen = (data) => {
    const { id, name, sprites, stats, types } = data;
    const spriteURL = sprites.front_default;
    const statValues = stats.map((value) => [value.stat.name, value.base_stat]);
    const typeValues = types.map((value, index) => [index, value.type.name]);

    console.log(id, name, spriteURL, statValues, typeValues);
}

// Event Handling //

searchButton.addEventListener("click", () => {
    if (!inputElement.value) return;
    const userInput = formatUserInput(inputElement.value);

    fetchPokedexData(userInput).then((value) => {
        updateInfoOnScreen(value);
    });

    inputElement.value = "";
});

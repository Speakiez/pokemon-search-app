// Variable Declaration //

const PokedexAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const inputElement = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const imageElement = document.getElementById("sprite");
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
    if (!data) return;

    const { id, name, height, weight, sprites, stats, types } = data;
    const spriteURL = sprites.front_default;
    const typeValues = types.map((value) => value.type.name);
    const statValues = {};
    stats.forEach((value) => statValues[value.stat.name] = value.base_stat );

    idSpan.textContent = `#${id}`;
    nameSpan.textContent = name.toUpperCase();
    imageElement.setAttribute("src", spriteURL);
    weightSpan.textContent = `${weight}`;
    heightSpan.textContent = `${height}`;
    hpSpan.textContent = `${statValues.hp}`;
    attackSpan.textContent = `${statValues.attack}`;
    defenseSpan.textContent = `${statValues.defense}`;
    specialAttackSpan.textContent = `${statValues["special-attack"]}`;
    specialDefenseSpan.textContent = `${statValues["special-defense"]}`;
    speedSpan.textContent = `${statValues.speed}`;
    typesElement.innerHTML = "";
    typeValues.forEach((value) => {
        typesElement.innerHTML += `<div class="type-container">${value.toUpperCase()}</div>`;
    });
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

inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (!inputElement.value) return;
        const userInput = formatUserInput(inputElement.value);

        fetchPokedexData(userInput).then((value) => {
            updateInfoOnScreen(value);
        });

        inputElement.value = "";
    }
});

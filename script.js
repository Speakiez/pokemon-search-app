const PokedexAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

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

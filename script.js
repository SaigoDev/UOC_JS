document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokemon-container");
    
    function getRandomPokemonIds() {
        const ids = [];
        while (ids.length < 10) {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            if (!ids.includes(randomId)) {
                ids.push(randomId);
            }
        }
        return ids;
    }
    
    function fetchPokemonData(id) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then(data => {
                return {
                    name: data.name,
                    attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
                    defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
                    image: data.sprites.front_default,
                    types: data.types.map(type => type.type.name),
                };
            })
            .catch(error => {
                console.error('Error al carregar el Pokemon:', error);
            });
    }
    
    function createPokemonCard(pokemon) {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");        

        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-img">
            <div class="pokemon-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
            <div class="pokemon-stat">Atac: ${pokemon.attack}</div>
            <div class="pokemon-stat">Defensa: ${pokemon.defense}</div>
            <div class="pokemon-type">
                ${pokemon.types.map(type => `<span class="type-${type}">${type}</span>`).join('')}
            </div>
        `;

        pokemonContainer.appendChild(card);
    }
    
    const pokemonIds = getRandomPokemonIds();
    pokemonIds.forEach(id => {
        fetchPokemonData(id)
            .then(pokemon => createPokemonCard(pokemon));
    });
});
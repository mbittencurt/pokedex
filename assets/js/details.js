const params = new URLSearchParams(window.location.search)
const pokemonId = params.get('id')

const container = document.getElementById('pokemonDetails')

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(pokeDetail => {
        const pokemon = new Pokemon()

        pokemon.number = pokeDetail.id
        pokemon.name = pokeDetail.name

        const types = pokeDetail.types.map(slot => slot.type.name)
        pokemon.types = types
        pokemon.type = types[0]

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
        pokemon.height = pokeDetail.height
        pokemon.weight = pokeDetail.weight

        pokemon.abilities = pokeDetail.abilities.map(
            abilitySlot => abilitySlot.ability.name
        )

        const stats = {}
        pokeDetail.stats.forEach(statSlot => {
            stats[statSlot.stat.name] = statSlot.base_stat
        })

        pokemon.stats = {
            hp: stats.hp,
            attack: stats.attack,
            defense: stats.defense,
            speed: stats.speed
        }

        container.innerHTML = `
            <section class="pokemon-details ${pokemon.type}">
                <button class="back-button" onclick="history.back()">⬅ Voltar</button>

                <span class="number">#${pokemon.number}</span>
                <h1 class="name">${pokemon.name}</h1>

                <ol class="types">
                    ${pokemon.types.map(type =>
                        `<li class="type ${type}">${type}</li>`
                    ).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

                <div class="info">
                    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                </div>

                <div class="abilities">
                    <h3>Habilidades</h3>
                    <ul>
                        ${pokemon.abilities.map(ability =>
                            `<li>${ability}</li>`
                        ).join('')}
                    </ul>
                </div>

                <div class="stats">
                    <h3>Status Base</h3>
                    <p>Vida: ${pokemon.stats.hp}</p>
                    <p>Ataque: ${pokemon.stats.attack}</p>
                    <p>Defesa: ${pokemon.stats.defense}</p>
                    <p>Velocidade: ${pokemon.stats.speed}</p>
                </div>
            </section>
        `
    })
    .catch(error => console.error(error))

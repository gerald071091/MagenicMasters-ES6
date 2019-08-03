// dummydata

const dummyPokemons = [
	{id: 1, name: 'Bulbasaur', type: 'Grass'},
	{id: 2, name: 'Ivysaur', type: 'Grass'},
	{id: 3, name: 'Venusaur', type: 'Grass'},
	{id: 4, name: 'Charmander', type: 'Fire'},
	{id: 5, name: 'Charmeleon', type: 'Fire'},
	{id: 6, name: 'Charizard', type: 'Fire'},
	{id: 7, name: 'Squirtle',  type: 'Water'},
	{id: 8, name: 'Wartortle',  type: 'Water'},
	{id: 9, name: 'Blastoise',  type: 'Water'},
	{id: 10, name: 'Geodude',  type: 'Rock'},
	{id: 11, name: 'Graveler',  type: 'Rock'},
	{id: 12, name: 'Golem',  type: 'Rock'},
	{id: 13, name: 'Pichu',  type: 'Electric'},
	{id: 14, name: 'Pickachu',  type: 'Electric'},
	{id: 15, name: 'Raichu',  type: 'Electric'},
	{id: 16, name: 'Ekans',  type: 'Poison'},
	{id: 17, name: 'Arbok',  type: 'Poison'},
	{id: 18, name: 'Ghastly',  type: 'Ghost'},
	{id: 19, name: 'Haunter',  type: 'Ghost'},
	{id: 20, name: 'Gengar',  type: 'Ghost'},
	{id: 21, name: 'Dratini',  type: 'Dragon'},
	{id: 22, name: 'Dragonair',  type: 'Dragon'},
	{id: 23, name: 'Dragonite',  type: 'Dragon'},
	{id: 24, name: 'Pidgey',  type: 'Flying'},
	{id: 25, name: 'Pidgeotto',  type: 'Flying'},
	{id: 26, name: 'Pidgeot',  type: 'Flying'},
	{id: 27, name: 'Abra',  type: 'Psychic'},
	{id: 28, name: 'Kadabra',  type: 'Psychic'},
	{id: 29, name: 'Alakazam',  type: 'Psychic'}
];

class Pokemon {
	constructor(pokemons) {
		this.pokemonList = pokemons;
	}
	
	pokemonTypeName = ({id = 1, type = 'Grass'}) => {
		return this.pokemonList.filter(p => p.id === id && p.type === type).map(result => result.name);
	}
	
	pokemonAttack = (attackString, pokemonName, attackName) => console.info(`${attackString[0]}${pokemonName}${attackString[1]}${attackName}${attackString[2]}`);
}

// execute
const attackName = `Solar beam`;

let executePokemon = new Pokemon(dummyPokemons);
let selectedPokemon = executePokemon.pokemonTypeName({id: 2, type: 'Grass'});
executePokemon.pokemonAttack `${selectedPokemon[0]} used ${attackName} and its super effective!`
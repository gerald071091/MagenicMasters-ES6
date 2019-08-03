// dummydata

const pokemons = [
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

const findWhere = (pokemons, {type = 'Grass',}) =>  {
	let result = [];
	
	for(const[index, pokemon] of pokemons.entries()) {
		if(pokemon.type === type) {
			result.push(pokemon);
		}
	}
	
	return result;
};

// execute

// Returns default value assigned
console.info(findWhere(pokemons, {}));

// Returns Psychic pokemon
console.info(findWhere(pokemons, {type: 'Psychic'}));

// Returns Water pokemon
console.info(findWhere(pokemons, {type: 'Water'}));

// Returns Ghost pokemon
console.info(findWhere(pokemons, {type: 'Ghost'}));

// Returns Dragon pokemon
console.info(findWhere(pokemons, {type: 'Dragon'}));
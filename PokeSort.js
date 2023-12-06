let hpValue = 0;
let attackValue = 0;
let defenseValue = 0;
let spatkValue = 0;
let spdefValue = 0;
let speedValue = 0;
let pokedexKeys = Object.keys(window.allGens);
let pokedexValues = Object.values(window.allGens);
let pokedexTypes = Object.values(window.pokeTypes);
let total = 0;

const updatehpValue = (currentValue) => {
  hpValue = parseInt(currentValue);
  const sliderValueElement = document.getElementById("hpValue");
  sliderValueElement.textContent = "HP: " + currentValue;
};

const updateatkValue = (currentValue) => {
  attackValue = parseInt(currentValue);
  const sliderValueElement = document.getElementById("atkValue");
  sliderValueElement.textContent = "Attack: " + currentValue;
};

const updatedefValue = (currentValue) => {
  defenseValue = parseInt(currentValue);
  const sliderValueElement = document.getElementById("defValue");
  sliderValueElement.textContent = "Defense: " + currentValue;
};

const updatespatkValue = (currentValue) => {
  spatkValue = parseInt(currentValue);
  const sliderValueElement = document.getElementById("spatkValue");
  sliderValueElement.textContent = "Sp. Atk: " + currentValue;
};

const updatespdefValue = (currentValue) => {
  spdefValue = parseInt(currentValue);
  const sliderValueElement = document.getElementById("spdefValue");
  sliderValueElement.textContent = "Sp. Def: " + currentValue;
};

const updatespeedValue = (currentValue) => {
  speedValue = parseInt(currentValue);
  const sliderValueElement = document.getElementById("speedValue");
  sliderValueElement.textContent = "Speed: " + currentValue;
};

const checkClick = () => {
  returnspace.innerHTML = "";
  const filteredPokemon = [];

  for (let i = 0; i < pokedexKeys.length; i++) {
    if (
      pokedexValues[i]["hp"] >= hpValue &&
      pokedexValues[i]["attack"] >= attackValue &&
      pokedexValues[i]["defense"] >= defenseValue &&
      pokedexValues[i]["specialAttack"] >= spatkValue &&
      pokedexValues[i]["specialDefense"] >= spdefValue &&
      pokedexValues[i]["speed"] >= speedValue
    ) {
      const totalStats =
        pokedexValues[i]["hp"] +
        pokedexValues[i]["attack"] +
        pokedexValues[i]["defense"] +
        pokedexValues[i]["specialAttack"] +
        pokedexValues[i]["specialDefense"] +
        pokedexValues[i]["speed"];

      filteredPokemon.push({
        name: pokedexKeys[i],
        type: window.pokeTypes[pokedexKeys[i]],
        totalStats: totalStats,
        individualStats: pokedexValues[i],
      });
    }
  }

  filteredPokemon.sort((a, b) => b.totalStats - a.totalStats);

  for (const pokemon of filteredPokemon) {
    returnspace.innerHTML +=
      pokemon.name +
      " (" +
      pokemon.type +
      ")" +
      " - Total: " +
      pokemon.totalStats +
      "<br>" +
      "HP: " +
      pokemon.individualStats.hp +
      " | " +
      "Attack: " +
      pokemon.individualStats.attack +
      " | " +
      "Defense: " +
      pokemon.individualStats.defense +
      " | " +
      "Sp. Atk: " +
      pokemon.individualStats.specialAttack +
      " | " +
      "Sp. Def: " +
      pokemon.individualStats.specialDefense +
      " | " +
      "Speed: " +
      pokemon.individualStats.speed +
      "<br><br>";
  }
};

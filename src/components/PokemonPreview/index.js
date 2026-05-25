import { useEffect, useState } from "react";

import { View, Text, Image, ScrollView } from "react-native";

import { styles } from "../../styles/pokemonPreview";

export default function PokemonPreview({ pokemon }) {
  const [pokemonData, setPokemonData] = useState(null);

  const [speciesData, setSpeciesData] = useState(null);

  useEffect(() => {
    async function loadPokemonData() {
      if (!pokemon) return;

      try {
        const response = await fetch(pokemon.url);

        const data = await response.json();

        setPokemonData(data);

        const speciesResponse = await fetch(data.species.url);

        const species = await speciesResponse.json();

        setSpeciesData(species);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemonData();
  }, [pokemon]);

  // função responsável por converter o gender_rate da PokéAPI
  // em porcentagem de macho e fêmea
  function getGenderRate(rate) {
    // na PokéAPI:
    // -1 significa que o Pokémon não possui gênero
    // exemplo: Magnemite, Mew, Lunala
    if (rate === -1) {
      // retorna o texto Genderless
      return "Genderless";
    }

    // a PokéAPI usa uma escala de 0 até 8, onde:
    // 0 = 100% macho; 8 = 100% fêmea, então:
    // dividimos por 8, multiplicamos por 100
    // para converter em porcentagem
    const female = (rate / 8) * 100;

    // porcentagem masculina
    // é o restante até 100
    const male = 100 - female;

    // retorna uma string formatada, exemplo:
    // "87.5% Male / 12.5% Female
    return `${male}% Male / ${female}% Female`;
  }

  if (!pokemonData || !speciesData) {
    return <Text>Carregando...</Text>;
  }

  // procura dentro da lista de descrições da PokéAPI uma entrada em inglês
  // flavor_text_entries é um array gigante, contendo várias línguas:
  // [
  //   { language: "en" },
  //   { language: "jp" },
  //   { language: "fr" }
  // ]
  // .find() procura o PRIMEIRO item que satisfaça a condição
  const englishEntry = speciesData.flavor_text_entries.find(
    // entry representa cada item do array, aqui verificamos:
    // a linguagem do item é inglês?
    (entry) => entry.language.name === "en",
  );

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
  >
    <Image
    source={{
      uri: pokemonData.sprites.front_default,
    }}
    style={styles.image}
    />
    
    <Text style={styles.number}>#{pokemonData.id}</Text>
    
    <Text style={styles.name}>{pokemonData.name}</Text>
    
    <View style={styles.infoContainer}>
      <Text style={styles.info}>
        Egg Groups:{" "}
        {speciesData.egg_groups.map((group) => group.name).join(", ")}
      </Text>
      
      <Text style={styles.info}>
        Gender: {getGenderRate(speciesData.gender_rate)}
      </Text>
      
      <Text style={styles.info}>
        Height: {pokemonData.height / 10}m
      </Text>
      
      <Text style={styles.info}>
        Weight: {pokemonData.weight / 10}kg
      </Text>
    </View>
    
    <Text style={styles.description}>
      {englishEntry?.flavor_text
      .replace(/\f/g, " ")
      .replace(/\n/g, " ")}
    </Text>
  </ScrollView>
  );
}

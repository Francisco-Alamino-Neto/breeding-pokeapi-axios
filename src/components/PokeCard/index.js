import { useEffect, useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { typeIcons } from "../../utils/typeIcons";

import { styles } from "../../styles/pokeCard";

export default function PokeCard({ pokemon, onPress, isSelected }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(pokemon.url);

      const data = await response.json();

      setPokemonData(data);
    }

    loadData();
  }, [pokemon.url]);

  if (!pokemonData) {
    return <Text>Carregando...</Text>;
  }

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      <Text style={styles.number}>#{pokemonData.id}</Text>

      <Text style={styles.name}>{pokemonData.name}</Text>

      <View style={styles.typesContainer}>
        {pokemonData.types.map((item) => (
          <Image
            key={item.type.name}
            source={typeIcons[item.type.name]}
            style={styles.typeIcon}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}

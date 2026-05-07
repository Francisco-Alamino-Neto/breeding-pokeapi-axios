import { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function PokemonPreview({ pokemon }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!pokemon) return;

      const response = await fetch(pokemon.url);

      const data = await response.json();

      setPokemonData(data);
    }

    loadData();
  }, [pokemon]);

  if (!pokemonData) return null;

  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: pokemonData.sprites.front_default,
        }}
        style={styles.image}
      />

      <Text style={styles.number}>
        #{pokemonData.id}
      </Text>

      <Text style={styles.name}>
        {pokemonData.name}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  image: {
    width: 180,
    height: 180,
  },

  number: {
    fontSize: 20,
  },

  name: {
    fontSize: 24,
    textTransform: 'capitalize',
  },
});
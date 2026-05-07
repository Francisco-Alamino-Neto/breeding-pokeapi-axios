import { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { typeIcons } from '../../utils/typeIcons';

export default function PokeCard({ pokemon, onPress }) {
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
    return (
      <Text>Carregando...</Text>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.number}>
        #{pokemonData.id}
      </Text>

      <Text style={styles.name}>
        {pokemonData.name}
      </Text>

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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    padding: 10,
  },

  number: {
    fontSize: 16,
  },

  name: {
    fontSize: 18,
    textTransform: 'capitalize',
  },

  typesContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 5,
  },

  typeIcon: {
    width: 20,
    height: 20,
  },
});
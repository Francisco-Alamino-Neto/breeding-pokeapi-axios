import { useEffect, useState } from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import api from '../services/api';

import PokeCard from '../components/PokeCard';
import PokemonPreview from '../components/PokemonPreview';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get('/pokemon?limit=151');

        setPokemonList(response.data.results);

        setSelectedPokemon(response.data.results[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>

      <FilterBar />

      <View style={styles.content}>

        <View style={styles.leftContainer}>
          <PokemonPreview pokemon={selectedPokemon} />
        </View>

        <View style={styles.rightContainer}>
          <FlatList
            data={pokemonList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PokeCard
                pokemon={item}
                onPress={() => setSelectedPokemon(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6C6C6',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
  },

  leftContainer: {
    width: '40%',

    justifyContent: 'center',
    alignItems: 'center',

    padding: 10,
  },

  rightContainer: {
    width: '60%',

    paddingRight: 10,
  },
});
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../services/api";
import FilterBar from "../components/FilterBar";
import PokeCard from "../components/PokeCard";
import PokemonPreview from "../components/PokemonPreview";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get("/pokemon?limit=1025");

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
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FilterBar />

      <PokemonPreview pokemon={selectedPokemon} />

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokeCard pokemon={item} onPress={() => setSelectedPokemon(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 22,
    marginBottom: 10,
    textTransform: "capitalize",
  },
});

import { useEffect, useState } from "react";

import { View, FlatList, ActivityIndicator } from "react-native";

import api from "../services/api";

import PokeCard from "../components/PokeCard";
import PokemonPreview from "../components/PokemonPreview";
import SearchBar from "../components/SearchBar";

import { styles } from "../styles/home";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const selectedPokemon = pokemonList[selectedIndex];

  const filteredPokemon = pokemonList.filter((pokemon, index) => {
    const pokemonNumber = String(index + 1);

    return (
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemonNumber.includes(search)
    );
  });

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get("/pokemon?limit=1300");

        setPokemonList(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < pokemonList.length - 1 ? prev + 1 : prev,
        );
      }

      if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pokemonList]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>

      <SearchBar search={search} setSearch={setSearch} />

      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <PokemonPreview pokemon={selectedPokemon} />
        </View>

        <View style={styles.rightContainer}>
          <FlatList
            data={filteredPokemon}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => (
              <PokeCard
                pokemon={item}
                onPress={() => setSelectedIndex(index)}
                isSelected={selectedIndex === index}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

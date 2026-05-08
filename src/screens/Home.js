import { useEffect, useState } from "react";

import { View, FlatList, ActivityIndicator } from "react-native";

import api from "../services/api";

import PokeCard from "../components/PokeCard";
import PokemonPreview from "../components/PokemonPreview";
import SearchBar from "../components/SearchBar";

import { styles } from "../styles/home";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) return true;

    const matchesName = pokemon.name.toLowerCase().includes(normalizedSearch);

    const matchesNumber = String(pokemon.id).includes(normalizedSearch);

    const matchesEggGroup = pokemon.eggGroups.some(
      (group) => group.toLowerCase().trim() === normalizedSearch,
    );

    return matchesName || matchesNumber || matchesEggGroup;
  });

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get("/pokemon?limit=1300");

        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonDetails = await pokemonResponse.json();

            const speciesResponse = await fetch(pokemonDetails.species.url);

            const speciesData = await speciesResponse.json();
            
            console.log(pokemonDetails.name, speciesData.egg_groups);
            
            return {
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              sprite: pokemonDetails.sprites.front_default,
              types: pokemonDetails.types,

              eggGroups: speciesData.egg_groups.map((group) => group.name),
            };
          }),
        );

        setPokemonList(pokemonData);

        setSelectedPokemon(pokemonData[0]);
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
      const currentIndex = filteredPokemon.findIndex(
        (pokemon) => pokemon.name === selectedPokemon?.name,
      );

      if (event.key === "ArrowDown") {
        const nextPokemon = filteredPokemon[currentIndex + 1];

        if (nextPokemon) {
          setSelectedPokemon(nextPokemon);
        }
      }

      if (event.key === "ArrowUp") {
        const previousPokemon = filteredPokemon[currentIndex - 1];

        if (previousPokemon) {
          setSelectedPokemon(previousPokemon);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredPokemon, selectedPokemon]);

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
            renderItem={({ item }) => (
              <PokeCard
                pokemon={item}
                onPress={() => setSelectedPokemon(item)}
                isSelected={selectedPokemon?.name === item.name}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

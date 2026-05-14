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
  const [eggGroupCache, setEggGroupCache] = useState({});
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  async function getEggGroups(pokemon) {
    if (eggGroupCache[pokemon.name]) {
      return eggGroupCache[pokemon.name];
    }

    try {
      const response = await fetch(pokemon.url);

      const data = await response.json();

      const speciesResponse = await fetch(data.species.url);

      const species = await speciesResponse.json();

      const groups = species.egg_groups.map((group) => group.name);

      setEggGroupCache((prev) => ({
        ...prev,
        [pokemon.name]: groups,
      }));

      return groups;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  useEffect(() => {

  async function filterPokemon() {

    const searchLower =
      search.toLowerCase();

    const filtered = [];

    for (const pokemon of pokemonList) {

      const matchesName =
        pokemon.name.includes(
          searchLower
        );

      if (matchesName) {
        filtered.push(pokemon);
        continue;
      }

      const eggGroups =
        await getEggGroups(pokemon);

      const matchesEggGroup =
        eggGroups.includes(searchLower);

      if (matchesEggGroup) {
        filtered.push(pokemon);
      }
    }

    setFilteredPokemon(filtered);
  }

  filterPokemon();

}, [search, pokemonList]);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get("/pokemon?limit=1300");

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

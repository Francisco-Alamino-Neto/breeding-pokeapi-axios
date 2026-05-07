import { useEffect, useState } from "react";

export default function PokeCard({ pokemon }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemonData(data);
    }

    loadData();
  }, [pokemon.url]);

  return (
    <div>
      {pokemonData ? (
        <p>{pokemonData.name}</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
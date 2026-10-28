import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({ pokemons }) => {
  const [detailedPokemons, setDetailedPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemons.length > 0) {
        const promises = pokemons.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json();
        });
        const results = await Promise.all(promises);
        setDetailedPokemons(results);
      }
    };
    fetchPokemonDetails();
  }, [pokemons]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
      {detailedPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </SimpleGrid>
  );
};

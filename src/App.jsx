import { useState, useEffect } from "react";
import { Heading, Spinner, Container } from "@chakra-ui/react";
import { PokemonList } from "./components/PokemonList";
import { Pagination } from "./components/Pagination";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async (page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      setPokemons(data.results);
      setTotalPages(Math.ceil(data.count / limit));
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" textAlign="center" mb={6}>
        Pokémon Cards
      </Heading>
      {loading ? (
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default App;

import { Box, Image, Text, Badge, VStack } from "@chakra-ui/react";

export const PokemonCard = ({ pokemon }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
    >
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        boxSize="150px"
        mx="auto"
        mt={4}
      />

      <VStack p="6" spacing={3}>
        <Text fontWeight="bold" fontSize="xl">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>

        <Text>ID: {pokemon.id}</Text>

        <Badge borderRadius="full" px="2" colorScheme="teal">
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </Badge>
      </VStack>
    </Box>
  );
};

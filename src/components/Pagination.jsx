import { Button, HStack, Text } from "@chakra-ui/react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <HStack justifyContent="center" spacing={4} mt={10}>
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        colorScheme="blue"
      >
        Anterior
      </Button>
      <Text fontSize="lg">
        Página {currentPage} de {totalPages}
      </Text>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        colorScheme="blue"
      >
        Siguiente
      </Button>
    </HStack>
  );
};



import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import App from "./App";

const mockPokemonListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
};

const mockPokemonDetailResponse = {
  id: 1,
  name: "bulbasaur",
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  types: [{ type: { name: "grass" } }],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App", () => {
  test("renders pokemons", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation((url) => {
      if (url === "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0") {
        return Promise.resolve({
          json: () => Promise.resolve(mockPokemonListResponse),
        });
      }

      if (url === "https://pokeapi.co/api/v2/pokemon/1/") {
        return Promise.resolve({
          json: () => Promise.resolve(mockPokemonDetailResponse),
        });
      }

      return Promise.reject(new Error(`Unexpected url: ${String(url)}`));
    });

    render(<App />);
    expect(screen.getByText("Pokémon Cards")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    });
  });
});

import React from "react";
import Pokemons from "../components/PokemonsLayout";
import fs from "fs";
import { PokemonsData } from "../interfaces/interfaces";


const Pokedex = (props: PokemonsData) => {
  const { pokemon, types } = props;
  return (
    <>
      <Pokemons pokemon={pokemon} types={types} />
    </>
  );
};

export async function getStaticProps() {
  const req = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const res = await req.json();

  const data = fs.readFileSync("data/dataTypes.json", "utf8");
  const dataTypes = JSON.parse(data);

  return {
    props: {
      pokemon: res.results,
      types: dataTypes,
    },
  };
}

export default Pokedex;

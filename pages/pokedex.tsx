import React from "react";
import Pokemons from "../components/Pokemons";
import fs from "fs";

interface Props {
  results: [{ name: string; url: string }];
  data: [
    {
      id: number;
      types: string[];
    }
  ];
}

const Pokedex = (props: Props) => {
  const { results, data } = props;
  return (
    <>
      <Pokemons pokemon={results} types={data} />
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
      results: res.results,
      data: dataTypes,
    },
  };
}

export default Pokedex;

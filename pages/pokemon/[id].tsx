import React from "react";

interface Pokemon {
  name: string;
  id: number;
  // abilities: {
  //   ability: {
  //     name: string;
  //   };
  // }[];
  // stats: {
  //   stat: {
  //     name: string;
  //   };
  //   base_stat: number;
  // }[];
  // base_experience: number;
}

const Pokemon = ({ pokemon }: { pokemon: Pokemon }) => {
  return <div>I am {pokemon.name}</div>;
};

export async function getStaticPaths() {
  let paths = [];
  for (let i = 1; i <= 151; i++) {
    paths.push({ params: { id: i.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(params: { params: { id: string } }) {
  const { id } = params.params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon: pokemon,
    },
  };
}

export default Pokemon;

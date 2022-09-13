import React from "react";
import Head from "next/head";
import Image from "next/image";

type pokemon = {
  name: string;
  id: number;
  url: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

const Pokedex = ({ pokemons }: { pokemons: pokemon[] }) => {
  const bgColors: any = {
    grass: "bg-grass",
    poison: "bg-poison",
    fire: "bg-fire",
    flying: "bg-flying",
    water: "bg-water",
    bug: "bg-bug",
    normal: "bg-normal",
    electric: "bg-electric",
    ground: "bg-ground",
    fairy: "bg-fairy",
    fighting: "bg-fighting",
    psychic: "bg-psychic",
    rock: "bg-rock",
    ghost: "bg-ghost",
    ice: "bg-ice",
    dragon: "bg-dragon",
    steel: "bg-steel",
    dark: "bg-dark",
  };

  const pokemonTypes = (types: pokemon["types"]) => {
    return types.map((type) => type.type.name);
  };

  return (
    <>
      <Head>
        <title>Pokemon API NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800">
        <h1 className="flex justify-center pt-10 text-3xl font-bold mb-5 text-sky-500">
          Pokédex
        </h1>
        <div className="flex flex-wrap justify-center mx-10 bg-bg-main">
          {pokemons.map((pokemon: pokemon) => {
            const imageUrl =
              pokemon.sprites.other["official-artwork"].front_default;
            return (
              <div
                key={pokemon.name}
                className={`flex flex-col justify-center items-center pokemon-card hover:scale-105
                
                ${bgColors[pokemonTypes(pokemon.types)[0]]}`}
              >
                <div className="mb-1">
                  <Image
                    src={imageUrl}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="circle"></div>
                <h5 className="poke-id">#{pokemon.id}</h5>
                <h5 className="poke-name">
                  {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                </h5>
                <span>
                  {pokemonTypes(pokemon.types)
                    .join(" / ")
                    .replace(/\b\w/g, (ch) => ch.toUpperCase())}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const responses = [];

  for (let i = 1; i <= 151; i++) {
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    responses.push(response);
  }

  const proms = await Promise.all(responses);
  const pokemons = await Promise.all(proms.map((res) => res.json()));

  return {
    props: {
      pokemons: pokemons,
    },
  };
}

export default Pokedex;
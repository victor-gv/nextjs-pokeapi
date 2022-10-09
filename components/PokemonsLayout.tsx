import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { PokemonsData, pokemon, pokemonList } from "../interfaces/interfaces";
import { BiSearchAlt2 } from "react-icons/bi";



const PokemonsLayout = (pokemon: PokemonsData) => {
  function getType(id: number): string[] {
    const type = pokemon.types.find((type) => type.id === id);
    if (typeof type !== "undefined") {
      const typeColor = type?.types;
      return typeColor;
    } else {
      throw new Error("Type not found");
    }
  }

  const bgColors: { [key: string]: string } = {
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

  const pokemonList: pokemonList = pokemon.pokemon;

  const [results, setResults] = useState<pokemon[]>([]);
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setSearch(e.target.value);
      setResults(
        pokemonList.filter((pokemon: pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      const results = pokemonList.filter((pokemon: pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setResults(results);
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800">
        <h1 className="flex justify-center pt-10 mb-5 font-bold font-luckiest text-6xl text-yellow-300 title ">
          Pokédex
        </h1>
        <div className="relative flex flex-row justify-center items-center bg-gray-800">
          <input
            className="w-1/2 mb-5 bg-gray-800 border-2 border-yellow-300 rounded-md text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
            type="text"
            placeholder="Search for a Pokémon"
            onChange={handleChange}
          />
          <BiSearchAlt2 className="text-xl -mx-7 mb-5 text-yellow-300" />

          {Boolean(results.length) && (
            <div className="absolute z-50 ml-9 top-11 w-1/2 mg bg-gray-800 rounded-md border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent">
              <ul className="w-full text-yellow-300 overflow-hidden bg-gray-800">
                <li className="m-0">
                  <Link href={`/search?query=${search}`} key={results.length}>
                    <a className="block px-2 py-1 overflow-hidden text-sm font-semibold italic text-gray-400 hover:bg-gray-700 hover:cursor-pointer text-ellipsis whitespace-nowrap">
                      See all {results.length} results for "{search}"
                    </a>
                  </Link>
                </li>
                {results.map((result) => {
                  if (results.indexOf(result) < 20) {
                    return (
                      <Link href={`pokedex/${result.name}`} key={result.name}>
                        <a className="block px-2 py-1 overflow-hidden text-sm font-semibold hover:bg-gray-700 text-ellipsis whitespace-nowrap capitalize">
                          {result.name}
                        </a>
                      </Link>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center mx-10 bg-bg-main">
          {pokemonList.map((pokemon: { name: string; url: string }) => {
            const pokemonId: number = parseInt(pokemon.url.split("/")[6]);
            const imageUrl: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
            return (
              <Link key={pokemon.name} href={`/pokedex/${pokemon.name}`}>
                <div
                  key={pokemon.name}
                  className={`flex flex-col justify-center items-center pokemon-card hover:scale-105 bg-
                  ${bgColors[getType(pokemonId)[0]]}
                  `}
                >
                  <div className="mb-1">
                    <Image
                      src={imageUrl}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                      priority
                    />
                  </div>
                  <div className="circle"></div>
                  <h5 className="poke-id">#{pokemonId}</h5>
                  <h5 className="poke-name">
                    {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                  </h5>
                  <span>
                    <h5 className="poke-type capitalize">
                      {getType(pokemonId)
                        ?.join(" / ")
                        .replace(/\b\w/g, (ch) => ch.toUpperCase())}
                    </h5>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokemonsLayout;

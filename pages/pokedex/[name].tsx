import React from "react";
import { GetStaticPaths } from "next";

type Types = [
  {
    type: {
      id: number;
      name: string;
    }
  }
]

interface Pokemon {
  pokemon: {
    name: string;
    id: number;
    abilities: {
      ability: {
        name: string;
      };
    }[];
    stats: {
      stat: {
        name: string;
      };
      base_stat: number;
    }[];
    base_experience: number;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    types: Types;
  };
}

const Pokemon = (pokemon: Pokemon) => {
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

  const pokemonType = pokemon.pokemon.types[0].type.name;
  const pokemonImg =
    pokemon.pokemon.sprites.other["official-artwork"].front_default;
  const hp = pokemon.pokemon.stats[0].base_stat;
  const attack = pokemon.pokemon.stats[1].base_stat;
  const defense = pokemon.pokemon.stats[2].base_stat;
  const specialAttack = pokemon.pokemon.stats[3].base_stat;
  const specialDefense = pokemon.pokemon.stats[4].base_stat;
  const speed = pokemon.pokemon.stats[5].base_stat;
  const ability = pokemon.pokemon.abilities[0].ability.name;
  const hiddenAbility = pokemon.pokemon.abilities[1]?.ability.name
    ? pokemon.pokemon.abilities[1].ability.name
    : "None";

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-800 min-h-screen">
        <figure
          className={`card bg-
          ${bgColors[pokemonType]}
                  `}
        >
          <div className="card__image-container">
            <img
              src={pokemonImg}
              alt={pokemon.pokemon.name}
              className="card__image"
            />
          </div>

          <figcaption className="card__caption">
            <h1 className="card__name capitalize">{pokemon.pokemon.name}</h1>

            <h3 className="card__type">{pokemonType}</h3>

            <table className="card__stats">
              <tbody>
                <tr>
                  <th>HP</th>
                  <td>{hp}</td>
                </tr>
                <tr>
                  <th>Attack</th>
                  <td>{attack}</td>
                </tr>

                <tr>
                  <th>Defense</th>
                  <td>{defense}</td>
                </tr>

                <tr>
                  <th>Special Attack</th>
                  <td>{specialAttack}</td>
                </tr>
                <tr>
                  <th>Special Defense</th>
                  <td>{specialDefense}</td>
                </tr>
                <tr>
                  <th>Speed</th>
                  <td>{speed}</td>
                </tr>
              </tbody>
            </table>

            <div className="card__abilities">
              <h4 className="card__ability">
                <span className="card__label">Ability</span>
                {ability.charAt(0).toUpperCase() + hiddenAbility.slice(1)}
              </h4>
              <h4 className="card__ability text-right">
                <span className="card__label">Hidden Ability</span>
                {hiddenAbility.charAt(0).toUpperCase() + hiddenAbility.slice(1)}
              </h4>
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const req = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results } = await req.json();

  const paths = results.map((pokemon : Pokemon["pokemon"]) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(params: { params: { name: string } }) {
  const { name } = params.params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon: pokemon,
    },
  };
}

export default Pokemon;

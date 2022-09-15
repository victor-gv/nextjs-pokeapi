import React from "react";
import { GetStaticPaths } from "next";

interface Pokemon {
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
}

const Pokemon = (pokemon: any) => {
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
                  <td>95</td>
                </tr>
                <tr>
                  <th>Attack</th>
                  <td>65</td>
                </tr>

                <tr>
                  <th>Defense</th>
                  <td>65</td>
                </tr>

                <tr>
                  <th>Special Attack</th>
                  <td>110</td>
                </tr>
                <tr>
                  <th>Special Defense</th>
                  <td>130</td>
                </tr>
                <tr>
                  <th>Speed</th>
                  <td>60</td>
                </tr>
              </tbody>
            </table>

            <div className="card__abilities">
              <h4 className="card__ability">
                <span className="card__label">Ability</span>
                Cute Charm
              </h4>
              <h4 className="card__ability">
                <span className="card__label">Hidden Ability</span>
                Pixilate
              </h4>
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const req = await fetch("https://pokeapi.co/api/v2/pokemon");
  const res = await req.json();

  const paths = res.results.map((pokemon: Pokemon) => {
    return {
      params: { name: pokemon.name },
    };
  });

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
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

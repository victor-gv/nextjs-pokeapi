import React from "react";
import { GetStaticPaths } from "next";

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
  console.log(pokemon);
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
      
      <figure className="card card--fairy">
  <div className="card__image-container">
    <img src="https://cdn.bulbagarden.net/upload/thumb/e/e8/700Sylveon.png/600px-700Sylveon.png" alt="Sylveon" className="card__image"/>   
  </div>
  
  <figcaption className="card__caption">
    <h1 className="card__name">Sylveon</h1>

    <h3 className="card__type">
      fairy
    </h3>

    <table className="card__stats">
      <tbody><tr>
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
    </tbody></table>
    
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

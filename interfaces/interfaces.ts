
export interface PokemonsData {
    pokemon: [{ name: string; url: string }];
    types: [
      {
        id: number;
        types: string[];
      }
    ];
}
  
export interface Props {
    children: JSX.Element | JSX.Element[];
}
  
export interface Query {
    query: string;
}

export type pokemon = {
    name: string;
    url: string;
  };
  
export type pokemonList = [pokemon];
  

  
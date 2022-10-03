import React from "react";
import PageLayout from "../../components/PageLayout";

type Props = {};

export default function Component({ query, results }: any) {
  console.log(results)
  return (
    <>
      <PageLayout>
        {results.length !== 0 ? (
          <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800">
            <h1 className="text-3xl font-bold mb-5 text-sky-500">Poke Api</h1>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800">
              <h1 className="flex justify-center pt-10 mb-5 font-bold text-3xl text-yellow-300 ">
                Results for {query}
              </h1>
              <div className="flex flex-row justify-center items-center bg-gray-800">
                <div className="flex flex-col justify-center items-center bg-gray-800">
                  <img
                    className="w-40 h-40"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${results.id}.png`}
                    alt={results.name}
                  />
                  <h1 className="flex justify-center pt-10 mb-5 font-bold font-luckiest text-6xl text-yellow-300 title ">
                    {results.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800">
            <h1 className="flex justify-center pt-10 mb-5 font-bold text-3xl text-yellow-300">
              No results for {query}
            </h1>
          </div>
        )}
      </PageLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const q = query.query;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
    const results = await res.json();
    return {
      props: {
        results,
        query: q,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        results: [],
        query: q,
      },
    };
  }
}

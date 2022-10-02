import React from "react";

type Props = {};

export default function Component({ query, results }: any) {
  console.log({ results });
  return (
    <>
      <h1>Results for {query}</h1>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const q = query.query;

  const req = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${q}`
  );
  const res = await req.json();

  return {
    props: {
      query: q,
      results: res,
    },
  };
}

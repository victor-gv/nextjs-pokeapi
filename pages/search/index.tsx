import React from "react";

type Props = {};

export default function Component({ query }: any) {
  console.log({ query });
  return (
    <>
      <h1>Results for {query}</h1>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const q = query.query;
  return {
    props: {
      query: q,
    },
  };
}

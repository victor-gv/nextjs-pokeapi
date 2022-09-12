import React from "react";
import Head from "next/head";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="text-3xl font-bold mb-5 text-sky-500">Poke Api</h1>
      </header>
      <main>{children}</main>
    </>
  );
};

export default PageLayout;

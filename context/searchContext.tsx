import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const searchContext = React.createContext(
  {} as {
    searchCall: any;
    setSearchCall: any;
  }
);

function SearchContextProvider({ children }: any) {
  const [searchCall, setSearchCall] = useState({});

  return (
    <searchContext.Provider value={{ searchCall, setSearchCall }}>
      {children}
    </searchContext.Provider>
  );
}

export default SearchContextProvider;

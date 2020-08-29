import React, { useState, useEffect } from "react";
import trim from "lodash.trim";
import debounce from "lodash.debounce";
import Dropdown from "./Dropdown";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const boundingBox = "-0.510375,51.28676,0.334015,51.691874";

  const handleInputChange = (inputValue) => {
    if (trim(inputValue) !== trim(input)) {
      setInput(inputValue);
    }
  };

  useEffect(() => {
    const fetchResults = async (input) => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?bbox=${boundingBox}&access_token=${accessToken}`;
      const data = await fetch(url);
      const json = await data.json();
      const newResults = json.features;
      console.log(newResults);
      setResults(newResults);
    };

    const debounceFetchResults = debounce(fetchResults, 300);

    if (input) {
      debounceFetchResults(input);
    } else {
      setResults([]);
    }
  }, [input, accessToken]);

  return (
    <div className="flex flex-col items-center mx-12">
      <h1 className="text-4xl mb-6">Search map:</h1>
      <div className="w-screen-3/4 max-w-xl border border-gray-600 rounded-md">
        <input
          className="text-xl py-3 px-5 w-full rounded-md"
          type="search"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {results?.length > 0 && <Dropdown results={results} />}
      </div>
    </div>
  );
};

export default Search;

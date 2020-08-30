import React, { useState, useEffect, useCallback } from "react";
import trim from "lodash.trim";
import debounce from "lodash.debounce";
import Dropdown from "./Dropdown";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const boundingBox = "-0.510375,51.28676,0.334015,51.691874";

  const handleInputChange = (inputValue) => {
    if (trim(inputValue) !== trim(input)) {
      setInput(inputValue);
    }
  };

  useEffect(() => {
    setSelectedItem(results[selectedItemIndex]);
  }, [selectedItemIndex, results]);

  useEffect(
    useCallback(() => {
      console.log(selectedItemIndex);
    }, [selectedItemIndex]),
    [selectedItemIndex]
  );

  const handleKeyDown = (e) => {
    const key = e.key;

    switch (key) {
      case "ArrowUp":
        e.preventDefault();

        if (selectedItemIndex > 0) {
          setSelectedItemIndex(selectedItemIndex - 1);
        } else {
          setSelectedItemIndex(results.length - 1);
        }

        break;
      case "ArrowDown":
        e.preventDefault();

        if (selectedItemIndex < results.length - 1) {
          setSelectedItemIndex(selectedItemIndex + 1);
        } else if (selectedItemIndex === 4) {
          setSelectedItemIndex(0);
        } else {
          setSelectedItemIndex(0);
        }

        break;
      default:
        break;
    }
  };

  const handleMouseEnter = (e) => {};
  const handleMouseLeave = (e) => {};

  const getResults = async (input) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?bbox=${boundingBox}&access_token=${accessToken}`;
    const data = await fetch(url);
    const json = await data.json();
    const newResults = json.features;
    console.log(newResults);
    setResults(newResults);
  };

  const debounceGetResults = useCallback(debounce(getResults, 300), []);

  useEffect(() => {
    if (input.length > 2) {
      debounceGetResults(input);
    } else {
      setResults([]);
    }
  }, [input, accessToken, debounceGetResults]);

  return (
    <div className="flex flex-col items-center mx-12">
      <h1 className="text-4xl mb-6">Search map:</h1>
      <div className="w-screen-3/4 max-w-xl border border-gray-600 rounded-md">
        <input
          className="text-xl py-3 px-5 w-full rounded-md"
          type="search"
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {results?.length > 0 && (
          <Dropdown
            results={results}
            selectedItem={selectedItem}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    </div>
  );
};

export default Search;

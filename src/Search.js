import React, { useState, useEffect, useCallback, useRef } from "react";
import trim from "lodash.trim";
import debounce from "lodash.debounce";
import Dropdown from "./Dropdown";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const itemRefs = useRef([]);
  const searchRef = useRef();
  const dropdownRef = useRef();

  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const boundingBox = "-0.510375,51.28676,0.334015,51.691874";

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
    if (input.length > 2 && input === trim(input)) {
      debounceGetResults(input);
    } else if (input !== trim(input)) {
      return;
    } else {
      setResults([]);
    }
  }, [input, accessToken, debounceGetResults]);

  const handleInputChange = (inputValue) => {
    setInput(inputValue);
  };

  useEffect(() => {
    setSelectedItem(results[selectedItemIndex]);
  }, [selectedItemIndex, results]);

  useEffect(() => {
    input && setSelectedResult(null);
  }, [input]);

  const handleSelectResult = useCallback(() => {
    console.log(results[selectedItemIndex]);
    setSelectedResult(results[selectedItemIndex]);
    setInput("");
    setSelectedItemIndex(null);
  }, [results, selectedItemIndex]);

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

        if (
          selectedItemIndex !== null &&
          selectedItemIndex < results.length - 1
        ) {
          setSelectedItemIndex(selectedItemIndex + 1);
        } else {
          setSelectedItemIndex(0);
        }

        break;
      case "Enter":
        selectedItem && handleSelectResult();
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (e) => {
    setSelectedItemIndex(itemRefs.current.indexOf(e.target));
  };
  const handleMouseOut = (e) => {
    itemRefs.current.includes(e.relatedTarget) || setSelectedItemIndex(null);
  };

  const handleClick = useCallback(
    (e) => {
      if (!searchRef.current.contains(e.target)) {
        results.length &&
          dropdownRef.current &&
          dropdownRef.current.classList.add("hidden");
        searchRef.current.classList.remove("shadow-inner");
      } else if (
        dropdownRef.current &&
        dropdownRef.current.contains(e.target)
      ) {
        handleSelectResult();
      } else {
        results.length && searchRef.current.classList.add("shadow-inner");
      }
    },
    [results, handleSelectResult]
  );

  const handleInputFocus = () => {
    dropdownRef.current && dropdownRef.current.classList.remove("hidden");
    selectedItemIndex && setSelectedItemIndex(null);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  const resultsInputStyle = results.length ? " focus:shadow-none" : "";
  const innerShadow = results.length ? " shadow-inner" : "";

  const showResult = selectedResult && <div>{selectedResult.place_name}</div>;

  return (
    <>
      <div
        className={
          "w-screen-3/4 max-w-xl border border-gray-600 rounded-md mb-64" +
          innerShadow
        }
        ref={searchRef}
      >
        <input
          className={
            "text-xl leading-extra px-5 w-full rounded-md focus:outline-none focus:shadow-inner bg-transparent" +
            resultsInputStyle
          }
          type="search"
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={input}
          onFocus={handleInputFocus}
        />
        {results?.length > 0 && (
          <Dropdown
            results={results}
            selectedItem={selectedItem}
            handleMouseMove={handleMouseMove}
            handleMouseOut={handleMouseOut}
            itemRefs={itemRefs}
            dropdownRef={dropdownRef}
          />
        )}
      </div>
      {showResult}
    </>
  );
};

export default Search;

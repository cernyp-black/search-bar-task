import React from "react";
import "./styles/main.css";
import Search from "./Search";

const App = () => {
  return (
    <div className="min-h-screen pt-40 flex flex-col items-center">
      <div className="flex flex-col items-center mx-12">
        <h1 className="text-4xl mb-6">Search map:</h1>
        <Search />
      </div>
    </div>
  );
};

export default App;

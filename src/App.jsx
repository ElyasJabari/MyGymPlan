import { useState } from "react";
import Header from "./Components/Header";
import MuscleGroups from "./Components/MuscleGroups";
import { Routes, Route } from "react-router-dom";
import Exercises from "./Components/Exercises";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MuscleGroups />} />
        <Route path="/exercises/:name" element={<Exercises />} />
      </Routes>
    </>
  );
}

export default App;

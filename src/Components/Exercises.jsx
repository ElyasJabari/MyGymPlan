import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Exercises() {
  const { name } = useParams();
  const [exercises, setExercises] = useState([
    { id: 1, name: "Lattzug", weight: 27, set: 3 },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  console.log("### Exercises: ", exercises);

  return (
    <div>
      {exercises.map((e) => (
        <li key={e.id}>{e.name}</li>
      ))}

      <h2>Klicke auf den Button, um eine Übung für {name} hinzuzufügen.</h2>
      <button onClick={() => setIsOpen(true)}>Übung Hinzufügen</button>

      {isOpen && (
        <div>
          <button onClick={() => setIsOpen(false)}>X</button>
          <h2>Hallo</h2>
          <p>Das ist ein einfaches Modal-Fenster in React.</p>
        </div>
      )}
    </div>
  );
}

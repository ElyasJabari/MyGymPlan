import { useState } from "react";
import { useParams } from "react-router-dom";
import "../Index.css";

export default function Exercises() {
  const { name } = useParams();
  const [exercises, setExercises] = useState([
    { id: 1, name: "Lattzug", weight: 27, set: 3 },
    { id: 2, name: "Rudern", weight: 2, set: 4 },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [excercisName, setExercisName] = useState("");
  const [exercisWeight, setExercisWeight] = useState("");
  const [exercisSet, setExercisSet] = useState("");

  console.log("### Exercises: ", exercises);

  const handelAdd = () => {
    console.log("### ExercisesName: ", excercisName);

    const newId =
      exercises.length > 0 ? exercises[exercises.length - 1].id + 1 : 1;

    setExercises([
      ...exercises,
      { id: newId, name: excercisName, weight: exercisWeight, set: exercisSet },
    ]);
    setIsOpen(false);
  };

  return (
    <div>
      <h2>Klicke auf den Button, um eine Übung für {name} hinzuzufügen.</h2>
      <button onClick={() => setIsOpen(true)}>Übung Hinzufügen</button>

      {exercises.map((e) => (
        <ul key={e.id}>
          <li>{e.name}</li>
          <button
            onClick={() => {
              setExercises(exercises.filter((f) => f.id !== e.id));
            }}
          >
            Löschen
          </button>
        </ul>
      ))}

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              X
            </button>

            <input type="Number" placeholder="Id" />
            <input
              type="text"
              placeholder="Neue Übung"
              onChange={(e) => setExercisName(e.target.value)}
            />
            <input
              type="Number"
              placeholder="Gewicht"
              onChange={(e) => setExercisWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Wiederholung"
              onChange={(e) => setExercisSet(e.target.value)}
            />

            <button onClick={handelAdd}>Hinzufügen</button>
          </div>
        </div>
      )}
    </div>
  );
}

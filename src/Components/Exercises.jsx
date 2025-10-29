import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Index.css";

export default function Exercises() {
  const { name } = useParams();

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("exercises");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Lattzug", weight: 27, set: 3, katagorie: name },
          { id: 2, name: "Rudern", weight: 2, set: 4, katagorie: name },
        ];
  });
  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const [isOpen, setIsOpen] = useState(false);
  const [excercisName, setExercisName] = useState("");
  const [exercisWeight, setExercisWeight] = useState("");
  const [exercisSet, setExercisSet] = useState("");
  const [tempExercisId, setTempExercisId] = useState();
  const [draggedExercises, setDraggedExercises] = useState(null);

  console.log("### Exercises: ", exercises);

  const handelAdd = () => {
    console.log("### ExercisesName: ", excercisName);

    if (tempExercisId) {
      setExercises(
        exercises.map((e) =>
          e.id === tempExercisId
            ? {
                ...e,
                name: excercisName,
                weight: exercisWeight,
                set: exercisSet,
              }
            : e
        )
      );
      setTempExercisId(null);
    } else {
      const newId =
        exercises.length > 0 ? exercises[exercises.length - 1].id + 1 : 1;

      setExercises([
        ...exercises,
        {
          id: newId,
          name: excercisName,
          weight: exercisWeight,
          set: exercisSet,
          katagorie: name,
        },
      ]);
    }
    setExercisName("");
    setExercisWeight("");
    setExercisSet("");

    setIsOpen(false);
  };

  const handleChangeName = (id, name, weight, set) => {
    console.log("### id: ", id);
    console.log("### name: ", name);
    console.log("### weight: ", weight);
    console.log("### set: ", set);

    setTempExercisId(id);
    setExercisName(name);
    setExercisWeight(weight);
    setExercisSet(set);
    setIsOpen(true);
  };

  const dragStart = (id) => {
    console.log("### start: ", id);
    setDraggedExercises(id);
  };

  const dragOver = (e) => {
    e.preventDefault();
    console.log("### drag over");
  };

  const drop = (index) => {
    console.log("### drop", index);

    const tempArray = [...exercises];

    const fromIndex = tempArray.findIndex((f) => f.id === draggedExercises);
    console.log("### fromIndex : ", fromIndex);

    const toIndex = tempArray.findIndex((f) => f.id === index);
    console.log("### toIndex : ", toIndex);

    const [updated] = tempArray.splice(fromIndex, 1);
    tempArray.splice(toIndex, 0, updated);

    setExercises(tempArray);
    setDraggedExercises(null);
    console.log("### nach drop: ", exercises);
  };

  return (
    <div>
      <h2>Klicke auf den Button, um eine Übung für {name} hinzuzufügen.</h2>
      <button onClick={() => setIsOpen(true)}>Übung Hinzufügen</button>
      <button onClick={() => setExercises([])}>Alle Löschen</button>

      {exercises
        .filter((e) => e.katagorie === name)
        .map((e) => (
          <ul key={e.id}>
            <li
              draggable
              onDragStart={() => dragStart(e.id)}
              onDragOver={dragOver}
              onDrop={() => drop(e.id)}
            >
              {e.name} Gewicht:{e.weight} Wiederholung:{e.set}
            </li>
            <button
              onClick={() => handleChangeName(e.id, e.name, e.weight, e.set)}
            >
              Bearbeiten
            </button>
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

            <input
              type="text"
              placeholder="Neue Übung"
              onChange={(e) => setExercisName(e.target.value)}
              value={excercisName}
            />
            <input
              type="Number"
              placeholder="Gewicht"
              onChange={(e) => setExercisWeight(e.target.value)}
              value={exercisWeight}
            />
            <input
              type="number"
              placeholder="Wiederholung"
              onChange={(e) => setExercisSet(e.target.value)}
              value={exercisSet}
            />

            <button onClick={handelAdd}>Hinzufügen</button>
          </div>
        </div>
      )}
    </div>
  );
}

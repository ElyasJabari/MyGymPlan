import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Exercises.css";

export default function Exercises() {
  const { name } = useParams();
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("exercises");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, name: "Beinpresse", weight: 27, set: 3, katagorie: name }];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [excercisName, setExercisName] = useState("");
  const [exercisWeight, setExercisWeight] = useState("");
  const [exercisSet, setExercisSet] = useState("");
  const [tempExercisId, setTempExercisId] = useState();
  const [draggedExercises, setDraggedExercises] = useState(null);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const handelAdd = () => {
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

  const deleteAll = () => {
    setExercises(exercises.filter((e) => e.katagorie !== name));
  };

  const handleChangeName = (id, name, weight, set) => {
    setTempExercisId(id);
    setExercisName(name);
    setExercisWeight(weight);
    setExercisSet(set);
    setIsOpen(true);
  };

  const dragStart = (id) => {
    setDraggedExercises(id);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (index) => {
    const tempArray = [...exercises];
    const [updated] = tempArray.splice(draggedExercises, 1);
    tempArray.splice(index, 0, updated);
    setExercises(tempArray);
    setDraggedExercises(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setExercisName("");
    setExercisWeight("");
    setExercisSet("");
    setTempExercisId(null);
  };

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <h2>Hier kannst du eine Übung für {name} hinzuzufügen.</h2>
        <div className="exercise-actions">
          <button
            className="exercise-btn exercise-btn-primary"
            onClick={() => setIsOpen(true)}
          >
            Übung Hinzufügen
          </button>
          <button
            className="exercise-btn exercise-btn-danger"
            onClick={deleteAll}
          >
            Alle Löschen
          </button>
        </div>
      </div>

      <div className="exercise-list">
        {exercises
          .filter((e) => e.katagorie === name)
          .map((e) => {
            const globalIndex = exercises.findIndex((ex) => ex.id === e.id);
            return (
              <div
                key={e.id}
                className="exercise-item"
                draggable
                onDragStart={() => dragStart(globalIndex)}
                onDragOver={dragOver}
                onDrop={() => drop(globalIndex)}
              >
                <div className="exercise-content">
                  <div className="exercise-main">
                    <div className="exercise-info">
                      <div className="exercise-name">{e.name}</div>
                      <div className="exercise-details">
                        Gewicht: {e.weight}kg | Wiederholung: {e.set}
                      </div>
                    </div>
                    <div className="exercise-actions-buttons">
                      <button
                        className="btn-edit-exercise"
                        onClick={() =>
                          handleChangeName(e.id, e.name, e.weight, e.set)
                        }
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="btn-delete-exercise"
                        onClick={() => {
                          setExercises(exercises.filter((f) => f.id !== e.id));
                        }}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="close-btn">
              X
            </button>

            <div className="modal-inputs">
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
            </div>

            <button
              className="exercise-btn exercise-btn-primary"
              onClick={handelAdd}
            >
              {tempExercisId ? "Speicher" : "Hinzufügen"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

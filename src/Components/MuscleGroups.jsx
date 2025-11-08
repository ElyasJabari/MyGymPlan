import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./MuscleGroups.css";

export default function MuscleGroups() {
  const [muscleGroups, setMuscleGroups] = useState(() => {
    const saved = localStorage.getItem("muscleGroups");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Beine" },
          { id: 2, name: "Po" },
          { id: 3, name: "Rücken" },
          { id: 4, name: "Brust" },
          { id: 5, name: "Schulter" },
          { id: 6, name: "Arme" },
          { id: 7, name: "Bauch" },
          { id: 8, name: "Sonstiges" },
        ];
  });
  const [newMuscleGroup, setNewMuscleGroup] = useState("");
  const [changName, setChangeName] = useState();
  const [draggedMuscleGroup, setDraggedMuscleGroup] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("muscleGroups", JSON.stringify(muscleGroups));
  }, [muscleGroups]);

  const handelAdd = () => {
    if (changName) {
      setMuscleGroups(
        muscleGroups.map((m) =>
          m.id === changName ? { ...m, name: newMuscleGroup } : m
        )
      );
      setChangeName(null);
    } else {
      const newId =
        muscleGroups.length > 0
          ? muscleGroups[muscleGroups.length - 1].id + 1
          : 1;
      setMuscleGroups([...muscleGroups, { id: newId, name: newMuscleGroup }]);
    }
    setNewMuscleGroup("");
  };

  const handleChangeName = (name, id) => {
    setChangeName(id);
    setNewMuscleGroup(name);

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  const handleDragStart = (index) => {
    setDraggedMuscleGroup(index);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (index) => {
    const copieArray = [...muscleGroups];
    const [update] = copieArray.splice(draggedMuscleGroup, 1);
    copieArray.splice(index, 0, update);
    setMuscleGroups(copieArray);
    setDraggedMuscleGroup(null);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <p>Verwalte deine Trainingsbereiche</p>
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Neue Muskelgruppe..."
            onChange={(e) => setNewMuscleGroup(e.target.value)}
            value={newMuscleGroup}
          />
          <button className="btn btn-primary" onClick={handelAdd}>
            {changName ? "Speichern" : "Hinzufügen"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setMuscleGroups([])}
          >
            Alle Löschen
          </button>
        </div>
        <ul className="muscle-groups-list">
          {muscleGroups.map((m, index) => (
            <div
              key={m.id}
              className="muscle-group-item"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleOnDragOver}
              onDrop={() => handleOnDrop(index)}
            >
              <div className="muscle-group-content">
                <div className="muscle-group-main">
                  <Link
                    className="muscle-group-link"
                    to={`/exercises/${m.name}`}
                  >
                    {m.name}
                  </Link>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleChangeName(m.name, m.id)}
                    >
                      Bearbeiten
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        setMuscleGroups(
                          muscleGroups.filter((f) => f.id !== m.id)
                        );
                      }}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

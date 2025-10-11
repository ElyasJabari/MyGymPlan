import { useState } from "react";

export default function MuscleGroups() {
  const [muscleGroups, setMuscleGroups] = useState([
    { id: 1, name: "Beine" },
    { id: 2, name: "Po" },
    { id: 3, name: "Rücken" },
    { id: 4, name: "Brust" },
    { id: 5, name: "schulter" },
    { id: 6, name: "Arme" },
    { id: 7, name: "Bauch" },
    { id: 8, name: "Sonstiges" },
  ]);
  const [newMuscleGroup, setNewMuscleGroup] = useState("");

  console.log("### Muskel gruppe: ", muscleGroups);

  const handelAdd = () => {
    setMuscleGroups([
      ...muscleGroups,
      {
        id: muscleGroups[muscleGroups.length - 1].id + 1,
        name: newMuscleGroup,
      },
    ]);
    setNewMuscleGroup("");
  };

  return (
    <div>
      <ul>
        <input
          type="text"
          placeholder="Neue Muskelgruppe..."
          onChange={(e) => setNewMuscleGroup(e.target.value)}
          value={newMuscleGroup}
        />
        <button onClick={handelAdd}>Hinzufügen</button>
        {muscleGroups.map((m) => (
          <div key={m.id}>
            <li>{m.name}</li>
            <button
              onClick={() => {
                setMuscleGroups(muscleGroups.filter((f) => f.id !== m.id));
              }}
            >
              Löschen
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

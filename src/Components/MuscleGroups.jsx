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
    const newId =
      muscleGroups.length > 0
        ? muscleGroups[muscleGroups.length - 1].id + 1
        : 1;

    setMuscleGroups([...muscleGroups, { id: newId, name: newMuscleGroup }]);
    setNewMuscleGroup("");
  };

  return (
    <div>
      <p>Verwalte deine Trainingsbereiche</p>
      <ul>
        <input
          type="text"
          placeholder="Neue Muskelgruppe..."
          onChange={(e) => setNewMuscleGroup(e.target.value)}
          value={newMuscleGroup}
        />
        <button onClick={handelAdd}>Hinzufügen</button>
        <button onClick={() => setMuscleGroups([])}>Alle Löschen</button>
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

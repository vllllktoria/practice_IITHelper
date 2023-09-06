import React from "react";
import axios from "axios";

export function AddGroup({newGroupInput, setGroups, setNewlyAddedGroup, setIsNewGroupAdded, setNewGroupInput}){

    const addGroup = async () => {
        if (newGroupInput) {
          try {
            const response = await axios.post('http://45.9.42.26:22000/api/group', { title: newGroupInput });
            console.log(response)
            const newGroup = { id: response.data.id, title: response.data.title };
            setGroups(prevGroups => [...prevGroups, newGroup]);
            setNewlyAddedGroup(newGroupInput);
            setIsNewGroupAdded(true);
            setNewGroupInput("");
            console.log("Группа добавлена");
            console.log(response.data.id, response.data.title)
          } catch (error) {
            console.error('Ошибка при добавлении группы:', error);
          }
        }
      };

      return (
        <div className="params">
            <p>
            <input
                type="text"
                name="textInput"
                placeholder="Группа"
                value={newGroupInput}
                onChange={(event) => setNewGroupInput(event.target.value)}
            />
            </p>
            <p>
            <input
                className="editSch"
                type="button"
                name="addButton"
                value="Добавить группу"
                onClick={addGroup}
            />
            </p>
        </div>
    )
}
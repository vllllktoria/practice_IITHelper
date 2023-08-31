import React from "react";

export function GroupChange({selectedGroup, setSelectedGroup, setIsEditing, groups}){

    const handleGroupChange = (event) => {
        const group = event.target.value;
        setSelectedGroup(group);
        setIsEditing(false);
      };

      return(
        <form name="myForm">
        <select onChange={handleGroupChange} value={selectedGroup}>
            <option key="id" value="">
              Выберите группу
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.title}
              </option>
            ))}
          </select>
        </form>
      )
}
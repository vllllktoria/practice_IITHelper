import React from "react";

export function GroupChange({selectedGroup, setSelectedGroup, setIsEditing, groups}){

    const handleGroupChange = (event) => {
        const group = event.target.value;
        setSelectedGroup(group);
        setIsEditing(false);
        console.log(event.target.value)
      };

      return(
        <form name="myForm">
        <select onChange={handleGroupChange} value={selectedGroup}>
            <option key="id" value="">
              Выберите группу
            </option>
            {groups.map((group, key) => (
              <option key={key} value={group.title}>
                {group.title}
              </option>
            ))}
          </select>
        </form>
      )
}
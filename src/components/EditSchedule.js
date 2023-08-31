import React from "react";

export function EditSchedule({selectedGroup, setIsEditing, setGroupWarning, setActive}){

    const handleEditClick = () => {
        if (selectedGroup) {
          setIsEditing(true)}
        else {
          setGroupWarning("Выберите группу")
        }
        setActive(false);
      }

    return(
        <button className="editSch" onClick={handleEditClick}>
            Редактировать расписание
        </button>
    )
}
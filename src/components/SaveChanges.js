import React from "react";

export function SaveChanges({
  scheduleData,
  selectedGroup,
  editedSchedule,
  setScheduleData,
  setEditedSchedule,
  setIsEditing,
  setActive,
  active,
}) {
  const handleSaveChangesClick = () => {
    const newScheduleData = { ...scheduleData };

    if (editedSchedule[selectedGroup]) {
      newScheduleData[selectedGroup] = editedSchedule[selectedGroup];
    }

    setScheduleData(newScheduleData);
    setEditedSchedule({});
    setIsEditing(false);
    setActive(!active);
    console.log(newScheduleData)
  };

  return (
    <button
      onClick={handleSaveChangesClick}
      className={active ? "editSch" : "save-btn"}
    >
      Сохранить изменения
    </button>
  );
}

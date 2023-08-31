import React from "react";

export function DateChange({ groupStates, setSelectedDate, setGroupStates, selectedDate, selectedGroup, scheduleWarning }) {

  const handleDateChange = (event) => {
    const newGroupStates = { ...groupStates };
    if (newGroupStates[selectedGroup]) {
      newGroupStates[selectedGroup].selectedDate = event.target.value;
      setGroupStates(newGroupStates);
      setSelectedDate(event.target.value);
    } 
    console.log(event.target.value);
  };

  return (
    <div className="chooseDate">
      <h3 className="semestr">Выберите дату начала семестра:</h3>
      <label className="date">
        <input
          className={selectedDate ? "" : "error"}
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          name="selectedDate"
        />
      </label>
      <p className="warning">{groupStates[selectedGroup]?.scheduleWarning}</p>
    </div>
  );
}

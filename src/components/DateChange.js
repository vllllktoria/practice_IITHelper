import React from "react";

export function DateChange({groupStates, setGroupStates, selectedDate, selectedGroup, scheduleWarning }) {

    const handleDateChange = (event, groupId) => {
        const newGroupStates = { ...groupStates };
        if (newGroupStates[groupId]) {
          newGroupStates[groupId].selectedDate = event.target.value
          setGroupStates(newGroupStates);
        } else {
          console.error(`Группа ${groupId} не существует`);
        }
      };

      return(
        <div className="chooseDate">   
        <h3 className="semestr">Выберите дату начала семестра:</h3>
            <label className="date">
              <input
                className={selectedDate ? "" : "error"}
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </label>
            <p className="warning">{groupStates[selectedGroup]?.[scheduleWarning]}</p>
        </div>
      )
}
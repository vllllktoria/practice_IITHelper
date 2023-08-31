import React from "react";

export function AddDeletePair({scheduleData, selectedGroup, selectedWeek, setScheduleData}){

    const handleAddPairClick = () => {
        const newScheduleData = { ...scheduleData };
      
        if (!newScheduleData[selectedGroup]?.[selectedWeek]) {
          newScheduleData[selectedGroup] = {};
          newScheduleData[selectedGroup][selectedWeek] = [];
        }
      
        newScheduleData[selectedGroup][selectedWeek].push({});
        setScheduleData(newScheduleData);
      };
      
      const handleCancelAddPairClick = () => {
        const newScheduleData = { ...scheduleData };
      
        if (newScheduleData[selectedGroup][selectedWeek]) {
          newScheduleData[selectedGroup][selectedWeek].pop();
          setScheduleData(newScheduleData);
        }
      };

    return(
        <div className="add-pair">
            <button className="editSch" onClick={handleAddPairClick}>
              Добавить пару
            </button>
            <button className="editSch" onClick={handleCancelAddPairClick}>
              Удалить
            </button>
          </div>
    )
}
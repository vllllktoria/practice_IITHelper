import React, { useState } from "react";

function ScheduleForm() {
  const [selectedGroup, setSelectedGroup] = useState(""); 
  const [scheduleData, setScheduleData] = useState([]);

  const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  const handleGroupChange = (event) => {
    const group = event.target.value;
    setSelectedGroup(group);
    const emptyDay = Array(6).fill({ subject: "", time: "" });
    const scheduleData = {
      "ПрИ-101": [
        emptyDay,
        emptyDay,
        emptyDay,
        emptyDay,
        emptyDay,
        
      ],
      "ПрИ-102": [
        emptyDay,
        emptyDay,
        emptyDay,
        emptyDay,
        emptyDay,
      ],
    };

    setScheduleData(scheduleData[group] || []);
  };

  return (
  <div className="schedule-form">
    <div className="params">
    <select onChange={handleGroupChange} value={selectedGroup}>
      <option value="">Выберите группу</option>
      <option value="ПрИ-101">ПрИ-101</option>
      <option value="ПрИ-102">ПрИ-102</option>
    </select>
    
    <button className="editSch">Изменить расписание</button>
  </div>
  
  <div className="schedule-table">
    <table>
      <thead>
        <tr>
          {daysOfWeek.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((daySchedule, index) => (
          <tr key={index}>
            {daySchedule.map((item, innerIndex) => (
              <td key={innerIndex}>
                <div>{item.subject}</div>
                <div>{item.time}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default ScheduleForm;

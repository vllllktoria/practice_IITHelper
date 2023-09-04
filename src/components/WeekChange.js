import React from "react";

export function WeekChange({ selectedWeek, setSelectedWeek, setIsEditing }) {
  const handleWeekChange = (event) => {
    const week = event.target.value;
    setSelectedWeek(week);
    setIsEditing(false);
  };

  return (
    <select
      onChange={handleWeekChange}
      value={selectedWeek}
    >
      <option value="Первая неделя">Первая неделя</option>
      <option value="Вторая неделя">Вторая неделя</option>
    </select>
  );
}

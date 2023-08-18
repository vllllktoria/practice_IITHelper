import React, { useState } from "react";
import Table from "./Table";

function ScheduleForm() {
  const [selectedGroup, setSelectedGroup] = useState("");
  
  const [groups, setGroups] = useState(
    ["ПрИ-101", "ПрИ-102"]
    );
  const [newGroupInput, setNewGroupInput] = useState("");
  const [editedSchedule, setEditedSchedule] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingGroup, setIsAddingGroup] = useState(false);  

  const scheduleData = {
    "ПрИ-101": [
      { monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      { monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      { monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" }
    ],
    "ПрИ-102": [
      { monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
    ],
  };

  const columns = [
    {
      Header: 'Понедельник',
      accessor: 'monday'
    },
    {
      Header: 'Вторник',
      accessor: 'tuesday'
    },
    {
      Header: 'Среда',
      accessor: 'wednesday'
    },
    {
      Header: 'Четверг',
      accessor: 'thursday'
    },
    {
      Header: 'Пятница',
      accessor: 'friday'
    },
    {
      Header: 'Суббота',
      accessor: 'saturday'
    }
  ];

  const handleGroupChange = (event) => {
    const group = event.target.value;
    setSelectedGroup(group);
    setIsEditing(false);
  };
  

  const handleAddButtonClick = () => {
    if (newGroupInput && !groups.includes(newGroupInput)) {
      setGroups([...groups, newGroupInput]);
      setNewGroupInput("");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChangesClick = () => {
    scheduleData[selectedGroup] = editedSchedule[selectedGroup];
    setEditedSchedule({});
    setIsEditing(false);
  };

  const data = selectedGroup ? scheduleData[selectedGroup] || [] : [];


  return (
    <div className="schedule-form">
      <div className="params">
        <form name="myForm">
          <select onChange={handleGroupChange} value={selectedGroup}>
            <option value="">Выберите группу</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </form>

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
            type="button"
            name="addButton"
            value="Добавить"
            onClick={handleAddButtonClick}
          />
        </p>

        {isEditing ? (
          <button className="editSch" onClick={handleSaveChangesClick}>Сохранить изменения</button>
        ) : (
          <button className="editSch" onClick={handleEditClick}>Изменить расписание</button>
        )}

      </div>
      {selectedGroup && (
        <div className="table">
          <Table 
          columns={columns}
          data={data}
          isEditing={isEditing}
          editedSchedule={editedSchedule}
          setEditedSchedule={setEditedSchedule}/>
        </div>
      )}
    </div>
  );
}

export default ScheduleForm;

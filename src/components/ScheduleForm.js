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
  const [isAddingPair, setIsAddingPair] = useState(false);
  const [addedRows, setAddedRows] = useState([]);

  const [scheduleData, setScheduleData] = useState({
    "ПрИ-101": [],
    "ПрИ-102": []
  });

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
  

  const handleAddPairClick = () => {
    const newScheduleData = { ...scheduleData };
  
    if (!newScheduleData[selectedGroup]) {
      newScheduleData[selectedGroup] = [];
    }
  
    newScheduleData[selectedGroup].push({});
    setScheduleData(newScheduleData);
  };
  
  const handleCancelAddPairClick = () => {
    const newScheduleData = { ...scheduleData };
  
    if (newScheduleData[selectedGroup]) {
      newScheduleData[selectedGroup].pop();
      setScheduleData(newScheduleData);
    }
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
    const newScheduleData = { ...scheduleData };
  
    if (editedSchedule[selectedGroup]) {
      newScheduleData[selectedGroup] = editedSchedule[selectedGroup];
    }
  
    setScheduleData(newScheduleData);
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
          className="editSch"
            type="button"
            name="addButton"
            value="Добавить группу"
            onClick={handleAddButtonClick}
          />
        </p>

        {isEditing && (
        <div>
          <button className="editSch" onClick={handleSaveChangesClick}>
            Сохранить изменения
          </button>
          <button className="editSch" onClick={handleAddPairClick}>
            Добавить пару
          </button>
          <button className="editSch" onClick={handleCancelAddPairClick}>
            Удалить
          </button>
        </div>
      )}
      {!isEditing && (
        <button className="editSch" onClick={handleEditClick}>
          Изменить расписание
        </button>
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

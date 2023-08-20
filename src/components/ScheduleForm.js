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
  /* const [isAddingPair, setIsAddingPair] = useState(false);
  const [addedRows, setAddedRows] = useState([]); */
  const [selectedWeek, setSelectedWeek] = useState({});
  const [isNewGroup, setIsNewGroup] = useState({})
  

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

  const handleWeekChange = (event) => {
    const week = event.target.value;
    setSelectedWeek(week);
    setIsEditing(false);
  };
  

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

  const data =
  selectedGroup && selectedWeek
    ? scheduleData[selectedGroup]?.[selectedWeek] || []
    : [];

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

        {isEditing ? (
        <div>
          <button className="editSch" onClick={handleSaveChangesClick}>
            Сохранить изменения
          </button>
        </div>
        ) : (
        <button className="editSch" onClick={handleEditClick}>
          Изменить расписание
        </button>
        )}
      </div>
          
      <div className="chooseWeek">
      <select onChange={handleWeekChange} value={selectedWeek}>
        <option value="Первая неделя">Первая неделя</option>
        <option value="Вторая неделя">Вторая неделя</option>
        </select>
      </div>

      {selectedGroup && (
        <div className="table">
          <Table 
          columns={columns}
          data={data}
          isEditing={isEditing}
          editedSchedule={editedSchedule}
          setEditedSchedule={setEditedSchedule}/>

      {isEditing && (
          <div className="add-pair">
            <button className="editSch" onClick={handleAddPairClick}>
              Добавить пару
            </button>
            <button className="editSch" onClick={handleCancelAddPairClick}>
              Удалить
            </button>
          </div>
        )}
        </div>
      )}
      
    </div>
  );
}

export default ScheduleForm;

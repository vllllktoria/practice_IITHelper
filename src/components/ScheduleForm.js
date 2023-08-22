import React, { useState } from "react";
import Table from "./Table";

function ScheduleForm() {
  const [selectedGroup, setSelectedGroup] = useState("");
  
  const [groups, setGroups] = useState([]);
    
  const [newGroupInput, setNewGroupInput] = useState("");
  const [editedSchedule, setEditedSchedule] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [isNewGroupAdded, setIsNewGroupAdded] = useState(false);
  const [newlyAddedGroup, setNewlyAddedGroup] = useState("");
  const [showAddScheduleButton, setShowAddScheduleButton] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);


  const [scheduleData, setScheduleData] = useState({});

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
      setNewlyAddedGroup(newGroupInput); 
      setShowAddScheduleButton(true); 
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

  const handleAddScheduleClick = () => {
    const newScheduleData = { ...scheduleData };
    setIsNewGroupAdded(false);
    setIsTableVisible(true); 
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
  };

  const data =
  selectedGroup && selectedWeek
    ? scheduleData[selectedGroup]?.[selectedWeek] || []
    : [];

    const tableProps = {
      columns: columns,
      data: data,
      isEditing: isEditing,
      editedSchedule: editedSchedule,
      setEditedSchedule: {setEditedSchedule}
    };

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
        
      <select onChange={handleWeekChange} value={selectedWeek}>
        <option value="Первая неделя">Первая неделя</option>
        <option value="Вторая неделя">Вторая неделя</option>
        </select> 

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

      {showAddScheduleButton && selectedGroup === newlyAddedGroup && (
            <div className="add-schedule">
              <button className="editSch" onClick={handleAddScheduleClick}>
                Добавить расписание
              </button>
              <div className="chooseDate">
                <h3 className="semestr">Выберите дату начала семестра:</h3>
                <label className="date">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </label>
            </div>
          </div>
        )}

    {isTableVisible && (
      <div className="table">
        <Table {...tableProps} />

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

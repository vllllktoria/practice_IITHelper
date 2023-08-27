import React, { useState, useEffect} from "react";
import Table from "./Table";
import axios from 'axios';

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
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [scheduleWarning, setScheduleWarning] = useState("")
  const [groupWarning, setGroupWarning] = useState("")
  const [active, setActive] = useState(false);
  const [isScheduleAdded, setIsScheduleAdded] = useState(false);



  const [scheduleData, setScheduleData] = useState({
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
  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://45.9.42.26:22000/api/group");
        setGroups(response.data);
        console.log("Группы получены")
      } catch (error) {
        console.error("Ошибка при получении групп:", error);
      }
    };

    fetchGroups();
  }, []);

  const addGroup = async () => {
    if (newGroupInput && !groups.some(group => group.title === newGroupInput)) {
      try {
        const response = await axios.post('http://45.9.42.26:22000/api/group', { title: newGroupInput });
        const newGroup = { id: response.data.id, title: response.data.title };
        setGroups([...groups, newGroup]);
        setNewlyAddedGroup(newGroupInput);
        setIsNewGroupAdded(true);
        setNewGroupInput("");
        console.log("Группа добавлена");
        console.log(response.data.id, response.data.title)
      } catch (error) {
        console.error('Ошибка при добавлении группы:', error);
      }
    }
  };

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

  /* const handleAddButtonClick = () => {
    if (newGroupInput && !groups.includes(newGroupInput)) {
      addGroup(newGroupInput);
      setGroups([...groups, newGroupInput]);
      setNewGroupInput("");
      setNewlyAddedGroup(newGroupInput); 
      setIsNewGroupAdded(true);
    }
  }; */

  const handleEditClick = () => {
    if (selectedGroup) {
      setIsEditing(true)}
    else {
      setGroupWarning("Выберите группу")
    }
    setActive(false);
  };

  const handleSaveChangesClick = () => {
    const newScheduleData = { ...scheduleData };
  
    if (editedSchedule[selectedGroup]) {
      newScheduleData[selectedGroup] = editedSchedule[selectedGroup];
    }
  
    setScheduleData(newScheduleData);
    setEditedSchedule({});
    setIsEditing(false);
    setActive(!active);
  };

  const handleAddScheduleClick = () => {
    if (selectedDate) {
      setIsNewGroupAdded(false);
      setIsTableVisible(true);
      setScheduleWarning("");
      setIsScheduleAdded(true);
    } else {
      setScheduleWarning("Дата не выбрана");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
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
            <option key="id" value="">
              Выберите группу
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.title}
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
            onClick={addGroup}
          />
        </p>

        {isEditing ? (
          <div>
            <button 
            onClick={handleSaveChangesClick}
            className={active ? "editSch" : "save-btn"} >
              Сохранить изменения
            </button>
          </div>
        ) : (
          <button className="editSch" onClick={handleEditClick}>
            Изменить расписание
          </button>
        )}
      </div>

      {selectedGroup && (
        <div className="table">
          {isNewGroupAdded && selectedGroup === newlyAddedGroup ? (
            <div className="add-schedule">
              <button className="editSch" onClick={handleAddScheduleClick}>
                Добавить расписание
              </button>
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
                <p className="warning">{scheduleWarning}</p>
              </div>
            </div>
          ) : (
            <>
              {data.length === 0 && (
                <div className="add-schedule">
                  <button className="editSch" onClick={handleAddScheduleClick}>
                    Добавить расписание
                  </button>
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
                    <p className="warning">{scheduleWarning}</p>
                  </div>
                </div>
              )}

              <Table 
                columns={columns} 
                data={data} 
                isEditing={isEditing} 
                editedSchedule={editedSchedule[selectedGroup]}
                setEditedSchedule={setEditedSchedule} 
              />
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ScheduleForm;

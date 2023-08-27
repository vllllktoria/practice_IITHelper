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
  const [groupWarning, setGroupWarning] = useState("")
  const [active, setActive] = useState(false);
  const [groupStates, setGroupStates] = useState({});

    useEffect(() => {
      const initialGroupStates = {};
      groups.forEach(group => {
        initialGroupStates[group.id] = {
          showTable: false,
          selectedDate: "",
          scheduleWarning: "",
          isEditing: false,
          editedSchedule: {},
          selectedWeek: {},
          scheduleData: {},
        };
      });
      setGroupStates(initialGroupStates);
    }, [groups]);

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
        setGroups(prevGroups => [...prevGroups, newGroup]);
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

  const addSchedule = async (groupName) => {
    try {
      const response = await axios.post("http://45.9.42.26:22002/api/schedule", {
        groupName: groupName
      });
      console.log("Расписание добавлено:", response.data);
    } catch (error) {
      console.error("Ошибка при добавлении расписания:", error);
    }
  };

  const handleAddScheduleClick = async () => {
    if (selectedGroup && selectedDate && selectedWeek) {
      addSchedule(selectedGroup);
    } else {
      console.error("Необходимо заполнить все поля");
    }
  };

  const handleDateChange = (event, groupId) => {
    const newGroupStates = { ...groupStates };
    newGroupStates[groupId].selectedDate = event.target.value;
    setGroupStates(newGroupStates);
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

        <select onChange={(event) => setSelectedWeek(event.target.value)} value={selectedWeek}>
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
            Редактировать расписание
          </button>
        )}
      </div>

      {selectedGroup && groupStates[selectedGroup]?.showTable ? (
      <>
        <Table
          columns={columns}
          data={data}
          isEditing={isEditing}
          editedSchedule={editedSchedule}
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
    ) : (
      selectedGroup && (
        <div className="add-schedule">
          <div className="add-pair">
            <button className="editSch" onClick={handleAddPairClick}>
              Добавить пару
            </button>
            <button className="editSch" onClick={handleCancelAddPairClick}>
              Удалить
            </button>
          </div>

          <Table
          columns={columns}
          data={data}
          isEditing={true}
          editedSchedule={editedSchedule}
          setEditedSchedule={setEditedSchedule}
        />

        <div className="add-params">
          <button className="editSch" onClick={() => handleAddScheduleClick(selectedGroup)}>
            Добавить расписание
          </button>
          
          <div className="chooseDate">
            <h3 className="semestr">Выберите дату начала семестра:</h3>
            <label className="date">
              <input
                className={groupStates[selectedGroup]?.selectedDate !== undefined ? '' : 'error'}
                type="date"
                value={groupStates[selectedGroup]?.selectedDate || ''}
                onChange={event => handleDateChange(event, selectedGroup)}
              />
            </label>
            <p className="warning">{groupStates[selectedGroup]?.scheduleWarning}</p>
            </div>
          </div>
        </div>
      )
    )}
    </div>
  )}

export default ScheduleForm;

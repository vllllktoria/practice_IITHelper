import React, { useState, useEffect} from "react";
import Table from "./Table";
import axios from 'axios';
import { WeekChange } from "./WeekChange";
import { GroupChange } from "./GroupChange";
import { DateChange } from "./DateChange";
import { AddGroup } from "./AddGroup";
import { AddDeletePair } from "./AddDeletePair";
import { SaveChanges } from "./SaveChanges";
import { EditSchedule } from "./EditSchedule";

function ScheduleForm() {
  
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [newGroupInput, setNewGroupInput] = useState("");
  const [editedSchedule, setEditedSchedule] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isNewGroupAdded, setIsNewGroupAdded] = useState(false);
  const [newlyAddedGroup, setNewlyAddedGroup] = useState("");
  const [groupWarning, setGroupWarning] = useState("")
  const [active, setActive] = useState(false);
  const [groupStates, setGroupStates] = useState({});
  const [scheduleWarning, setScheduleWarning] = useState("")
  const [selectedWeek, setSelectedWeek] = useState({});
  
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

  const [scheduleData, setScheduleData] = useState([]);

  const columns = [
    {
      Header: 'Понедельник',
      accessor: 'MONDAY'
    },
    {
      Header: 'Вторник',
      accessor: 'TUESDAY'
    },
    {
      Header: 'Среда',
      accessor: 'WEDNESDAY'
    },
    {
      Header: 'Четверг',
      accessor: 'THURSDAY'
    },
    {
      Header: 'Пятница',
      accessor: 'FRIDAY'
    },
    {
      Header: 'Суббота',
      accessor: 'SATURDAY'
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


  const handleAddScheduleClick = (group, scheduleData) => {
    console.log("Группа:", group);
    console.log("Расписание:", scheduleData);
  };


  const data =
  selectedGroup && selectedWeek
    ? scheduleData[selectedGroup]?.[selectedWeek] || []
    : [];

  return (
    <div className="schedule-form">
      <div className="params">
        <GroupChange selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} 
            groups={groups} setIsEditing={setIsEditing}/> 

        <WeekChange selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} 
            setIsEditing={setIsEditing}/>
        
        <AddGroup newGroupInput={newGroupInput} setGroups={setGroups} 
            setNewlyAddedGroup={setNewlyAddedGroup} setIsNewGroupAdded={setIsNewGroupAdded} 
            setNewGroupInput={setNewGroupInput}/>

        {isEditing ? (
          <div>
            <SaveChanges scheduleData={scheduleData} setScheduleData={setScheduleData} selectedGroup={selectedGroup}
                  editedSchedule={editedSchedule} setEditedSchedule={setEditedSchedule} setIsEditing={setIsEditing} 
                  setActive={setActive} active={active}/>
          </div>
        ) : (
            <EditSchedule selectedGroup={selectedGroup} setIsEditing={setIsEditing}
                  setGroupWarning={setGroupWarning} setActive={setActive}/>
        )}
      </div>

      {selectedGroup && groupStates[selectedGroup]?.showTable ? (
      <>
        <Table
          columns={columns}
          data={data}
          selectedGroup={selectedGroup}
          isEditing={isEditing}
          editedSchedule={editedSchedule}
          setEditedSchedule={setEditedSchedule}
          onSave={handleAddScheduleClick}
        />
        {isEditing && (
          <AddDeletePair scheduleData={scheduleData} setScheduleData={setScheduleData}
                          selectedGroup={selectedGroup} selectedWeek={selectedWeek}/>
        )}
      </>
    ) : (
      selectedGroup && (
        <div className="add-schedule">
          <AddDeletePair scheduleData={scheduleData} setScheduleData={setScheduleData}
            selectedGroup={selectedGroup} selectedWeek={selectedWeek}/>

          <Table
          columns={columns}
          data={data}
          selectedGroup={selectedGroup}
          isEditing={true}
          editedSchedule={editedSchedule}
          setEditedSchedule={setEditedSchedule}
          onSave={(group, newData) => handleAddScheduleClick(group, newData)}
        />

        <div className="add-params">
          <button className="editSch" onClick={() => handleAddScheduleClick(selectedGroup, scheduleData)}>
            Добавить расписание
          </button>

            <DateChange groupStates={groupStates} setGroupStates={setGroupStates}
              selectedDate={selectedDate} selectedGroup={selectedGroup}
              scheduleWarning={scheduleWarning}/>
          </div>
        </div>
      )
    )}
    </div>
  )}

export default ScheduleForm;

  import React, { useState, useEffect, useContext} from "react";
  import Table from "./Table";
  import axios from 'axios';
  import { WeekChange } from "./WeekChange";
  import { GroupChange } from "./GroupChange";
  import { DateChange } from "./DateChange";
  import { AddGroup } from "./AddGroup";
  import { AddDeletePair } from "./AddDeletePair";
  import { SaveChanges } from "./SaveChanges";
  import { EditSchedule } from "./EditSchedule";
  import { ScheduleContext } from "../context/schedule";


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
    const [selectedWeek, setSelectedWeek] = useState("Первая неделя");

    const [scheduleTest, setScheduleTest] = useState([])

    const schedule = useContext(ScheduleContext)
    
      useEffect(() => {
        const initialGroupStates = {};
        groups.forEach(group => {
          console.log(group.id)
          initialGroupStates[group.title] = {
            showTable: false,
            selectedDate: selectedDate,
            scheduleWarning: scheduleWarning,
            isEditing: false,
            editedSchedule: {...editedSchedule},
            selectedWeek: selectedWeek,
            scheduleData: [
              {
                subject:"abc",
                teacher:"def",
                auditorium:"jhi",
                timeStart:"12:00",
                timeEnd:"12:01"
              },
              {
                subject:"abc",
                teacher:"def",
                auditorium:"jhi",
                timeStart:"12:00",
                timeEnd:"12:01"
              },
              {
                subject:"abc",
                teacher:"def",
                auditorium:"jhi",
                timeStart:"12:00",
                timeEnd:"12:01"
              },
              {
                subject:"abc",
                teacher:"def",
                auditorium:"jhi",
                timeStart:"12:00",
                timeEnd:"12:01"
              },
              {
                subject:"abc",
                teacher:"def",
                auditorium:"jhi",
                timeStart:"12:00",
                timeEnd:"12:01"
              },
              {
                subject:"abc",
                teacher:"def",
                auditorium:"jhi",
                timeStart:"12:00",
                timeEnd:"12:01"
              }
            ]
          };
        });
        setGroupStates(initialGroupStates);
      }, [groups, selectedDate, scheduleWarning, selectedWeek]);

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


    /* useEffect(() => {
      const fetchScheduleForSelectedGroup = async (groupId) => {
        if (selectedGroup) { 
          try {
            const response = await axios.get(`http://45.9.42.26:22002/api/schedule/${groupId}`);
            const scheduleDataForGroup = response.data;
    
            console.log(scheduleDataForGroup); 
    
            const updatedScheduleData = { ...scheduleData };
            updatedScheduleData[selectedGroup] = scheduleDataForGroup;
            setScheduleData(updatedScheduleData);
    
            console.log(`Расписание получено`);
          } catch (error) {
            console.error(`Ошибка при получении расписания`, error);
          }
        }
      };
    
      fetchScheduleForSelectedGroup(selectedGroup);
    }, [selectedGroup]); */
    


    const handleAddScheduleClick = (groupId) => {
      
      if (groupStates[groupId].selectedDate) {
        const newGroupStates = { ...groupStates };
        newGroupStates[groupId].showTable = true;
        newGroupStates[groupId].scheduleWarning = "";
        setGroupStates(newGroupStates);
        console.log(newGroupStates)
        
      } else {
        const newGroupStates = { ...groupStates };
        newGroupStates[groupId].scheduleWarning = "Дата не выбрана";
        setGroupStates(newGroupStates);
        console.log(groupStates)
      }
      console.log(scheduleData)
      setScheduleData([...scheduleTest, schedule])
    
  };

    const data =
    selectedGroup && selectedWeek
      ? scheduleData[selectedGroup]?.[selectedWeek] || []
      : [];

    return (
      <div className="schedule-form">
        <div className="params">
          <GroupChange 
            selectedGroup={selectedGroup} 
            setSelectedGroup={setSelectedGroup} 
            groups={groups} 
            setIsEditing={setIsEditing}
          /> 

          <WeekChange 
            selectedWeek={selectedWeek} 
            setSelectedWeek={setSelectedWeek} 
            setIsEditing={setIsEditing}
          />
          
          <AddGroup 
            newGroupInput={newGroupInput} 
            setGroups={setGroups} 
            setNewlyAddedGroup={setNewlyAddedGroup} 
            setIsNewGroupAdded={setIsNewGroupAdded} 
            setNewGroupInput={setNewGroupInput}
          />

          {isEditing ? (
            <div>
              <SaveChanges 
                scheduleData={scheduleData} 
                setScheduleData={setScheduleData} 
                selectedGroup={selectedGroup}
                editedSchedule={editedSchedule} 
                setEditedSchedule={setEditedSchedule} 
                setIsEditing={setIsEditing} 
                setActive={setActive} 
                active={active}
              />
            </div>
          ) : (
              <EditSchedule 
                selectedGroup={selectedGroup} 
                setIsEditing={setIsEditing}
                setGroupWarning={setGroupWarning} 
                setActive={setActive}
              />
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
          />
          {isEditing && (
            <AddDeletePair 
              scheduleData={scheduleData} 
              setScheduleData={setScheduleData}
              selectedGroup={selectedGroup} 
              selectedWeek={selectedWeek}
            />
          )}
        </>
      ) : (
        selectedGroup && (
          <div className="add-schedule">
            <AddDeletePair 
            scheduleData={scheduleData} 
            setScheduleData={setScheduleData}
            selectedGroup={selectedGroup} 
            selectedWeek={selectedWeek}
            />

            <Table
            columns={columns}
            data={data}
            selectedGroup={selectedGroup}
            isEditing={true}
            editedSchedule={editedSchedule}
            setEditedSchedule={setEditedSchedule}
          />

          <div className="add-params">
            <button className="editSch" onClick={() => handleAddScheduleClick(selectedGroup)}>
              Добавить расписание
            </button>

              <DateChange 
                groupStates={groupStates} 
                setGroupStates={setGroupStates}
                selectedDate={selectedDate} 
                selectedGroup={selectedGroup}
                scheduleWarning={scheduleWarning} 
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>
        )
      )}
      </div>
    )}

  export default ScheduleForm;

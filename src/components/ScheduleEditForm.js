import React, {useState} from "react";

export function ScheduleEditForm({cell}) {

    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');
    const [auditorium, setAuditorium] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const handleSubmit = function() {
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Предмет"
                type="text"
                name={cell.column.id}
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
            />
            <input
                placeholder="Преподаватель"
                type="text"
                name={cell.column.id}
                value={teacher}
                onChange={(e) => {setTeacher(e.target.value)}}
            />
            <input
                placeholder="Аудитория"
                type="text"
                name={cell.column.id}
                value={auditorium}
                onChange={(e) => {setAuditorium(e.target.value)}}
            />
            <input
                placeholder="Время начала"
                type="time"
                name={cell.column.id}
                value={timeStart}
                onChange={(e) => {setTimeStart(e.target.value)}}
            />
            <input
                placeholder="Время окончания"
                type="time"
                name={cell.column.id}
                value={timeEnd}
                onChange={(e) => {setTimeEnd(e.target.value)}}
            />
            </form>
    );
}
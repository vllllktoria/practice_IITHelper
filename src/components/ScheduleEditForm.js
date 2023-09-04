import React, { useState } from "react";

export function ScheduleEditForm({ onSave }) {
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [auditorium, setAuditorium] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const handleSubjectChange = function (e) {
    setSubject(e.target.value);
  };

  const handleTeacherChange = function (e) {
    setTeacher(e.target.value);
  };

  const handleAuditoriumChange = function (e) {
    setAuditorium(e.target.value);
  };

  const handleTimeStartChange = function (e) {
    setTimeStart(e.target.value);
  };

  const handleTimeEndChange = function (e) {
    setTimeEnd(e.target.value);
  };

  const handleSubmit = function () {
    const newData = {
      subject,
      teacher,
      auditorium,
      timeStart,
      timeEnd,
    };

    onSave(newData);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Предмет"
          type="text"
          value={subject}
          onChange={handleSubjectChange}
        />
        <input
          placeholder="Преподаватель"
          type="text"
          value={teacher}
          onChange={handleTeacherChange}
        />
        <input
          placeholder="Аудитория"
          type="text"
          value={auditorium}
          onChange={handleAuditoriumChange}
        />
        <input
          placeholder="Время начала"
          type="time"
          value={timeStart}
          onChange={handleTimeStartChange}
        />
        <input
          placeholder="Время окончания"
          type="time"
          value={timeEnd}
          onChange={handleTimeEndChange}
        />
      </form>
    </div>
  );
}

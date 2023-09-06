import React, { useState, useEffect } from "react";
import axios from "axios";

function SendForm() {
  const [showList, setShowList] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRepeat, setSelectedRepeat] = useState(false);
  const [sendNow, setSendNow] = useState(true);
  const [laterSelected, setLaterSelected] = useState(false);
  const [title, setTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [sentEvent, setSentEvent] = useState(null);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [searchStudentInput, setSearchStudentInput] = useState(""); 
  const [searchGroupInput, setSearchGroupInput] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]); 

  useEffect(() => {
    const apiUrl = "http://45.9.42.26:22000/api/student";
    axios.get(apiUrl, {
      crossOrigin: true,
    }).then((resp) => {
      const student = resp.data;
      const sortedStudents = student.sort((a, b) => {
        return a.surname.localeCompare(b.surname);
      });
      const studentsWithSelection = sortedStudents.map((student) => ({
        ...student,
        isSelected: false,
      }));
      setStudents(studentsWithSelection);
    });
  }, []);

  useEffect(() => {
    const apiUrl = "http://45.9.42.26:22000/api/group";
    axios.get(apiUrl, {
      crossOrigin: true,
    }).then((resp) => {
      const group = resp.data;
      const sortedGroups = group.sort((a, b) => {
        const groupA = a.title.toLowerCase();
        const groupB = b.title.toLowerCase();

        const numA = parseInt(groupA.match(/\d+/)?.[0] || "0");
        const numB = parseInt(groupB.match(/\d+/)?.[0] || "0");

        return numA - numB;
      });

      setGroups(sortedGroups);
    });
  }, []);

  const handleCheckboxChange = () => {
    setShowList(!showList);
  };

  const handleStudentCheckboxChange = () => {
    setShowStudentList(!showStudentList);
    setSelectedStudents([]);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleRepeatChange = (event) => {
    setSelectedRepeat(event.target.checked);
  };

  const handleSendModeChange = (event) => {
    const selectedValue = event.target.value === "later";
    setSendNow(!selectedValue);
    setLaterSelected(selectedValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setHasFeedback(event.target.checked);
  };

  const handleSearchStudentInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchStudentInput(input);
    const updatedStudents = students.map((student) => ({
      ...student,
      isSelected: student.surname.toLowerCase().includes(input) && selectedStudents.includes(student.id),
    }));
    setStudents(updatedStudents);
  };

  const handleSearchGroupInputChange = (event) => {
    setSearchGroupInput(event.target.value);
  };

  const resetForm = () => {
    setShowList(false);
    setShowStudentList(false);
    setTextInput("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedRepeat(false);
    setSendNow(true);
    setLaterSelected(false);
    setTitle("");
    setSearchStudentInput("");
    setSearchGroupInput("");
    setSentEvent(null);
    setHasFeedback(false);
    setSelectedStudents([]);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStudentSelect = (selectedStudent) => {
    const updatedSelectedStudents = selectedStudent.isSelected
      ? selectedStudents.filter((studentId) => studentId !== selectedStudent.id)
      : [...selectedStudents, selectedStudent.id];
    setSelectedStudents(updatedSelectedStudents);

    const updatedStudents = students.map((student) => {
      return student.id === selectedStudent.id
        ? { ...student, isSelected: !student.isSelected }
        : student;
    });
    setStudents(updatedStudents);
  };

  const handleSubmit = () => {
    const eventDate = sendNow ? new Date() : new Date(selectedDate + " " + selectedTime);

    const eventData = {
      title: title,
      text: textInput,
      hasFeedback: hasFeedback ? true : false,
      eventTime: formatDate(eventDate) + " " + formatTime(eventDate),
      isGroupEvent: showList,
      isStudentEvent: showStudentList,
      groups: showList ? [groups[0].id] : [],
      students: showStudentList ? selectedStudents : [],
      type: sendNow ? "INFO" : "EVENT",
      isRepeat: selectedRepeat,
      repeatTime: selectedRepeat ? [formatDate(new Date()) + " " + formatTime(new Date())] : [],
    };

    const jsonData = JSON.stringify(eventData);

    console.log(jsonData);

    axios
      .post("http://45.9.42.26:22001/api/event", jsonData, {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        console.log("Данные добавлены", response.data);
      })
      .catch(error => {
        console.error("Произошла ошибка", error);
      });
    if (sendNow) {
      setSentEvent({ ...eventData, sendNow: true });
    } else {
      setSentEvent({ ...eventData, sendNow: false });
    }

    resetForm();
  };

  return (
    <div className="container">
      <div className="main-wrapper">
        <div className="send-form-container">
          <div className="textarea-container">
            <label>
              <input
                placeholder="Название"
                type="text"
                className="title"
                value={title}
                onChange={handleTitleChange}
              />
            </label>

            <textarea
              placeholder="Enter text..."
              type="text"
              className="inputText"
              value={textInput}
              onChange={handleTextChange}
            ></textarea>

            <h3 className="recipient">Выбрать получателя:</h3>

            <div className="checkboxes-wrapper">
              <label id="group">
                <div className="input-wrapper">
                  <input
                    type="checkbox"
                    className="chooseRecipient"
                    onChange={handleCheckboxChange}
                  />
                  <p>Группа</p>
                </div>
                {showList && (
                  <div className="checkbox-list">
                  <input
                    placeholder="Введите группу"
                    type="text"
                    className="searchInput"
                    value={searchGroupInput}
                    onChange={handleSearchGroupInputChange}
                  />
                    {groups
                      .filter((group) =>
                        group.title.toLowerCase().includes(searchGroupInput.toLowerCase())
                      )
                      .map((group) => (
                        <label key={group.id}>
                          <input type="checkbox" />
                          {group.title}
                      </label>
                    ))}
                  </div>
                )}
              </label>

              <label id="student">
                <div className="input-wrapper">
                  <input
                    id="chooseStudent"
                    type="checkbox"
                    className="chooseRecipient"
                    onChange={handleStudentCheckboxChange}
                  />
                  <p>Студент</p>
                </div>
                {showStudentList && (
                  <div className="checkbox-list">
                    <input
                      placeholder="Введите фамилию"
                      type="text"
                      className="searchInput"
                      value={searchStudentInput}
                      onChange={handleSearchStudentInputChange}
                    />
                    {students
                      .filter((student) =>
                        student.surname.toLowerCase().includes(searchStudentInput.toLowerCase())
                      )
                      .map((student) => (
                        <label key={student.id}>
                          <input
                            type="checkbox"
                            checked={student.isSelected} 
                            onChange={() => handleStudentSelect(student)} 
                          />
                          {student.surname} {student.name} {student.patronymic}
                        </label>
                      ))}
                  </div>
                )}
              </label>
              <label>
                <div className="input-wrapper">
                  <input
                    type="checkbox"
                    checked={hasFeedback}
                    onChange={handleFeedbackChange}
                  />
                  <p>Обратная связь</p>
                </div>
              </label>

              <div className="sendBtn-wrapper">
                <button id="sendBtn" onClick={handleSubmit}>
                  Отправить
                </button>
              </div>
            </div>
          </div>

          <div className="button-container">
            <label>
              <input
                type="radio"
                value="now"
                checked={sendNow}
                onChange={handleSendModeChange}
              />
              Сейчас
            </label>
            <label className="sendTime">
              <input
                type="radio"
                value="later"
                checked={laterSelected}
                onChange={handleSendModeChange}
              />
              Позже
            </label>
            {!sendNow && laterSelected && (
              <div>
                <label className="options">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </label>

                <label className="options">
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                  />
                </label>
                <label className="options">
                  <input
                    type="checkbox"
                    checked={selectedRepeat}
                    onChange={handleRepeatChange}
                  />
                  Повторять уведомление
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendForm;

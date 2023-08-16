import React, { useState, useEffect } from "react";
import axios from "axios";
import SentEvent from "./SentEvent";

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

  useEffect(() => {
    const apiUrl = "http://45.9.42.26:22000/api/student";
    axios.get(apiUrl, {
      crossOrigin: true,
    }).then((resp) => {
      const student = resp.data;
      setStudents(student);
    });
  }, []);

  useEffect(() => {
    const apiUrl = "http://45.9.42.26:22000/api/group";
    axios.get(apiUrl, {
      crossOrigin: true,
    }).then((resp) => {
      const group = resp.data;
      setGroups(group);
    });
  }, []);

  /* const resetForm = () => {
    setShowList(false);
    setShowStudentList(false);
    setTextInput("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedRepeat(false);
    setSendNow(true);
    setLaterSelected(false);
    setTitle("");
    setHasFeedback(false);
  }; */

  const handleCheckboxChange = () => {
    setShowList(!showList);
  };

  const handleStudentCheckboxChange = () => {
    setShowStudentList(!showStudentList);
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

  const handleSubmit = () => {
    const eventDate = sendNow ? new Date() : new Date(selectedDate + " " + selectedTime);

    /* const options = { timeZone: "Asia/Yekaterinburg" };
    const formattedEventDate = eventDate.toLocaleString("en-US", options); */
  
    const eventData = {
      title: title,
      text: textInput,
      hasFeedback: hasFeedback ? true : false,
      eventTime: formatDate(eventDate) + " " + formatTime(eventDate),
      isGroupEvent: showList,
      isStudentEvent: showStudentList,
      groups: showList ? [groups[0].id] : [],
      students: showStudentList ? students.map((student) => student.id) : [],
      type: sendNow ? "INFO" : "EVENT",
      isRepeat: selectedRepeat,
      repeatTime: selectedRepeat ? [formatDate(new Date()) + " " + formatTime(new Date())] : [],
    };
  
    const jsonData = JSON.stringify(eventData);

    console.log(jsonData)

    axios
      .post("http://45.9.42.26:22001/api/event", jsonData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        console.log("Данные добавлены", response.data);
       /*  resetForm() */
      })
      .catch(error => {
        console.error("Произошла ошибка", error);
      });
    if (sendNow) {
      setSentEvent({ ...eventData, sendNow: true });
    } else {
      setSentEvent({ ...eventData, sendNow: false });
    }
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
                    {groups.map((group) => (
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
                    {students.map((student) => (
                      <label key={student.id}>
                        <input type="checkbox" />
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

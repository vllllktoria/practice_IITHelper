import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function SendForm() {
  const [showList, setShowList] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [textInput, setTextInput] = useState();
  //const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedRepeat, setSelectedRepeat] = useState();
  const [sendNow, setSendNow] = useState(true);
  const [laterSelected, setLaterSelected] = useState(false);
  const [title, setTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [sentEvent, setSentEvent] = useState(null); 
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toLocaleDateString();
    const currentTime = currentDateTime.toLocaleTimeString();
    return {
      date: currentDate,
      time: currentTime
    };
  }

    const [currentSendDateTime, setCurrentSendDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
      const apiUrl = 'http://45.9.42.26:22000/api/student';
      axios.get(apiUrl).then((resp) => {
          const student = resp.data;
          setStudents(student);
      });
  }, [setStudents]);

  useEffect(() => {
    const apiUrl = 'http://45.9.42.26:22000/api/group';
    axios.get(apiUrl).then((resp) => {
        const group = resp.data;
        setGroups(group);
    });
}, [setGroups]);

  const handleCheckboxChange = () => {
    setShowList(!showList);
  };

  const handleStudentCheckboxChange = () => {
    setShowStudentList(!showStudentList);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

/*   const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  }; */

/*   const handleImageRemove = () => {
    setSelectedImage(null);
  };
 */
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleRepeatChange = (event) => {
    setSelectedRepeat(event.target.value);
  };

  const handleSendModeChange = (event) => {
    const selectedValue = event.target.value === "later";
    setSendNow(!selectedValue);
    setLaterSelected(selectedValue);
    if (!selectedValue) {
      setCurrentSendDateTime(getCurrentDateTime());
    }
  };

  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleSubmit = () => {
    if (sendNow) {
      const data = {
        title: title,
        text: textInput,
        sendNow: sendNow
      };
      console.log(JSON.stringify(data));
      setSentEvent(data);
    } else {
      const data = {
        title: title,
        text: textInput,
        date: selectedDate,
        time: selectedTime,
        repeat: selectedRepeat
      };
      console.log(JSON.stringify(data));
      setSentEvent(data);
    }
  };

  const handleViewFeedback = () => {
    const receivedFeedbackData = [
      { rating: 3, comment: "ок" },
      { rating: 4, comment: "норм" },
      { rating: 5, comment: "прекрасно" }
    ];
    setFeedbackData(receivedFeedbackData);
    setShowFeedbackForm(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedbackForm(false);
    setFeedbackData(null);
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
                      <label>
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
                        {student.surname}
                        {student.name}
                        {student.patronymic}
                      </label>
                    ))}
                  </div>
                )}
              </label>
              
          <div className="sendBtn-wrapper">
            <button id="sendBtn" onClick={handleSubmit}>Отправить</button>
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
      <div>
        <h3 id="sentEvent">Отправленные события:</h3>
        {sentEvent && ( <div className="sent-event">
          <div className="sent-event-content">
            <p className="event-title">{sentEvent.title}</p>
            <span className="event-datetime" id="date">
            {sendNow ? currentSendDateTime.date : sentEvent.date} 
            </span>
            <span className="event-datetime" id="time">
            {sendNow ? currentSendDateTime.time : sentEvent.time}
            </span>
          </div>
          <button className="feedback-btn"onClick={handleViewFeedback}>Обратная связь</button>
          {showFeedbackForm && feedbackData && (
          <div className="feedback-form">
          {feedbackData.map((feedback, index) => (
            <div key={index}>
              <p>Оценка: {feedback.rating}</p>
              <p>Комментарий: {feedback.comment}</p>
            </div>
          ))}
          <button className="feedback-btn" onClick={handleFeedbackClose}>
            Закрыть
          </button>
        </div>
        )}
        </div>
        )}
        </div>
        
    </div>
        
    </div>
  );
}

export default SendForm;

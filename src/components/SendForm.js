import React from "react";
import { useState } from "react";

function SendForm() {
  const [showList, setShowList] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRepeat, setSelectedRepeat] = useState("");
  const [sendNow, setSendNow] = useState(true);
  const [laterSelected, setLaterSelected] = useState(false);
  const [title, setTitle] = useState("");

  const handleCheckboxChange = () => {
    setShowList(!showList);
  };

  const handleStudentCheckboxChange = () => {
    setShowStudentList(!showStudentList);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

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
  };

  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleSubmit = () => {
    if (sendNow) {
      console.log("Отправлено");
      console.log("Текст:", textInput);
    } else {
      console.log("Отправлено");
      console.log("Текст:", textInput);
      console.log("Дата:", selectedDate);
      console.log("Время:", selectedTime);
      console.log("Повторение:", selectedRepeat);
    }
  };

  return (
    <div className="container">
      <div className="main-wrapper">
        <h1>Создание события</h1>
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
              <label>
                <input type="checkbox" id="chooseGroup" />
                ПрИ-101
              </label>
              <label>
                <input type="checkbox" />
                ПрИ-102
              </label>
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
            <p>
              Студент
            </p>
            </div>
          

          {showStudentList && (
            <div className="checkbox-list">
              <label>
                <input type="checkbox" />
                ПрИ-101
              </label>
              <label>
                <input type="checkbox" />
                ПрИ-102
              </label>
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
        </div>

        {!sendNow && laterSelected && (
          <div>
            <label className="options">
              Дата:
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </label>

            <label className="options">
              Время:
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default SendForm;

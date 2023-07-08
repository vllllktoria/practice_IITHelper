import React, { useState, useEffect } from "react";
import axios from "axios";

function SentEvent() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = 'http://45.9.42.26:22001/api/event';
        const response = await axios.get(apiUrl);
        const events = response.data;
        setEvents(events);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchEvents();
  }, []);

  const handleViewFeedback = () => {
    const receivedFeedbackData = [];
    setFeedbackData(receivedFeedbackData);
    setShowFeedbackForm(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedbackForm(false);
    setFeedbackData([]);
  };

  return (
    <div>
      <h1>Отправленные события:</h1>
      {events.map((event) => (
        <div className="sent-event" key={event.id}>
          <div className="sent-event-content">
            <p className="event-title">{event.title}</p>
            <span className="event-datetime" id="date">
              {event.eventTime}
            </span>
          </div>
          <button className="feedback-btn" onClick={handleViewFeedback}>
            Обратная связь
          </button>
          {showFeedbackForm && feedbackData.length > 0 && (
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
      ))}
    </div>
  );
}

export default SentEvent;

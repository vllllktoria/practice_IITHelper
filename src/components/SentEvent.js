import React, { useState, useEffect } from "react";
import axios from "axios";

function SentEvent() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [gradeData, setGradeData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = "http://45.9.42.26:22001/api/event";
        const response = await axios.get(apiUrl, {
          withCredentials: true
        });
        const events = response.data;
        setEvents(events);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchEvents();
  }, []);

  const handleViewFeedback = async (event) => {
    const eventId = event.id;
    setSelectedEventId(eventId);

    try {
      const gradeUrl = `http://45.9.42.26:22001/api/event/${eventId}/grade`;
      const gradeResponse = await axios.get(gradeUrl, {
        withCredentials: true
      });
      const gradeData = gradeResponse.data;

      const feedbackUrl = `http://45.9.42.26:22001/api/event/${eventId}/feedback`;
      const feedbackResponse = await axios.get(feedbackUrl, {
        withCredentials: true
      });
      const feedbackData = feedbackResponse.data;

      setGradeData(gradeData);
      setFeedbackData(feedbackData);
      setShowFeedbackForm(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFeedbackClose = () => {
    setShowFeedbackForm(false);
    setGradeData([]);
    setFeedbackData([]);
    setSelectedEventId(null);
  };

  return (
    <div>
      <h1>Отправленные уведомления:</h1>
      {events.map((event) => (
        <div className="sent-event" key={event.id}>
          <div className="sent-event-content">
            <p className="event-title">{event.title}</p>
            <span className="event-datetime" id="date">
              {event.eventTime}
            </span>
          </div>
          <button
            className="feedback-btn"
            onClick={() => handleViewFeedback(event)}
            disabled={!event.hasFeedback}
          >
            Обратная связь
          </button>
          {showFeedbackForm && selectedEventId === event.id && (
            <div className="feedback-form">
              {gradeData.length > 0 ? (
                gradeData.map((grade, index) => (
                  <div key={index}>
                    <p>Оценка: {grade}</p>
                  </div>
                ))
              ) : (
                <p>Оценок нет</p>
              )}
              {feedbackData.length > 0 ? (
                feedbackData.map((feedback, index) => (
                  <div key={index}>
                    <p>Комментарий: {feedback}</p>
                  </div>
                ))
              ) : (
                <p>Комментариев нет</p>
              )}
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

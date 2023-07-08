import React, { useState } from "react";

function SentEvent({ sentEvent, currentSendDateTime }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

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
    <div>
      <h1>Отправленные события:</h1>
      {sentEvent && (
        <div className="sent-event">
          <div className="sent-event-content">
            <p className="event-title">{sentEvent.title}</p>
            <span className="event-datetime" id="date">
              {sentEvent.sendNow ? currentSendDateTime.date : sentEvent.date}
            </span>
            <span className="event-datetime" id="time">
              {sentEvent.sendNow ? currentSendDateTime.time : sentEvent.time}
            </span>
          </div>
          <button className="feedback-btn" onClick={handleViewFeedback}>
            Обратная связь
          </button>
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
  );
}

export default SentEvent;

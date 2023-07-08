import React from "react";

function SentEvent({ title, date, time }) {
  return (
    <div className="sent-event">
      <div className="sent-event-content">
        <p className="event-title">{title}</p>
        <span className="event-datetime" id="date">
          {date}
        </span>
        <span className="event-datetime" id="time">
          {time}
        </span>
      </div>
    </div>
  );
}

export default SentEvent;
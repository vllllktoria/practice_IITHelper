import React, { useState } from "react";
import User from "./User.js";

function Users({ users, handleEdit }) {
  const [acceptedUsersData, setAcceptedUsersData] = useState([]);

  const handleSaveAcceptedUser = (userData) => {
    setAcceptedUsersData((prevData) => [userData, ...prevData]);
  };

  if (users.length > 0) {
    const sortedUsers = users.slice().sort((a, b) => b.id - a.id);

    return (
      <div>
        {sortedUsers.map((user) => (
          <User
            key={user.id}
            user={user}
            handleEdit={handleEdit}
            onSaveAcceptedUser={handleSaveAcceptedUser}
            statementId={user.id}
          />
        ))}
        {acceptedUsersData.length > 0 && (
          <div>
            <h3 id="acceptStudents">Студенты</h3>
            {acceptedUsersData.slice().reverse().map((userData) => (
              <p id="userData" key={userData.id}>
                {userData.surname} {userData.name} {userData.patronymic} {userData.group}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="user">
        <h3>Пользователей нет</h3>
      </div>
    );
  }
}

export default Users;

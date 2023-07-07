import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditForm from "./EditForm.js";
import axios from 'axios'

function User({ user, handleEdit, onSaveAcceptedUser }) {
  const [edit, setEdit] = useState(false);
  const [surname, setSurname] = useState(user.surname);
  const [name, setName] = useState(user.name);
  const [group, setGroup] = useState(user.group);
  const [patronymic, setPatronymic] = useState(user.patronymic);
  const [renderUser, updateUser] = useState(user);
  const [isAccepted, setAccepted] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const [acceptedUser, setAcceptedUser] = useState(null);

  const checkHandleClick = () => {

    axios.post("http://45.9.42.26:22000/api/statement", {
      surname: surname,
      name: name,
      group: group,
      patronymic: patronymic
    })
    .then(response => {
      console.log("Запрос отправлен", "id пользователя:", response.data.id)});

    setAccepted(true);
    const acceptedUserData = {
      surname: surname,
      name: name,
      group: group,
      patronymic: patronymic
    };
    setAcceptedUser(acceptedUserData);
    onSaveAcceptedUser(acceptedUserData);
  };

  const rejectHandleClick = () => {
    setRejected(true);
  };

  return (
    <>
      <div className="user">
        {isAccepted && (
          <div>
            <h3>
             {surname} {name} {patronymic} {group}
            </h3>
            <p id="check">Заявка принята</p>
          </div>
        )}

        {isRejected && (
          <div>
            <h3>
              {surname} {name} {patronymic} {group}
            </h3>
            <p id="uncheck">Заявка отклонена</p>
          </div>
        )}

        {!isAccepted && !isRejected && (
          <div>
            <button className="rejectBtn" onClick={rejectHandleClick}>
              Отклонить
            </button>
            <button className="checkBtn" onClick={checkHandleClick}>
              Принять
            </button>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                setEdit(!edit);
              }}
              className="editBtn"
              title="Редактировать"
            />
          </div>
        )}

        {!isAccepted && !isRejected && (
          <h3>
            {surname} {name} {patronymic} {group}
          </h3>
        )}

        {edit && (
          <EditForm
            handleEdit={handleEdit}
            user={renderUser}
            updateUser={updateUser}
            setUserName={setName}
            setUserSurname={setSurname}
            setUserPatronymic={setPatronymic}
            setUserGroup={setGroup}
          />
        )}
      </div>
    </>
  );
}

export default User;

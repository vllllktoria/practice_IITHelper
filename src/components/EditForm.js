import React, { useState } from "react";

function EditForm(props) {

  const [isOpen, setIsOpen] = useState(true);
  const [surname, setSurname] = useState(props.surname);
  const [name, setName] = useState(props.name);
  const [group, setGroup] = useState(props.group);
  const [patronymic, setPatronymic] = useState(props.patronymic);
  
  const [tempSurname, setTempSurname] = useState(props.surname);
  const [tempName, setTempName] = useState(props.name);
  const [tempGroup, setTempGroup] = useState(props.group);
  const [tempPatronymic, setTempPatronymic] = useState(props.patronymic);

  const handleSurname = function (e) {
    setSurname(e.target.value);
  };

  const handleName = function (e) {
    setName(e.target.value);
  };

  const handlePatronymic = function (e) {
    setPatronymic(e.target.value);
  };

  const handleGroup = function (e) {
    setGroup(e.target.value);
  };

  const handleSave = function () {
    const userCopy = {
      ...props.user,
      surname: surname,
      name: name,
      patronymic: patronymic,
      group: group,
    };

    props.setSurname(surname);
    props.setName(name);
    props.setPatronymic(patronymic);
    props.setGroup(group);
    props.handleEdit(userCopy);

    setIsOpen(false); 
  };

  const handleCancel = function () {
    setSurname(tempSurname);
    setName(tempName);
    setPatronymic(tempPatronymic);
    setGroup(tempGroup);

    setIsOpen(false); 
  };

  if (!isOpen) {
    return null; 
  }

  return (
    <form id="editForm">
      <input
        type="text"
        placeholder="Фамилия"
        value={surname}
        onChange={handleSurname}
      />
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={handleName}
      />
      <input
        type="text"
        placeholder="Отчество"
        value={patronymic}
        onChange={handlePatronymic}
      />
      <input
        type="text"
        placeholder="Группа"
        value={group}
        onChange={handleGroup}
      />
      <button type="button" className="Edit" onClick={handleSave}>
        Сохранить
      </button>
      <button type="button" className="Edit" onClick={handleCancel}>
        Отменить
      </button>
    </form>
  );
}

export default EditForm;

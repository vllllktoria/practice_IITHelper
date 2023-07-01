import React, { useReducer, useState } from "react";

function EditForm(props){
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [group, setGroup] = useState(props.group);
    let handleLName = function(e) {
        setLastName(e.target.value);
    }
    let handlefName = function(e) {
        setFirstName(e.target.value);
    }
    let handleGroup = function(e) {
        setGroup(e.target.value);
    }

    let meDoItForYou = function() {
        let userCopy = {...props.user}
        userCopy.firstname = firstName
        userCopy.lastname = lastName
        userCopy.group = group
        props.setLastName(lastName)
        props.setFirstName(firstName)
        props.setGroup(group)
        props.handleEdit(userCopy)
    }
    return(
        <form className="editForm">
            <input placeholder="Фамилия" onChange={handleLName} />
            <input placeholder="Имя" onChange={handlefName}/>
            <input placeholder="Группа" onChange={handleGroup}/>
            <button type="button" className="saveEdit" onClick={meDoItForYou}>Сохранить</button>
        </form>
        
    )
}

export default EditForm
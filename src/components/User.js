import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import EditForm from "./EditForm.js"

function User(props){ 
    const [edit, setEdit] = useState(false);
    const [surname, setSurname] = useState(props.user.surname);
    const [name, setName] = useState(props.user.name);
    const [group, setGroup] = useState(props.user.group);
    const [patronymic, setPatronymic] = useState(props.user.patronymic);


    const [unchecked, setCheck] = useState(false)
    const checkHandleClick = () => {
        setCheck(!unchecked);
      };

    const [notReject, setReject] = useState(false)
    const rejectHandleClick = () => {
        setReject(!notReject)
      };

    

    return( 
        <div className="user">
            <button className="rejectBtn" onClick={rejectHandleClick}>{ notReject ? "Отклонено" : "Отклонить"}</button>
            <button className="checkBtn" onClick={checkHandleClick}>{ unchecked ? "Принято" : "Принять"}</button>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                setEdit(!edit);
            }} className="editBtn"/>
            <h3>{surname} {name} {patronymic} {group}</h3>

            {edit && <EditForm handleEdit={props.handleEdit} user={props.user} setSurname={setSurname} setName={setName} 
            setPatronymic={setPatronymic} setGroup={setGroup}/>}
            
        </div>
    ) 
}

export default User
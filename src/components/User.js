import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import EditForm from "./EditForm.js"

function User(props){ 
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(props.user.firstname);
    const [lastName, setLastName] = useState(props.user.lastname);
    const [group, setGroup] = useState(props.user.group);

    return( 
        <div className="user">
            <FontAwesomeIcon icon={faClose} className="rejectBtn"/>
            <FontAwesomeIcon icon={faCheck} className="checkBtn" />
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                setEdit(!edit);
            }} className="editBtn"/>
            <h3>{lastName} {firstName} {group}</h3>

            {edit && <EditForm handleEdit={props.handleEdit} user={props.user} setFirstName={setFirstName} setLastName={setLastName} setGroup={setGroup}/>}
            
        </div>
    ) 
}

export default User
import React, { useState } from "react"
import User from "./User.js"

function Users(props){

    const [users, setUsers] = useState(props.users);


        if (users.length > 0)
    return(
        <div>
            {users.map((user) => (
                <User key={user.id} user={user} handleEdit={props.handleEdit}/>     
            ))}
        </div>
    )
    else
    return(
        <div className="user">
            <h3>Пользователей нет</h3>
        </div>
    )   
}

export default Users
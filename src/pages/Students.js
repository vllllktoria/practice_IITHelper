import React, { useState } from "react";
import Users from "../components/Users";


function Students() {

    const [users, setUsers] = useState([
        {
            id: 1,
            firstname: "ААА",
            lastname: "ООО",
            group: "ПрИ-301"
        },
        {
            id: 2,
            firstname: "ИИИ",
            lastname: "ЕЕЕ",
            group: "ПрИ-302"
        }
    ]);

    let handleEdit = function(user) {
        let usersCopy = users
        usersCopy[user.id] = user
        console.log(users)
        setUsers(usersCopy)
        // setUsers(users[e.target.value.id].firstname = e.target.value.fi)
    }
            return (
            <div>
                <h1>Заявки</h1>
                <main>
                <Users users={users} handleEdit={handleEdit}/>
                </main> 
            </div>)
    }
    
export default Students
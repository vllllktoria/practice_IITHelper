import React from "react"
import User from "./User.js"

class Users extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            users: [
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
            ]
        }
    }


    render(){
        if (this.state.users.length > 0)
    return(
        <div>
            {this.state.users.map((user) => (
                <User key={user.id} el={user}/> 
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
   
}

export default Users
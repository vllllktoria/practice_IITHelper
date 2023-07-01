import React from "react";
import Users from "../components/Users";


class Students extends React.Component{
    render(){
            return (
            <div>
                <h1>Заявки</h1>
                <main>
                <Users />
                </main> 
            </div>)
            
        }
        
        editUser(el){
            let allUsers = this.state.users
            allUsers[el.id - 1] = el
    
            this.setState({users: []}, () => {
                this.setState({users: [...allUsers]})
            })
        }
    }
    
export default Students
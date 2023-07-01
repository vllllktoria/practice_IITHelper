import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import EditForm from "./EditForm.js"

class User extends React.Component{ 

    el = this.props.el

    constructor(props){
        super(props)
        this.state = {
            editForm: false
        }
    }
    
    editUser(el){
        let allUsers = this.state.users
        allUsers[el.id - 1] = el

        this.setState({users: []}, () => {
            this.setState({users: [...allUsers]})
        })
    }

    render(){
        return( 
            <div className="user">
                <FontAwesomeIcon icon={faClose} className="rejectBtn"/>
                <FontAwesomeIcon icon={faCheck} className="checkBtn" />
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                    this.setState({
                    editForm: !this.state.editForm})
                }}className="editBtn"/>
                <h3>{this.el.lastname} {this.el.firstname} {this.el.group}</h3>

                {this.state.editForm && <EditForm onEdit={this.editForm}/>}
                
            </div>
        )
    }
        
}

export default User
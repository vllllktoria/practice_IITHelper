import React from "react";

class EditForm extends React.Component{
    render(){
        return(
            <form className="editForm">
                <input placeholder="Фамилия" />
                <input placeholder="Имя" />
                <input placeholder="Группа" />
                <button type="button" className="saveEdit">Сохранить</button>
            </form>
            
        )
    }
}

export default EditForm
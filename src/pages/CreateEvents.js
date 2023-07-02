import React from "react"
import AddImage from "../components/AddImage"

function CreateEvents(){
    return (
        <div>
            <h1>Создание события</h1>
            <AddImage />
            <textarea placeholder="Enter text..." type="text" className="inputText"></textarea>
            <h3 className="recipient">Выбрать получателя:</h3>

            <label>
            <input type="checkbox" id="group" className="chooseRecipient" />
            Группа
            </label>

            <label>
            <input type="checkbox" id="student" className="chooseRecipient" />
            Студент
            </label>
        </div>
        )
}
export default CreateEvents
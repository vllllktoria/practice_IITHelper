import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function RequestForm(){
        const checkCLick = () =>{
            console.log("check")
        }
        return (
            <div id = "wrapper">
                <div id="layout">
                <div id="name" className="block">Андрей Андреевич</div>
                <div id="group" className="block">ПрИ-301</div>
                <div id="panel" className="block">
                    <button id="check-btn"><FontAwesomeIcon icon={faCheck} onClick={checkCLick} /></button>
                    <button id="reject-btn"><FontAwesomeIcon icon={faClose}/>  </button>
                    <button id="edit-btn"><FontAwesomeIcon icon={faPenToSquare}/></button>
                </div>
                </div>
            </div>)
    }

export default RequestForm
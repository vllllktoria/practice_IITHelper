import React, { useState, useEffect } from "react";
import Users from "../components/Users";
import axios from 'axios'


function Students() {

    const [users, setUsers] = useState([
        {
            id: 1,
            surname: "ААА",
            name: "ООО",
            patronymic: "УУУ",
            group: "ПрИ-301"
        },
        {
            id: 2,
            surname: "ИИИ",
            name: "ЕЕЕ",
            patronymic: "ЫЫЫ",
            group: "ПрИ-302"
        }
    ]);
/* 
    useEffect(() => {
        const apiUrl = 'http://45.9.42.26:8000/api/students?group=301';
        let params = {
            params: {
                group: "Group"
            }
        };
        axios.get(apiUrl, params).then((resp) => {
          const users = resp.data;
          setUsers(users);
        });
      }, [setUsers]); */

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

                <input type="radio" id="all" name="choose" checked />
                <label htmlFor="all">Все</label>

                <input type="radio" id="checked" name="choose" />
                <label htmlFor="checked">Принятые</label>

                <input type="radio" id="unChecked" name="choose" />
                <label htmlFor="unChecked">Отклоненные</label>

                <main>
                <Users users={users} handleEdit={handleEdit}/>
                </main> 
            </div>)
    }
    
export default Students
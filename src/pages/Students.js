import React, { useState } from "react";
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
    
    const [filter, setFilter] = useState("all");

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };

      const filteredUsers = users.filter((user) => {
        if (filter === "all") {
          return true; 
        } else if (filter === "checked") {
          return user.status === "checked"; 
        } else if (filter === "unChecked") {
          return user.status === "unChecked"; 
        }
      });

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

                <input
                type="radio"
                id="all"
                name="choose"
                value="all"
                checked={filter === "all"}
                onChange={handleFilterChange}
                />
                <label htmlFor="all">Все</label>

                <input
                type="radio"
                id="checked"
                name="choose"
                value="checked"
                checked={filter === "checked"}
                onChange={handleFilterChange}
                />
                <label htmlFor="checked">Принятые</label>

                <input
                type="radio"
                id="unChecked"
                name="choose"
                value="unChecked"
                checked={filter === "unChecked"}
                onChange={handleFilterChange}
                />
                <label htmlFor="unChecked">Отклоненные</label>


                <main>
                <Users users={filteredUsers} handleEdit={handleEdit} />
                </main> 
            </div>)
    }
    
export default Students
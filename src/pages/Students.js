import React, {useState, useEffect} from "react";
import Users from "../components/Users";
import axios from 'axios';

function Students() {
  const [statements, setStatements] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://45.9.42.26:22000/api/statement")
      .then(response => {
        const statements = response.data;
        console.log(response.data)
        setStatements(statements);
      })
      .catch(error => {
        console.error("Ошибка", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredStatements = statements.filter((statement) => {
    if (filter === "all") {
      return true;
    } else if (filter === "unChecked") {
      return !statement.isChecked;
    }
  });

  const handleEdit = (user) => {
    const updatedStatements = statements.map((statement) => {
      if (statement.id === user.statementId) {
        return {
          ...statement,
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
          groupName: user.group,
        };
      } else {
        return statement;
      }
    });
    setStatements(updatedStatements);
  };

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
        id="unChecked"
        name="choose"
        value="unChecked"
        checked={filter === "unChecked"}
        onChange={handleFilterChange}
      />
      <label htmlFor="unChecked">Ожидают проверки</label>
      <main>
        <Users users={filteredStatements} handleEdit={handleEdit} />
      </main>
    </div>
  );
}

export default Students;

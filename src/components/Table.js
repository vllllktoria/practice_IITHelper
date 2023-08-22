import React from "react";
import { useTable } from 'react-table';

function Table({ columns, data, isEditing, editedSchedule, setEditedSchedule }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });
  
  const handleCellChange = (event, groupName, rowIndex, columnId) => {
    const { value } = event.target;
    const updatedEditedSchedule = { ...editedSchedule };
    if (!updatedEditedSchedule[groupName]) {
      updatedEditedSchedule[groupName] = [...data];
    }
    const rowValues = updatedEditedSchedule[groupName][rowIndex] || {};
    rowValues[columnId] = value;
    updatedEditedSchedule[groupName][rowIndex] = rowValues;
    setEditedSchedule(updatedEditedSchedule);
  };

  const renderInput = (groupName, rowIndex, columnId, cellValue) => (
    <input
      type="text"
      name={columnId}
      value={editedSchedule[groupName]?.[rowIndex]?.[columnId] || cellValue}
      onChange={(event) => handleCellChange(event, groupName, rowIndex, columnId)}
    />
  );

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="custom-header">
                <div>
                  {column.render('Header')}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="custom-row">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="custom-cell">
                    <div>
                      {isEditing ? (
                        <>
                        <input
                          placeholder="Время начала"
                          type="text"
                          name={cell.column.id}
                          value={editedSchedule[row.original.group]?.[row.index]?.[cell.column.id] || cell.value}
                          onChange={(event) => handleCellChange(event, row, cell.column.id)}
                        />
                        <input
                          placeholder="Время окончания"
                          type="text"
                          name={cell.column.id}
                          value={editedSchedule[row.original.group]?.[row.index]?.[cell.column.id] || cell.value}
                          onChange={(event) => handleCellChange(event, row, cell.column.id)}
                        />
                        <input
                          placeholder="Предмет"
                          type="text"
                          name={cell.column.id}
                          value={editedSchedule[row.original.group]?.[row.index]?.[cell.column.id] || cell.value}
                          onChange={(event) => handleCellChange(event, row, cell.column.id)}
                        />
                        <input
                          placeholder="Преподаватель"
                          type="text"
                          name={cell.column.id}
                          value={editedSchedule[row.original.group]?.[row.index]?.[cell.column.id] || cell.value}
                          onChange={(event) => handleCellChange(event, row, cell.column.id)}
                        />
                        <input
                          placeholder="Аудитория"
                          type="text"
                          name={cell.column.id}
                          value={editedSchedule[row.original.group]?.[row.index]?.[cell.column.id] || cell.value}
                          onChange={(event) => handleCellChange(event, row, cell.column.id)}
                        />
                        </>
                      ) : (
                        cell.render('Cell')
                          )}  
                  </div>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;

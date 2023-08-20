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
  

  const handleCellChange = (event, row, column) => {
    const { value } = event.target;
    const groupName = row.original.group;
  
    const updatedEditedSchedule = { ...editedSchedule };
    if (!updatedEditedSchedule[groupName]) {
      updatedEditedSchedule[groupName] = [...data];
    }
    const rowValues = updatedEditedSchedule[groupName][row.index] || {};
    rowValues[column] = value;
  
    updatedEditedSchedule[groupName][row.index] = rowValues;
  
    setEditedSchedule(updatedEditedSchedule);
  };

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
                        <input
                          placeholder="Время"
                          type="text"
                          name={cell.column.id}
                          value={editedSchedule[row.original.group]?.[row.index]?.[cell.column.id] || cell.value}
                          onChange={(event) => handleCellChange(event, row, cell.column.id)}
                        />
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

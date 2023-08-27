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
  
  const handleCellChange = (event, title, rowIndex, columnId) => {
    const { value } = event.target;
    const updatedEditedSchedule = { ...editedSchedule };
    if (!updatedEditedSchedule[title]) {
      updatedEditedSchedule[title] = [...data];
    }
    const rowValues = updatedEditedSchedule[title][rowIndex] || {};
    rowValues[columnId] = value;
    updatedEditedSchedule[title][rowIndex] = rowValues;
    setEditedSchedule(updatedEditedSchedule);
  };

  const renderInputCell = (row, cell, placeholder) => {
    return (
      <input
        placeholder={placeholder}
        type="text"
        name={cell.column.id}
        value={editedSchedule[row.original.title]?.[row.index]?.[cell.column.id] || cell.value}
        onChange={(event) => handleCellChange(event, row.original.title, row.index, cell.column.id)}
      />
    );
  }

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
                        {renderInputCell(row, cell, "Время начала")}
                        {renderInputCell(row, cell, "Время окончания")}
                        {renderInputCell(row, cell, "Предмет")}
                        {renderInputCell(row, cell, "Преподаватель")}
                        {renderInputCell(row, cell, "Аудитория")}
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

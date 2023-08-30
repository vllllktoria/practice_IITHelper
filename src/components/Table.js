import React, { useState } from "react";
import { useTable } from 'react-table';
import { ScheduleEditForm } from "./ScheduleEditForm";

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

 

  const handleCellChange = (event, rowIndex, columnId) => {
    const { value } = event.target;
    const title = rows[rowIndex].original.title;
    const updatedEditedSchedule = { ...editedSchedule };
    if (!updatedEditedSchedule[title]) {
      updatedEditedSchedule[title] = [...data];
    }
    const rowValues = { ...updatedEditedSchedule[title][rowIndex] };
    rowValues[columnId] = value;
    updatedEditedSchedule[title][rowIndex] = rowValues;
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
                      <ScheduleEditForm cell={cell}/>
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

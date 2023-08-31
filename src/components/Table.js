import React, { useState } from "react";
import { useTable } from 'react-table';
import { ScheduleEditForm } from "./ScheduleEditForm";

function Table({ columns, data, isEditing, onSave, selectedGroup }) {
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
                       <ScheduleEditForm cell={cell} onSave={(newData) => onSave(selectedGroup, newData)}  />
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

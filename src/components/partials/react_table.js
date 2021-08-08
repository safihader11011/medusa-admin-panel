import React, { useState, useEffect } from 'react';

import { useTable } from 'react-table'

const ReactTable = (props) => {

  const data = React.useMemo(() => props.data, [props])

  const columns = React.useMemo(() => props.columns, [props])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })


  return (
    <table
      {...getTableProps()}
      style={{  width: "100%", boxShadow: '0 0 20px 0 #cbcbcb', borderRadius: '10px', marginTop: '10px' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  padding:"12px 25px",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor:"#0052bb",
                  borderRadius: index === 0?'10px 0 0 0':index===headerGroup.headers.length-1?'0 10px 0 0':'0',
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr 
              {...row.getRowProps()}
              style={rowIndex !== rows.length - 1?{
                borderBottom: '1px solid #95c4ff'
              } : null}
            >
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      color: !cellIndex? '#0052bb': 'inherit',
                      padding: "12px 25px",
                      background: "#F2F7FE",
                      borderRadius: (rowIndex === rows.length - 1 && cellIndex === 0)?'0 0 0 10px' : (rowIndex === rows.length - 1 && cellIndex === row.cells.length-1)? '0 0 10px 0':'0',
                      fontSize: '14px'
                    }}
                  >
                    {console.log(row.cells, cellIndex)}
                    {cell.render("Cell", row.original)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ReactTable;

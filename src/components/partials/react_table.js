import React, { useState, useEffect } from 'react';

import { useTable, usePagination } from 'react-table'

const ReactTable = (props) => {

  const data = React.useMemo(() => props.data, [props])

  const columns = React.useMemo(() => props.columns, [props])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination)


  return (
    <>
      <table
        {...getTableProps()}
        style={{ width: "100%", boxShadow: '0 0 20px 0 #cbcbcb', borderRadius: '10px', marginTop: '10px' }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "12px 25px",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#0052bb",
                    borderRadius: index === 0 ? '10px 0 0 0' : index === headerGroup.headers.length - 1 ? '0 10px 0 0' : '0',
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={rowIndex !== page.length - 1 ? {
                  borderBottom: '1px solid #95c4ff'
                } : null}
              >
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        color: !cellIndex ? '#0052bb' : 'inherit',
                        fontWeight: !cellIndex ? '500' : 'inherit',
                        padding: "12px 25px",
                        background: "#fff",
                        borderRadius: (rowIndex === page.length - 1 && cellIndex === 0) ? '0 0 0 10px' : (rowIndex === page.length - 1 && cellIndex === row.cells.length - 1) ? '0 0 10px 0' : '0',
                        fontSize: '14px'
                      }}
                    >
                      {cell.render("Cell", row.original)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination mt-4 justify-content-end align-items-center mx-1">
        <button className={`btn-pagination ${!canPreviousPage? 'disabled' : null }`} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className={`btn-pagination ${!canNextPage? 'disabled' : null }`} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <span className="mx-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </>
  );
}

export default ReactTable;

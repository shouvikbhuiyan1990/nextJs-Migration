import React from 'react'

import BTable from 'react-bootstrap/Table';

import { useTable, usePagination } from 'react-table'
import styled from 'styled-components'

import makeData from './makeData';

const Styles = styled.div`
  table {

    th,
    td {
      padding: 0.7rem;
    }
  }
  button {
      border: none;
      background: none;
  }
  .pagination {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex }, } = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0 },
            },
            usePagination
        )

    // Render the UI for your table
    return (
        <>
            <BTable striped bordered hover size="sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </BTable>

            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </span>
                <span>
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
            </div>
        </>
    )
}

function App() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Booking Id',
                accessor: 'bookingId',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: '% of Commison',
                accessor: 'commison',
            },
            {
                Header: 'Payout',
                accessor: 'payout',
            },
        ],
        []
    )

    const data = React.useMemo(() => makeData(40), [])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default App

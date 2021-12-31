import * as React from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";

const Table = ({ data, columns, context, words }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        pageOptions,
        canPreviousPage,
        state,
        setGlobalFilter,
        setHiddenColumns
    } = useTable({
        columns, data, initialState: {
            hiddenColumns: []
        }
    }, useGlobalFilter, useSortBy, usePagination)

    const { pageIndex, globalFilter } = state;


    return (
        <>
            <GlobalFilter searchText={words.search} filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} className="table table-bordered table-overflow">
                <thead className="bg-info text-light" style={{ width: "max-content", height: "auto" }}>
                    {headerGroups.map(headerGroup => (
                        <tr className="d-sm-none" scope="col" {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header', { words: words, className: "d-sm-none", hideColumns: setHiddenColumns })}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} >
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}

                                        >
                                            {cell.render('Cell', { context: context, words: words, className: "d-sm-none", hideColumns: {} })}
                                        </td>
                                    )
                                })}
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            <div>
                <span>
                    {words.page}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                {canPreviousPage && (<button onClick={() => previousPage()} >
                    {words.prev}
                </button>)}
                {canNextPage && (<button onClick={() => nextPage()} >
                    {words.next}
                </button>)}
            </div>
        </>
    )
}

export default Table;
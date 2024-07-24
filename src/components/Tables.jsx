import React, { useState } from 'react';
import { UpdateModal } from "./UpdateModal";

export function DataTable({ thead, tbody, _delete, updateTable, text }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calcular el número total de páginas
    const totalPages = Math.ceil(tbody.length / itemsPerPage);

    // Calcular el índice de inicio y fin de los elementos para la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tbody.slice(indexOfFirstItem, indexOfLastItem);

    // Manejar la navegación entre páginas
    const handleClick = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    return (
        <div className="lg:max-w-8xl max-w-full mx-auto">
            <div className="flex flex-col">
                <div className="overflow-x-auto shadow-md rounded-xl">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="table-auto text-left w-full">
                                <thead className="uppercase border-b">
                                    <tr className="bg-gray-100">
                                        {thead.map((title, index) => (
                                            <th key={index} scope="col" className="p-5 text-lg font-bold">{title}</th>
                                        ))}
                                        <th scope="col" className="px-5 text-lg font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((body, index) => {
                                        const keys = Object.keys(body);
                                        return (
                                            <tr className="even:bg-gray-100 bg-white border-b" key={index}>
                                                {thead.map((element, index) => (
                                                    <td key={index} scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">{body[element]}</td>
                                                ))}
                                                <td scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex justify-stretch items-center gap-3">
                                                        <UpdateModal id={body[keys[0]]} text={text} updateTable={updateTable} />
                                                        <button className="text-red-400 hover:text-red-500 hover:underline font-bold rounded-xl" onClick={() => {
                                                            _delete(body[keys[0]]);
                                                        }}>Remove</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center py-4">
                    <nav>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button
                                    className={`px-3 py-2 ml-0 leading-tight ${currentPage === 1 ? 'text-gray-400' : 'text-gray-500 hover:text-gray-700'} bg-white border border-gray-300 rounded-l-lg`}
                                    onClick={(e) => handleClick(e, currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, page) => (
                                <li key={page}>
                                    <button
                                        className={`px-3 py-2 leading-tight ${currentPage === page + 1 ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'} bg-white border border-gray-300`}
                                        onClick={(e) => handleClick(e, page + 1)}
                                    >
                                        {page + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    className={`px-3 py-2 leading-tight ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-500 hover:text-gray-700'} bg-white border border-gray-300 rounded-r-lg`}
                                    onClick={(e) => handleClick(e, currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

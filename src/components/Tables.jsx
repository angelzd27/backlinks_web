import { UpdateModal } from "./UpdateModal"

export function DataTable({ thead, tbody, _delete, updateTable, text }) {
    return (
        <div className="lg:max-w-8xl max-w-full mx-auto">
            <div className="flex flex-col">
                <div className="overflow-x-auto shadow-md rounded-xl">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="table-auto text-left w-full">
                                <thead className="uppercase border-b">
                                    <tr className="bg-gray-100">
                                        {thead.map(function (title, index) {
                                            return <th key={index} scope="col" className="p-5 text-lg font-bold">{title}</th>
                                        })}
                                        <th scope="col" className="px-5 text-lg font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tbody.map(function (body, index) {
                                        const keys = Object.keys(body)
                                        return (<tr className="even:bg-gray-100 bg-white border-b" key={index}>
                                            {thead.map(function (element, index) {
                                                return (<td key={index} scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">{body[element]}</td>)
                                            })}
                                            <td scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap" key={index + 7}>
                                                <div className="flex justify-stretch items-center gap-3">
                                                    <UpdateModal id={body[keys[0]]} text={text} updateTable={updateTable} />
                                                    <button className="text-red-400 hover:text-red-500 hover:underline font-bold rounded-xl" onClick={() => {
                                                        _delete(body[keys[0]])
                                                    }}>Remove</button>
                                                </div>
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

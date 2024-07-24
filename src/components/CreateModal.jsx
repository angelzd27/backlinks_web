import { useState } from 'react';
import { RegisterForm } from '../pages/authPages/Register';

export const CreateModal = ({ text, updateTable }) => {
    const [isOpen, setIsOpen] = useState(false)

    const renderFormSwitch = (text) => {
        switch (text) {
            case "New User":
                return (<RegisterForm setIsOpen={setIsOpen} updateTable={updateTable} />)
            default:
                return (<h1>Error</h1>)
        }
    }

    return (
        <>
            <button className='bg-blue-600 hover:bg-blue-700 text-white text-center w-auto h-auto py-3 px-12 rounded-3xl text-lg font-bold whitespace-pre' onClick={() => setIsOpen(true)} >{text}</button>
            {
                isOpen && (<div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                    <div className='bg-white p-5 flex flex-col justify-center items-center rounded-3xl'>
                        <div className='w-full flex mr-5 justify-end items-end'>
                            <button
                                className='text-2xl font-bold cursor-pointer'
                                onClick={() => setIsOpen(false)}
                            >X</button>
                        </div>
                        {/* Depending of the page the form will be showed */}
                        <h1 className='text-4xl -mt-5 font-extrabold'>{text}</h1>
                        {renderFormSwitch(text)}
                    </div>
                </div>)
            }
        </>
    )
}
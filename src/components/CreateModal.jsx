import { useState } from 'react';
import { RegisterForm } from '../pages/authPages/Register';
import { BD_ACTION_POST } from '../services/request';
import Swal from 'sweetalert2';

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
                    <div className='bg-white p-12 flex flex-col justify-center items-center rounded-3xl'>
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

export const EmailModal = ({ id, text, update }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendEmail = async () => {
        if(email === '' || password === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            })
            return
        }
        const body = {
            id: id,
            email: email,
            password: password,
            status: 1
        }
        console.log(body);
        try {
            const data = await BD_ACTION_POST('create_email_config', body)
            if (!data.error) {
                Swal.fire(
                    "Registed!",
                    'Your email has been created!',
                    'success'
                )
                setIsOpen(false)
                update()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred, please try again later!',
                })
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while creating the email!',
            })
        }
    }

    return (
        <>
            <button className='bg-blue-600 hover:bg-blue-700 text-white text-center w-auto h-auto py-3 px-12 rounded-3xl text-lg font-bold whitespace-pre' onClick={() => setIsOpen(true)} >{text}</button>
            {
                isOpen && (<div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                    <div className='bg-white p-12 flex flex-col justify-center items-center rounded-3xl'>
                        <div className='w-full flex mr-5 justify-end items-end'>
                            <button
                                className='text-2xl font-bold cursor-pointer'
                                onClick={() => setIsOpen(false)}
                            >X</button>
                        </div>
                        <h1 className='text-4xl -mt-5 font-extrabold mb-10'>{text}</h1>
                        <h2 className='w-full text-left text-2xl mb-5'>How to add a new email:</h2>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/u3YIHs1Rx78?si=ErdAgBOOzKwA_Bsy" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <h2 className='mt-10 w-full text-left text-2xl font-bold'>Write tour credentials</h2>
                        <div className='flex flex-col mt-5 mb-5 w-full'>
                            <div className='flex flex-row w-full gap-7'>
                                <div className='w-1/2'>
                                    <p className='mt-4'>Email *</p>
                                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" placeholder='Write an email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='w-1/2'>
                                    <p className='mt-4'>Password *</p>
                                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" placeholder='Write your app password' onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button className='bg-blue-600 px-16 py-2 text-white rounded-3xl font-bold' onClick={() => {
                            sendEmail()
                        }}>Submit</button>
                    </div>
                </div>)
            }
        </>
    )
}
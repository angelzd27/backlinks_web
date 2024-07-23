import { useEffect, useState } from "react"
import { BD_ACTION_GET, BD_ACTION_UPDATE } from "../services/request"
import { validateEmail, validateName } from "../utils/validators"
import { getJWT } from "../services/jwt"

export const UpdateModal = ({ id, text, updateTable }) => {
    const [isOpen, setIsOpen] = useState(false)

    const renderFormSwitch = (text) => {
        switch (text) {
            case "Update User":
                return (<UpdateUserForm id={id} setIsOpen={setIsOpen} updateTable={updateTable} />)
            default:
                return (<h1>Error</h1>)
        }
    }

    return (
        <>
            <button className="text-blue-400 hover:text-blue-500 hover:underline font-bold rounded-xl" onClick={() => setIsOpen(true)} >Edit</button>
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

export const UpdateUserForm = ({ id, setIsOpen, updateTable }) => {
    const [form, setForm] = useState({
        name: '',
        nameError: false,
        lastName: '',
        lastNameError: false,
        email: '',
        emailError: false,
    })

    const getUser = async () => {
        const data = await BD_ACTION_GET("get_user_by_id", id, getJWT())
        const updatedForm = {
            ...form,
            name: data.msg.name,
            firstName: data.msg.first_name,
            lastName: data.msg.last_name,
            id_gender: data.msg.id_gender,
            email: data.msg.email,
            phone: data.msg.phone,
            picture: data.msg.picture,
        }
        setForm(updatedForm)
    }

    useEffect(() => {
        getUser()
    }, [])

    const update_profile = async () => {
        const isNameValid = validateName(form.name)
        const isLastNameValid = validateName(form.lastName)
        const isEmailValid = validateEmail(form.email)

        const updatedForm = {
            ...form,
            nameError: !isNameValid,
            lastNameError: !isLastNameValid,
            emailError: !isEmailValid,
        }
        setForm(updatedForm)

        if (isNameValid && isLastNameValid && isEmailValid) {
            const body = {
                name: form.name,
                first_name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                phone: form.phone,
                picture: form.picture
            };
            try {
                const data = await BD_ACTION_UPDATE('update_user', id, body, getJWT())
                console.log(data)

                if (!data.error) {
                    Swal.fire(
                        "User updated!",
                        `User ${form.name} has been updated!`,
                        'success'
                    )
                    setIsOpen(false)
                    updateTable()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'An error occurred, please try again later!',
                    })
                }
            } catch (error) {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred updating your account!',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred, check your information!',
            })
        }
    }
    return (
        <>
            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col items-center justify-around mt-5 mb-5 gap-10'>
                <div className='flex flex-col lg:w-w-1/2 md:w-1/2 sm:full w-full'>
                    {/* Name Input */}
                    <label className='mt-4'>Name *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.name || ""} placeholder='Your name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                    {/* Last Name Input */}
                    <label className='mt-4'>Last Name *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.lastName || ""} placeholder='Your last name' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                </div>
                <div className='flex flex-col lg:w-w-1/2 md:w-1/2 sm:full w-full'>
                    {/* Email Input */}
                    <label className='mt-4'>Email *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="email" value={form.email || ""} placeholder='Your email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.emailError ? "Invalid email" : ""}</span>
                    <label className='mt-4'>Phone *</label>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.phone || ""} placeholder='Your phone number' onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.phoneError ? "Invalid phone number" : ""}</span>
                </div>
            </div>
            <div className='flex justify-center my-5'>
                <button className='bg-bug-500 hover:bg-bug-600 text-white w-auto h-auto py-3 px-10 rounded-3xl text-lg font-bold overflow-hidden' onClick={() => {
                    update_profile()
                }}>
                    Update
                </button>
            </div>
        </>
    )
}
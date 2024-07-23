import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { decodedJWT } from '../../services/jwt'

const Settings = () => {
    const jwt = decodedJWT()

    const [form, setForm] = useState({
        name: jwt.name,
        nameError: false,
        lastName: jwt.last_name,
        lastNameError: false,
        email: jwt.email,
        emailError: false,
    })

    return (
        <div className='bg-okip-100 dark:bg-okip-700 lg:px-10 md:px-8 sm:px-6 px-5 pt-10 pb-32'>
            <div className='w-full flex'>
                <Link to="/" className='flex items-center justify-center mb-10'>
                    <button className='bg-zinc-400 p-4 rounded-full lg:h-16 md:h-14 h-12 lg:w-16 md:w-14 w-12 lg:text-3xl md:text-2xl text-xl flex items-center justify-center mr-8 text-white'>
                        <IoIosArrowBack />
                    </button>
                    <span className='lg:text-5xl md:text-4xl text-3xl font-bold text-center'>Settings</span>
                </Link>
            </div>
            <span className='text-2xl text-center ml-24'>Settings and options for your application.</span>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-10 mb-5'>Personal Information</h2>
                    <p>Change your personal Information</p>
                </div>
                <div className='w-1/2'>
                    <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-col w-full'>

                            <p className='mt-4'>Name *</p>
                            <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.name || ""} placeholder='Your name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                            {/* Last Name Input */}
                            <p className='mt-4'>Last Name *</p>
                            <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="text" value={form.lastName || ""} placeholder='Your last name' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                            <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                            {/* Email Input */}
                            <p className='mt-4'>Email *</p>
                            <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10' type="email" value={form.email || ""} placeholder='Your email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <span className='text-sm text-red-600 italic'>{form.emailError ? "Invalid email" : ""}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-10 mb-5'>Searcher Information</h2>
                    <p>Change the configuration of sercher</p>
                </div>
                <div className='w-1/2'>
                    <div className='flex flex-row items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-row w-full gap-7'>
                            <div className='w-1/2'>

                                <p className='mt-4'>Nomber of pages *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='Write the number of pages to search' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                            </div>
                            <div className='w-1/2'>

                                <p className='mt-4'>Number of contacts *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.lastName || ""} placeholder='Write the number of contacts to search' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-4 mb-5'>Comment configuration</h2>
                    <p>Change the configuration of the Information or your comments</p>
                </div>
                <div className='w-1/2'>

                    <p className='mt-4'>Author *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='Author of the comment' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>

                    <p className='mt-4'>Email *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='Email to sent in comment' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>

                    <p className='mt-4'>Url *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='Url to send in comment' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>

                    <p className='mt-4'>Comment *</p>
                    <textarea className='bg-gray-200 rounded-3xl px-4 py-2 mt-1 h-32 w-full' type="text" value={form.name || ""} placeholder='Write the comment that you want to send' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-4 mb-5'>Email configuration</h2>
                    <p>Change the configuration of your emails</p>
                </div>
                <div className='w-1/2'>

                    <p className='mt-4'>Subject *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='Email subject' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>

                    <p className='mt-4'>Message *</p>
                    <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='Email body' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                </div>
            </div>

            <div className='flex mt-10 mx-24'>
                <div className='w-1/2'>
                    <h2 className='text-3xl font-bold mt-4 mb-5'>Linked Accounts</h2>
                    <p>Change the credentials of your accounts</p>
                </div>
                <div className='w-1/2'>

                    <div className='flex flex-row items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-row w-full gap-7'>
                            <div className='w-1/2'>
                                <p className='mt-4'>Email *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='someemail@mail.com' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                            </div>
                            <div className='w-1/2'>

                                <p className='mt-4'>Password *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.lastName || ""} placeholder='**********' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-row w-full gap-7'>
                            <div className='w-1/2'>
                                <p className='mt-4'>Email *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='someemail@mail.com' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                            </div>
                            <div className='w-1/2'>

                                <p className='mt-4'>Password *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.lastName || ""} placeholder='**********' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-around mt-5 mb-5'>
                        <div className='flex flex-row w-full gap-7'>
                            <div className='w-1/2'>
                                <p className='mt-4'>Email *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.name || ""} placeholder='someemail@mail.com' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.nameError ? "Invalid name" : ""}</span>
                            </div>
                            <div className='w-1/2'>

                                <p className='mt-4'>Password *</p>
                                <input className='bg-gray-200 rounded-3xl px-4 mt-1 h-10 w-full' type="text" value={form.lastName || ""} placeholder='**********' onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                                <span className='text-sm text-red-600 italic'>{form.lastNameError ? "Invalid last name" : ""}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded-3xl mt-5'>Add other email</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings